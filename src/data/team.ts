export type Department =
  | "founders"
  | "creative"
  | "business"
  | "production"
  | "post"
  | "camera"
  | "legal";

export type TeamMember = {
  first: string;
  last: string;
  role: string;
  department: Department;
  /** Portrait path once the team shoot is done; initials are shown until then. */
  image?: string;
};

export function departmentLabel(department: Department): string {
  switch (department) {
    case "founders":
      return "Founder";
    case "creative":
      return "Creative team";
    case "business":
      return "Business developers";
    case "production":
      return "Production";
    case "post":
      return "Post-production";
    case "camera":
      return "Camera / Photo";
    case "legal":
      return "Legal";
    default: {
      const _exhaustive: never = department;
      return _exhaustive;
    }
  }
}

export const teamGroups: { title: string; departments: Department[] }[] = [
  { title: "Founders", departments: ["founders"] },
  { title: "Creative + business", departments: ["creative", "business"] },
  {
    title: "Production + post + support",
    departments: ["production", "post", "camera", "legal"],
  },
];

export const team: TeamMember[] = [
  { first: "Kareem", last: "Zahran", role: "Founder & Chairman", department: "founders" },
  { first: "Marwan", last: "Helaly", role: "Co-founder & Executive Producer", department: "founders" },
  { first: "Adam", last: "Zahera", role: "Co-founder & Executive Producer", department: "founders" },
  { first: "Solly", last: "Man", role: "Co-founder & DOP", department: "founders" },
  { first: "Momen", last: "Amin", role: "Co-founder & Director", department: "founders" },
  { first: "Nour", last: "Magdy", role: "Head of Creative Team", department: "creative" },
  { first: "Habiba", last: "Nehad", role: "Creative Director", department: "creative" },
  { first: "Hala", last: "Mohamed", role: "Creative Director", department: "creative" },
  { first: "Mostafa", last: "Yasser", role: "Head of Business Developers", department: "business" },
  { first: "Menna", last: "Galal", role: "Business Developer Lead", department: "business" },
  { first: "Yasmin", last: "Amr", role: "Business Developer", department: "business" },
  { first: "Ali", last: "Ashraf", role: "Producer", department: "production" },
  { first: "Mohamed", last: "Mosa", role: "Producer", department: "production" },
  { first: "Zeyad", last: "Nour", role: "Editor", department: "post" },
  { first: "Hatem", last: "", role: "Editor", department: "post" },
  { first: "Youssef", last: "Eid", role: "Assistant Camera & Photo Editor", department: "camera" },
  { first: "Ahmed", last: "Gamal", role: "Head of Legal Department", department: "legal" },
];

export const founders = team.filter((member) => member.department === "founders");
