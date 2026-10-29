// Runs before first paint (see the root layout) so repeat visits never flash the intro.
export const leaderSkipScript = `try{if(sessionStorage.getItem("tnd-leader")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("leader-skip")}catch(e){document.documentElement.classList.add("leader-skip")}`;
