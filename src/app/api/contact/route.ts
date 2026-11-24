import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { inquiryLabel, parseContactPayload } from "@/lib/inquiry";

/** Settings pasted into a dashboard often pick up surrounding spaces or quotes. */
function cleanSetting(value: string | undefined): string {
  return (value ?? "").trim().replace(/^(["'])(.*)\1$/, "$2").trim();
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "That did not parse." },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body);

  if (parsed === "ignored") {
    return NextResponse.json({ ok: true });
  }

  if (typeof parsed === "string") {
    return NextResponse.json({ ok: false, error: parsed }, { status: 400 });
  }

  const key = cleanSetting(process.env.RESEND_API_KEY);
  const from = cleanSetting(process.env.CONTACT_FROM_EMAIL);
  const to = cleanSetting(process.env.CONTACT_TO_EMAIL) || site.email;
  const subject = `New brief: ${parsed.brand} / ${inquiryLabel(parsed.category)} / ${parsed.budget}`;
  const text = [
    `Name: ${parsed.name}`,
    `Email: ${parsed.email}`,
    `Brand / business: ${parsed.brand}`,
    `Category: ${inquiryLabel(parsed.category)}`,
    `Budget (production fees only): ${parsed.budget}`,
    "",
    parsed.message,
  ].join("\n");

  // Never tell a visitor their brief arrived when nothing could send it.
  if (!key || !from) {
    console.warn(`Contact email is not configured; brief for ${to} was not sent.\n${subject}\n${text}`);
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: `Our inbox is offline. Write us at ${site.email}.` },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  }

  const failed = NextResponse.json(
    { ok: false, error: `Mail did not leave the house. Write us at ${site.email}.` },
    { status: 502 },
  );

  // A key pasted with stray characters makes fetch throw before any request is made.
  if (/[^\x21-\x7e]/.test(key)) {
    console.error("RESEND_API_KEY contains spaces, line breaks or other unexpected characters; paste it again.");
    return failed;
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.email,
        subject,
        text,
      }),
    });
  } catch (error) {
    console.error(`Could not reach Resend: ${error instanceof Error ? error.name : "unknown error"}`);
    return failed;
  }

  if (!response.ok) {
    console.error(`Resend rejected the brief (${response.status}): ${await response.text()}`);
    return failed;
  }

  return NextResponse.json({ ok: true });
}
