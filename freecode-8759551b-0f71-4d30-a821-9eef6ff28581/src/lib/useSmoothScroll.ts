import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/** Inertia scrolling. Disabled for reduced-motion users. */
export function useSmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    document.documentElement.classList.add("lenis-on");

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const scrollTo = (e: Event) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.3 });
    };

    document.addEventListener("click", scrollTo);
    return () => {
      document.removeEventListener("click", scrollTo);
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, [reduce]);
}

export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}
