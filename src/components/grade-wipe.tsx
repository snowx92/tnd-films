"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Left of the split the footage is pushed back to a flat camera log; right of it is the delivered grade.
const fragmentSource = `
precision mediump float;
uniform sampler2D u_frame;
uniform vec2 u_resolution;
uniform vec4 u_rect;
uniform float u_split;
const vec3 luma = vec3(0.2126, 0.7152, 0.0722);

void main() {
  vec2 point = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 uv = (point - u_rect.xy) / u_rect.zw;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec3 color = texture2D(u_frame, uv).rgb;
  if (point.x < u_split * u_resolution.x) {
    vec3 linear = pow(color, vec3(2.2));
    vec3 log = 0.62 + 0.09 * log2(linear + 0.03);
    log = mix(vec3(dot(log, luma)), log, 0.6);
    color = log + vec3(-0.004, 0.008, 0.0);
  }
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

type Fit = { cover: boolean; focusY: number };

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

/**
 * Draws the hero video through a log-to-grade split. The split drifts on its own
 * and follows the pointer (or a finger drag) across `host`.
 */
export function GradeWipe({
  video,
  host,
}: {
  video: RefObject<HTMLVideoElement | null>;
  host: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const source = video.current;
    const area = host.current;
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: false });
    if (!canvas || !source || !area || !gl) {
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      rect: gl.getUniformLocation(program, "u_rect"),
      split: gl.getUniformLocation(program, "u_split"),
    };

    // Mirrors the video's own object-fit: cover on desktop, letterboxed on phones.
    const desktop = window.matchMedia("(min-width: 768px)");
    const fit = (): Fit => (desktop.matches ? { cover: true, focusY: 0.5 } : { cover: false, focusY: 0.38 });

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * scale);
      canvas.height = Math.round(canvas.clientHeight * scale);
    };
    resize();
    const resizer = new ResizeObserver(resize);
    resizer.observe(canvas);

    const reduced = prefersReducedMotion();
    let split = 0.5;
    let target = 0.5;
    let holdUntil = 0;

    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      target = Math.min(0.96, Math.max(0.04, (event.clientX - box.left) / box.width));
      holdUntil = event.pointerType === "mouse" ? Infinity : performance.now() + 2500;
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        holdUntil = performance.now() + 1200;
      }
    };
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);

    let onScreen = true;
    const watcher = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    watcher.observe(area);

    let raf = 0;
    let lastFrame = performance.now();
    let lastTime = -1;
    let drawn = false;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || source.readyState < 2 || !source.videoWidth) {
        return;
      }

      const elapsed = Math.min((now - lastFrame) / 1000, 0.25);
      lastFrame = now;
      const idle = now > holdUntil;
      if (idle && !reduced) {
        target = 0.5 + 0.24 * Math.sin(now / 1500);
      }
      split += (target - split) * (1 - Math.exp(-elapsed * (idle ? 2 : 10)));
      if (splitRef.current) {
        splitRef.current.style.left = `${split * 100}%`;
      }

      if (source.currentTime !== lastTime) {
        lastTime = source.currentTime;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      }

      const { cover, focusY } = fit();
      const scale = (cover ? Math.max : Math.min)(
        canvas.width / source.videoWidth,
        canvas.height / source.videoHeight,
      );
      const width = source.videoWidth * scale;
      const height = source.videoHeight * scale;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform4f(
        uniforms.rect,
        (canvas.width - width) / 2,
        (canvas.height - height) * focusY,
        width,
        height,
      );
      gl.uniform1f(uniforms.split, split);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!drawn) {
        drawn = true;
        setReady(true);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizer.disconnect();
      watcher.disconnect();
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      // The canvas keeps its context across remounts, so free only what this run made.
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [video, host]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
      <div
        ref={splitRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-[1] w-0 transition-opacity duration-700"
        style={{ left: "50%", opacity: ready ? 1 : 0 }}
      >
        <span className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-ink/70 shadow-[0_0_18px_1px_var(--signal)]" />
        <span className="absolute top-28 right-3 rounded-full bg-canvas/70 px-2.5 py-1 text-[9px] tracking-[0.22em] whitespace-nowrap text-ink uppercase backdrop-blur md:top-32">
          Camera log
        </span>
        <span className="absolute top-28 left-3 rounded-full bg-signal px-2.5 py-1 text-[9px] tracking-[0.22em] whitespace-nowrap text-ink uppercase md:top-32">
          TND grade
        </span>
        <span className="absolute top-1/2 left-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/60 bg-canvas/40 backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-ink" strokeWidth="1.5">
            <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </>
  );
}
