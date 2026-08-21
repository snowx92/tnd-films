import { PillLink } from "@/components/pill-link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-start justify-center px-5 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-signal uppercase">404</p>
      <h1 className="font-display mt-4 text-6xl tracking-tight uppercase md:text-8xl">
        Cut not found.
      </h1>
      <div className="mt-8">
        <PillLink href="/work">Back to work</PillLink>
      </div>
    </div>
  );
}
