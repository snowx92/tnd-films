export const locales = ["en", "ar", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar" || value === "fr";
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  switch (locale) {
    case "ar":
      return "rtl";
    case "en":
    case "fr":
      return "ltr";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function localeLabel(locale: Locale): string {
  switch (locale) {
    case "en":
      return "EN";
    case "ar":
      return "عر";
    case "fr":
      return "FR";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function withLocale(locale: Locale, href: string) {
  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const path = href.startsWith("/") ? href : `/${href}`;
  if (locales.some((item) => path === `/${item}` || path.startsWith(`/${item}/`))) {
    return path;
  }

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
