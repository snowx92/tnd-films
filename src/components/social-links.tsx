import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialId = (typeof site.socials)[number]["id"];

type SocialLinksProps = {
  className?: string;
};

function SocialIcon({ id }: { id: SocialId }) {
  switch (id) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.6" strokeWidth="1.5" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "vimeo":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M21.4 7.3c-.1 2.2-1.6 5.2-4.6 9-3.1 3.9-5.7 5.9-7.8 5.9-1.3 0-2.4-1.2-3.3-3.6L4.2 14c-.6-2.2-1.3-4.4-2-6.6.9-.2 1.8-.3 2.6-.3 1.7 0 2.6 1 2.8 3 .5 3.3 1.2 5.5 2.1 5.5.6 0 1.6-1 3-3 1.3-1.9 2-3.8 2.1-5.5.1-1.4-.4-2.1-1.5-2.1-.5 0-1.1.1-1.7.3 1.8-5.8 6-8.6 12.6-8.3.1 1.9-.2 4.2-.8 5.8Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M6.5 9.2H3.7V20h2.8V9.2ZM5.1 4C4.1 4 3.4 4.8 3.4 5.7c0 .9.7 1.7 1.7 1.7s1.7-.8 1.7-1.7C6.8 4.8 6.1 4 5.1 4ZM20.3 20h-2.8v-5.6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s.04-9.2 0-10.8h2.8v1.7c.4-.7 1.3-1.9 3.3-1.9 2.4 0 4.2 1.6 4.2 5V20Z" />
        </svg>
      );
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {site.socials.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-signal hover:text-signal"
          >
            <SocialIcon id={item.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
