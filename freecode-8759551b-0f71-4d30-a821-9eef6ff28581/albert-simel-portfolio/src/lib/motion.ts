export const SPRING = { type: "spring", stiffness: 300, damping: 28, mass: 0.6 } as const;
export const SOFT_SPRING = { type: "spring", stiffness: 160, damping: 24, mass: 0.7 } as const;
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealLine = {
  hidden: { y: "115%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: 0.08 * i },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.06 * i },
  }),
};
