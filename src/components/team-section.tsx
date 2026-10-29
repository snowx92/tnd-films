import Image from "next/image";
import Link from "next/link";
import { departmentLabel, founders, team, teamGroups, type TeamMember } from "@/data/team";
import { site } from "@/data/site";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";
import { TndLogo } from "@/components/tnd-logo";

function TeamCard({ member }: { member: TeamMember }) {
  const initials = `${member.first[0] ?? ""}${member.last[0] ?? ""}`;

  return (
    <article className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-md border border-ink/10 bg-canvas-raised p-5">
      {member.image ? (
        <Image
          src={member.image}
          alt={`${member.first} ${member.last}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -right-4 -bottom-10 text-[12rem] leading-none tracking-tighter text-ink/[0.04] uppercase transition-colors duration-700 group-hover:text-signal/15"
        >
          {initials}
        </span>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-canvas/90 via-transparent to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />

      <p className="relative w-fit text-[10px] font-medium tracking-[0.18em] uppercase">
        {departmentLabel(member.department)}
        <span className="mt-1 block h-px w-6 bg-signal" />
      </p>
      <div className="relative">
        <h3 className="font-display text-4xl leading-[0.86] tracking-tight uppercase md:text-5xl">
          {member.first}
          {member.last ? (
            <>
              <br />
              {member.last}
            </>
          ) : null}
        </h3>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="rounded-full bg-canvas px-3 py-1.5 text-[10px] font-medium tracking-[0.12em] uppercase">
            {member.role}
          </p>
          <TndLogo className="w-9 shrink-0 text-ink/70" title="" />
        </div>
      </div>
    </article>
  );
}

type TeamSectionProps = {
  /** Show every department instead of the founders only. */
  full?: boolean;
};

export function TeamSection({ full = false }: TeamSectionProps) {
  const groups = full
    ? teamGroups.map((group) => ({
        title: group.title,
        members: team.filter((member) => group.departments.includes(member.department)),
      }))
    : [{ title: "Founders", members: founders }];

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
              {site.motto}
            </p>
            <h2 className="font-display mt-2 text-5xl tracking-tight uppercase md:text-8xl">
              The crew
            </h2>
          </div>
          {full ? (
            <Handwritten className="text-3xl md:text-4xl">{team.length} of us</Handwritten>
          ) : (
            <Link
              href="/about#crew"
              className="rounded-full border border-ink/25 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:bg-signal"
            >
              Meet all {team.length}
            </Link>
          )}
        </div>
      </Reveal>
      <div className="flex flex-col gap-16">
        {groups.map((group) => (
          <div key={group.title}>
            {full ? (
              <p className="mb-5 flex items-center gap-3 text-[11px] tracking-[0.26em] text-mute uppercase">
                <span className="h-px w-8 bg-signal" />
                {group.title}
              </p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((member, index) => (
                <Reveal key={`${member.first}-${member.last}`} delay={(index % 3) * 0.06}>
                  <TeamCard member={member} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
