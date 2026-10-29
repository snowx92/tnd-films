import { budgetRanges, type BudgetRange } from "@/data/site";

export const inquiryCategories = [
  "fashion",
  "fnb",
  "automotive",
  "music",
  "events",
  "other",
] as const;

export type InquiryCategory = (typeof inquiryCategories)[number];

export type ContactPayload = {
  name: string;
  email: string;
  brand: string;
  category: InquiryCategory;
  budget: BudgetRange;
  message: string;
  website?: string;
};

export function inquiryLabel(category: InquiryCategory): string {
  switch (category) {
    case "fashion":
      return "Fashion";
    case "fnb":
      return "F&B";
    case "automotive":
      return "Automotive";
    case "music":
      return "Music video";
    case "events":
      return "Events";
    case "other":
      return "Something else";
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export function isInquiryCategory(value: string): value is InquiryCategory {
  return inquiryCategories.some((item) => item === value);
}

export function isBudgetRange(value: string): value is BudgetRange {
  return budgetRanges.some((item) => item === value);
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactPayload(input: unknown): ContactPayload | string {
  if (typeof input !== "object" || input === null) {
    return "Send a name, email, and a note.";
  }

  const body = input as Record<string, unknown>;
  const text = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");
  const name = text("name");
  const email = text("email");
  const brand = text("brand");
  const message = text("message");
  const website = text("website");
  const category = isInquiryCategory(text("category")) ? (text("category") as InquiryCategory) : null;
  const budget = isBudgetRange(text("budget")) ? (text("budget") as BudgetRange) : null;

  if (website.length > 0) {
    return "ignored";
  }

  if (name.length < 2) {
    return "Give us a name we can say on set.";
  }

  if (!emailPattern.test(email)) {
    return "That email does not look live.";
  }

  if (brand.length < 2) {
    return "Which brand or business is this for?";
  }

  if (!category) {
    return "Pick a category.";
  }

  if (!budget) {
    return "Pick a budget range.";
  }

  if (message.length < 12) {
    return "A little more on the brief, please.";
  }

  return { name, email, brand, category, budget, message, website };
}
