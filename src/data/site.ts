import type { Category } from "@/lib/types";

export const site = {
  name: "TND Films",
  shortName: "TND",
  motto: "Tough Nature Dominates",
  email: "hello@tndfilms.com",
  location: "Maadi, Cairo",
  tagline: "We don't make ads. We make moments.",
  description:
    "TND Films is an independent creative production house in Maadi, Cairo. Films, commercials and visual content for fashion, automotive, F&B, music and events.",
  showreel: "/media/reel/showreel.mp4",
  showreelLoop: "/media/reel/showreel-loop.mp4",
  showreelPoster: "/media/reel/frame-03.jpg",
  archive:
    "https://drive.google.com/drive/folders/1h0iSwPf_7WktW11an1HeMboM3TcpA9lq?usp=sharing",
  socials: [
    {
      id: "instagram" as const,
      label: "Instagram",
      href: "https://www.instagram.com/tndfilms",
    },
    {
      id: "vimeo" as const,
      label: "Vimeo",
      href: "https://vimeo.com/tndfilms",
    },
    {
      id: "linkedin" as const,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/tndfilms",
    },
  ],
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Every brand from the website brief, in marquee order. */
export const clients = [
  "Audi",
  "Monster",
  "V7 Cola",
  "Cairokee",
  "National Motors",
  "4Matic",
  "Get Winn",
  "Malaaky",
  "LMNL",
  "Sakura",
  "Coaches Don't Play",
  "Tales",
  "By Nomi",
  "Arakis",
  "Velvitta",
  "Feline 5",
  "Wudd",
  "Be Basics",
  "Gabris",
  "Cove",
  "El Agha",
  "Brewloops",
  "La Pizza",
  "Muscle Temple",
  "Digination",
  "Bondus",
  "Rovan",
  "Khaled Rossia",
  "Fomanshi",
  "Sekka",
] as const;

export const verticals: {
  id: Category;
  title: string;
  copy: string;
  image: string;
}[] = [
  {
    id: "fnb",
    title: "F&B",
    copy: "Food, beverage and hospitality that looks as good as it tastes.",
    image: "/media/work/sakura/s05.jpg",
  },
  {
    id: "fashion",
    title: "Fashion",
    copy: "Style-forward stories that elevate brands and collections.",
    image: "/media/work/malaaky/s02.jpg",
  },
  {
    id: "automotive",
    title: "Automotive",
    copy: "Performance, design and culture in motion.",
    image: "/media/work/audi/f01.jpg",
  },
  {
    id: "music",
    title: "Music videos",
    copy: "Visuals that amplify the sound and the artist.",
    image: "/media/work/ko7l/s03.jpg",
  },
  {
    id: "events",
    title: "Events",
    copy: "Moments worth remembering, shot to be relived.",
    image: "/media/work/v7-cola-cairokee/s05.jpg",
  },
];

export const capabilities = [
  {
    id: "01",
    title: "Creative development",
    copy: "Strategy, concepts and treatments built to move people.",
  },
  {
    id: "02",
    title: "Pre-production",
    copy: "Planning, scouting, casting, logistics, shot lists.",
  },
  {
    id: "03",
    title: "Production",
    copy: "Direction, cinematography and on-set execution.",
  },
  {
    id: "04",
    title: "Post-production",
    copy: "Edit, grade, sound, motion and finishing.",
  },
  {
    id: "05",
    title: "Content systems",
    copy: "Deliverables, formats and assets built to scale.",
  },
] as const;

export const processSteps = [
  {
    id: "01",
    title: "Creative",
    note: "the treatment",
    copy: "Concepting, mood, story and visual direction. Every shoot starts as a written treatment and a board the whole crew can read.",
    image: "/media/bts/b10.jpg",
  },
  {
    id: "02",
    title: "Pre-production",
    note: "the plan",
    copy: "Planning, casting, locations, scheduling and logistics. The ugly list that makes the pretty day possible.",
    image: "/media/bts/b13.jpg",
  },
  {
    id: "03",
    title: "Production",
    note: "on set",
    copy: "Directing, cinematography, lighting and bringing it to life. Our own crew, our own kit, one call sheet.",
    image: "/media/bts/b14.jpg",
  },
  {
    id: "04",
    title: "Post",
    note: "the grade",
    copy: "Edit, grade, sound and motion. Delivered in every ratio, built to perform where it matters.",
    image: "/media/work/lmnl/s07.jpg",
  },
] as const;

export const budgetRanges = ["40–70K", "70–150K", "150–500K", "500K+"] as const;

export type BudgetRange = (typeof budgetRanges)[number];
