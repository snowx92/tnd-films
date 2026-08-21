export type Vertical = "ecommerce" | "automotive";

export type Credit = {
  role: string;
  name: string;
};

export type Project = {
  slug: string;
  title: string;
  handwritten: string;
  client: string;
  year: string;
  vertical: Vertical;
  services: string[];
  logline: string;
  brief: string;
  production: string;
  result: string;
  poster: string;
  stills: string[];
  video?: string;
  credits: Credit[];
};

export function verticalLabel(vertical: Vertical): string {
  switch (vertical) {
    case "ecommerce":
      return "E-commerce";
    case "automotive":
      return "Automotive";
    default: {
      const _exhaustive: never = vertical;
      return _exhaustive;
    }
  }
}
