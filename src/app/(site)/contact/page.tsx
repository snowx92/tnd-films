import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact-form";
import { Handwritten } from "@/components/handwritten";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="grid gap-16 px-5 pt-28 pb-32 md:grid-cols-12 md:px-8">
      <div className="md:col-span-5">
        <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
          Contact
        </p>
        <h1 className="font-display mt-3 text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.82] tracking-tight uppercase">
          Bring the
          <br />
          brief.
        </h1>
        <Handwritten className="mt-4 block text-5xl">
          we&apos;ll bring the set
        </Handwritten>
        <p className="mt-10 max-w-sm text-lg text-mute">
          New work, a launch, a product that has to look like money. Send the
          object and the date.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block text-sm tracking-wide text-ink/80 transition-colors hover:text-signal"
        >
          {site.email}
        </a>
      </div>
      <div className="md:col-span-7 md:pt-10">
        <ContactForm />
      </div>
    </div>
  );
}
