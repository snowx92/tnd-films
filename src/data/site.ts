export const site = {
  name: "TND Films",
  shortName: "TND",
  email: "hello@tndfilms.com",
  tagline: "E-commerce and automotive, shot like they already sold out.",
  description:
    "TND Films is a creative production house for e-commerce and automotive brands. Product, metal, light, and the cut that makes people stay.",
  showreel:
    "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  showreelPoster:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80",
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

export const processSteps = [
  {
    id: "01",
    title: "Research",
    copy: "Brand, shelf, competitor, the one object that has to win the frame.",
  },
  {
    id: "02",
    title: "Pitch",
    copy: "A concept with teeth. Not a moodboard dump. A reason to shoot.",
  },
  {
    id: "03",
    title: "Pre",
    copy: "Slate, stills, talent, location, the ugly list that makes the pretty day.",
  },
  {
    id: "04",
    title: "Shoot",
    copy: "Light on product. Light on paint. Take 14 if take 13 is almost true.",
  },
  {
    id: "05",
    title: "Cut",
    copy: "Edit, grade, sound. Delivered ready to run paid, organic, and the homepage.",
  },
] as const;
