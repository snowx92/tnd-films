import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact-form";
import { Handwritten } from "@/components/handwritten";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bring the brief. Fashion, automotive, F&B, music videos and events.",
};

export default function ContactPage() {
  return (
    <div className="grid gap-16 px-5 pt-28 pb-32 md:grid-cols-12 md:px-8 md:pt-36">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-28">
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
            Contact
          </p>
          <h1 className="font-display mt-3 text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.82] tracking-tight uppercase">
            Bring the
            <br />
            brief.
          </h1>
          <Handwritten className="mt-4 block text-5xl">
            we&apos;ll bring the set
          </Handwritten>
          <p className="mt-10 max-w-sm text-lg text-mute">
            New work, a launch, a collection, a track that needs a picture.
            Tell us the brand, the date and the budget range.
          </p>
          <dl className="mt-10 grid gap-6 text-sm">
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-lg hover:text-signal">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">Studio</dt>
              <dd className="mt-1 text-lg">{site.location}</dd>
            </div>
          </dl>
          <SocialLinks className="mt-8" />
        </div>
      </div>
      <div className="md:col-span-7 md:pt-4">
        <ContactForm />
      </div>
    </div>
  );
}
