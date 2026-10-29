export type Category =
  | "fashion"
  | "automotive"
  | "fnb"
  | "events"
  | "music"
  | "digital";

export const categories: Category[] = [
  "fashion",
  "automotive",
  "fnb",
  "events",
  "music",
  "digital",
];

export type Still = {
  src: string;
  w: number;
  h: number;
};

export type Film = {
  /** Google Drive file id; streamed through Drive's embedded player. */
  id: string;
  label: string;
  poster: string | null;
  /** 9:16 reel rather than a 16:9 film. */
  vertical: boolean;
};

export type Project = {
  slug: string;
  title: string;
  handwritten: string;
  category: Category;
  featured: boolean;
  logline: string;
  deliverables: string[];
  poster: string | null;
  /** Short muted loop shown on hover. */
  preview: string | null;
  stills: Still[];
  films: Film[];
  /** Full shoot on Google Drive. */
  drive: string;
};

export function categoryLabel(category: Category): string {
  switch (category) {
    case "fashion":
      return "Fashion";
    case "automotive":
      return "Automotive";
    case "fnb":
      return "F&B";
    case "events":
      return "Events";
    case "music":
      return "Music videos";
    case "digital":
      return "Digital copies";
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export function isCategory(value: string | undefined): value is Category {
  return categories.some((category) => category === value);
}

export function driveEmbed(id: string): string {
  return `https://drive.google.com/file/d/${id}/preview`;
}
