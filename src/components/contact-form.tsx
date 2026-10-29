"use client";

import { useState, type FormEvent } from "react";
import { budgetRanges, type BudgetRange } from "@/data/site";
import { inquiryCategories, inquiryLabel, type InquiryCategory } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { Handwritten } from "@/components/handwritten";

type FormStatus = "idle" | "submitting" | "success" | "error";

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
  const [category, setCategory] = useState<InquiryCategory>("fashion");
  const [budget, setBudget] = useState<BudgetRange>("40–70K");
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
          brand: data.get("brand"),
          category,
          budget,
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
      setCategory("fashion");
      setBudget("40–70K");
    } catch {
      setStatus("error");
      setError("The line dropped. Try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl">
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

      <div className="grid gap-x-8 md:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Field
        label="Brand / business name"
        name="brand"
        autoComplete="organization"
        required
      />

      <ChipGroup
        legend="Category"
        options={inquiryCategories}
        value={category}
        onChange={setCategory}
        label={inquiryLabel}
      />

      <ChipGroup
        legend="Budget range"
        options={budgetRanges}
        value={budget}
        onChange={setBudget}
        label={(item) => item}
      />
      <p className="mt-3 max-w-md text-xs leading-relaxed text-mute">
        Production fees only. Art direction, models, locations and permits are
        quoted separately.
      </p>

      <label className="mt-8 block">
        <span className="text-[11px] tracking-[0.2em] text-mute uppercase">
          Brief
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-3 w-full resize-none border-b border-ink/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-mute/40 focus:border-signal"
          placeholder="What we are shooting, when, and the feeling it has to have."
        />
      </label>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-signal px-7 py-3.5 text-[11px] tracking-[0.2em] text-ink uppercase transition-colors hover:bg-signal-hot disabled:opacity-50"
        >
          {status === "submitting" ? "Sending" : "Send the brief"}
        </button>
        {status !== "idle" && status !== "submitting" ? (
          <Handwritten
            className={cn("text-2xl", status === "success" && "text-ink")}
          >
            {statusCopy(status, error)}
          </Handwritten>
        ) : null}
      </div>
    </form>
  );
}

type ChipGroupProps<T extends string> = {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: (value: T) => string;
};

function ChipGroup<T extends string>({ legend, options, value, onChange, label }: ChipGroupProps<T>) {
  return (
    <fieldset className="mt-8">
      <legend className="text-[11px] tracking-[0.2em] text-mute uppercase">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={value === item}
            onClick={() => onChange(item)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors",
              value === item
                ? "border-signal bg-signal text-ink"
                : "border-ink/20 text-mute hover:border-signal hover:text-ink",
            )}
          >
            {label(item)}
          </button>
        ))}
      </div>
    </fieldset>
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
    <label className="mt-8 block">
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
