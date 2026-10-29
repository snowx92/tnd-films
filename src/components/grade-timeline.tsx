import Image from "next/image";

const clips = [
  { track: "V2", start: 8, width: 18, image: "/media/work/lmnl/s04.jpg" },
  { track: "V2", start: 52, width: 22, image: "/media/work/get-winn/s05.jpg" },
  { track: "V1", start: 0, width: 24, image: "/media/work/tales/s06.jpg" },
  { track: "V1", start: 25, width: 20, image: "/media/work/malaaky/s02.jpg" },
  { track: "V1", start: 46, width: 30, image: "/media/work/lmnl/s07.jpg" },
  { track: "V1", start: 77, width: 23, image: "/media/work/arakis/s06.jpg" },
] as const;

const tracks = ["V2", "V1", "A1"] as const;

/** A looping edit-bay vignette: log-to-grade wipe, wheels and a running timeline. */
export function GradeTimeline() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-sm border border-ink/10 bg-canvas p-2 text-[9px] tracking-[0.18em] text-mute uppercase">
      <div className="grid flex-1 grid-cols-[1fr_auto] gap-2">
        <div className="relative min-h-40 overflow-hidden rounded-[2px] bg-black">
          <Image
            src="/media/work/lmnl/s07.jpg"
            alt="LMNL frame in the grade"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover [filter:saturate(0.25)_contrast(0.72)_brightness(1.18)]"
          />
          <div className="absolute inset-0 motion-safe:animate-[grade-wipe_6s_ease-in-out_infinite] [clip-path:inset(0_0_0_50%)]">
            <Image
              src="/media/work/lmnl/s07.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover [filter:saturate(1.2)_contrast(1.12)_sepia(0.12)]"
            />
          </div>
          <span className="absolute top-2 left-2 rounded-full bg-canvas/70 px-2 py-0.5 text-ink">Log</span>
          <span className="absolute top-2 right-2 rounded-full bg-signal px-2 py-0.5 text-ink">Grade</span>
        </div>
        <div className="flex flex-col justify-between gap-2">
          {["Lift", "Gamma", "Gain"].map((wheel, index) => (
            <div key={wheel} className="flex flex-col items-center gap-1">
              <div className="relative h-11 w-11 rounded-full bg-[conic-gradient(from_90deg,#e5484d,#f5d90a,#46a758,#05a2c2,#3e63dd,#8e4ec6,#e5484d)] p-px">
                <div className="h-full w-full rounded-full bg-canvas/80" />
                <span
                  className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-ink motion-safe:animate-[wheel-drift_5s_ease-in-out_infinite]"
                  style={{ animationDelay: `${index * -1.4}s` }}
                />
              </div>
              <span>{wheel}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative rounded-[2px] bg-canvas-raised p-1.5">
        <div className="mb-1 flex justify-between text-[8px]">
          <span>TND_master_v07</span>
          <span className="text-signal">● 25 fps</span>
        </div>
        <div className="relative flex flex-col gap-1">
          {tracks.map((track) => (
            <div key={track} className="grid grid-cols-[1.5rem_1fr] items-center gap-1">
              <span>{track}</span>
              <div className="relative h-6 rounded-[2px] bg-canvas/80">
                {track === "A1" ? (
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-signal/70" aria-hidden="true">
                    <path
                      d="M0 10 Q5 2 10 10 T20 10 T30 10 Q35 4 40 10 T50 10 Q55 0 60 10 T70 10 T80 10 Q85 3 90 10 T100 10 Q105 1 110 10 T120 10 T130 10 Q135 5 140 10 T150 10 Q155 0 160 10 T170 10 T180 10 Q185 3 190 10 T200 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                ) : (
                  clips
                    .filter((clip) => clip.track === track)
                    .map((clip) => (
                      <span
                        key={clip.image}
                        className="absolute top-0 h-full overflow-hidden rounded-[2px] border border-ink/20"
                        style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
                      >
                        <Image src={clip.image} alt="" fill sizes="80px" className="object-cover opacity-80" />
                      </span>
                    ))
                )}
              </div>
            </div>
          ))}
          <span
            aria-hidden="true"
            className="absolute top-[-2px] bottom-[-2px] left-[calc(1.5rem+0.25rem)] w-px bg-signal motion-safe:animate-[playhead_8s_linear_infinite]"
          >
            <span className="absolute -top-1 -left-[3px] h-0 w-0 border-x-[3.5px] border-t-[5px] border-x-transparent border-t-signal" />
          </span>
        </div>
      </div>
    </div>
  );
}
