export const metaPixelId = "1444870917302233";
export const gtmId = "GTM-WBNX9WF4";
export const clarityId = "ziunx49pdm";

/** Tags only load on the deployed site so local testing stays out of the reports. */
export const analyticsEnabled = process.env.NODE_ENV === "production";

type Fbq = (command: "init" | "track" | "trackCustom", name: string, params?: Record<string, unknown>) => void;
type Clarity = (command: "event" | "set", key: string, value?: string) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    dataLayer?: Record<string, unknown>[];
    clarity?: Clarity;
  }
}

// A broken or blocked tag must never break the page it is measuring.
function safely(send: () => void) {
  try {
    send();
  } catch (error) {
    console.warn("Analytics call failed", error);
  }
}

export function trackPageView(path: string) {
  safely(() => window.fbq?.("track", "PageView"));
  safely(() => window.dataLayer?.push({ event: "page_view", page_path: path }));
}

/**
 * A brief reached the inbox. Sends Meta "Lead", a GTM `generate_lead` event and a
 * Clarity event. Only the category and budget go out, never the person's details.
 */
export function trackLead(lead: { category: string; budget: string }) {
  safely(() =>
    window.fbq?.("track", "Lead", {
      content_name: "Contact brief",
      content_category: lead.category,
      budget: lead.budget,
    }),
  );
  safely(() =>
    window.dataLayer?.push({
      event: "generate_lead",
      form_name: "contact_brief",
      lead_category: lead.category,
      lead_budget: lead.budget,
    }),
  );
  safely(() => {
    window.clarity?.("set", "lead_category", lead.category);
    window.clarity?.("event", "contact_brief_submitted");
  });
}
