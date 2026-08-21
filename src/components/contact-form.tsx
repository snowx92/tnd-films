"use client";

import { useState, type FormEvent } from "react";
import { inquiryLabel, type InquiryVertical } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { Handwritten } from "@/components/handwritten";

type FormStatus = "idle" | "submitting" | "success" | "error";

const verticals: InquiryVertical[] = ["ecommerce", "automotive", "both"];

function statusCopy(status: FormStatus, error: string): string {
  switch (status) {
    case "idle":
    case "submitting":
      return "";
    case "success":
      return "Got it. We will write back.";
    case "error":
      return error;
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function ContactForm() {
  const [vertical, setVertical] = useState<InquiryVertical>("ecommerce");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          vertical,
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setError(payload.error ?? "The line dropped. Try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setVertical("ecommerce");
    } catch {
      setStatus("error");
      setError("The line dropped. Try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-14 max-w-2xl">
      <label className="sr-only" htmlFor="website">
        Website
      </label>
      <input
        id="website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <Field label="Name" name="name" autoComplete="name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Company" name="company" autoComplete="organization" />

      <fieldset className="mt-8">
        <legend className="text-[11px] tracking-[0.2em] text-mute uppercase">
          Vertical
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {verticals.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setVertical(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors",
                vertical === item
                  ? "border-signal bg-signal text-ink"
                  : "border-ink/20 text-mute hover:border-signal hover:text-signal",
              )}
            >
              {inquiryLabel(item)}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-8 block">
        <span className="text-[11px] tracking-[0.2em] text-mute uppercase">
          Brief
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-3 w-full resize-none border-b border-ink/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-mute/40 focus:border-signal"
          placeholder="Product, date, the feeling it has to have."
        />
      </label>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full border border-ink/25 px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:text-signal disabled:opacity-50"
        >
          {status === "submitting" ? "Sending" : "Send the brief"}
        </button>
        {status !== "idle" && status !== "submitting" ? (
          <Handwritten
            className={cn(
              "text-2xl",
              status === "error" && "text-signal",
            )}
          >
            {statusCopy(status, error)}
          </Handwritten>
        ) : null}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", autoComplete, required }: FieldProps) {
  return (
    <label className="mt-8 block first:mt-0">
      <span className="text-[11px] tracking-[0.2em] text-mute uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-3 w-full border-b border-ink/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-mute/40 focus:border-signal"
      />
    </label>
  );
}
