export type InquiryVertical = "ecommerce" | "automotive" | "both";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  vertical: InquiryVertical;
  message: string;
  website?: string;
};

export function inquiryLabel(vertical: InquiryVertical): string {
  switch (vertical) {
    case "ecommerce":
      return "E-commerce";
    case "automotive":
      return "Automotive";
    case "both":
      return "Both";
    default: {
      const _exhaustive: never = vertical;
      return _exhaustive;
    }
  }
}

export function isInquiryVertical(value: string): value is InquiryVertical {
  return value === "ecommerce" || value === "automotive" || value === "both";
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactPayload(input: unknown): ContactPayload | string {
  if (typeof input !== "object" || input === null) {
    return "Send a name, email, and a note.";
  }

  const body = input as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";
  const vertical =
    typeof body.vertical === "string" && isInquiryVertical(body.vertical)
      ? body.vertical
      : null;

  if (website.length > 0) {
    return "ignored";
  }

  if (name.length < 2) {
    return "Give us a name we can say on set.";
  }

  if (!emailPattern.test(email)) {
    return "That email does not look live.";
  }

  if (!vertical) {
    return "Pick e-commerce, automotive, or both.";
  }

  if (message.length < 12) {
    return "A little more on the brief, please.";
  }

  return { name, email, company, vertical, message, website };
}
