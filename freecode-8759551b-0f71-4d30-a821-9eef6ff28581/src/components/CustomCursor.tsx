import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorState = { label: string; mode: "pill" | "ring" } | null;

/**
 * Spring-following cursor. Any element can opt in with:
 *   data-cursor="VIEW CASE"   (or DRAG / SAY HI ↗ / COPY / OPEN / SCROLL)
 * Desktop pointers only.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>(null);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 900, damping: 44, mass: 0.35 });
  const dotY = useSpring(y, { stiffness: 900, damping: 44, mass: 0.35 });
  const pillX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const pillY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    const wide = window.matchMedia("(min-width: 900px)");
    const sync = () => setEnabled(fine.matches && wide.matches);
    sync();
    fine.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    let latestX = -100;
    let latestY = -100;

    const onMove = (e: PointerEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        x.set(latestX);
        y.set(latestY);
      });

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!target) {
        setState(null);
        return;
      }
      // Named actions get the text pill; plain links get a subtle ring.
      const label = target.dataset.cursor;
      setState(
        label
          ? { label, mode: "pill" }
          : target.tagName === "A" || target.tagName === "BUTTON"
            ? { label: "", mode: "ring" }
            : null,
      );
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => {
      setState(null);
      setDown(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isPill = state?.mode === "pill";
  const isRing = state?.mode === "ring";

  return (
    <div className="cursor-layer" aria-hidden="true">
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: down ? 0.5 : isPill || isRing ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <motion.div
        className={`cursor-pill ${isRing ? "is-ring" : ""}`}
        style={{ x: pillX, y: pillY }}
        animate={{
          scale: down ? 0.86 : isPill ? 1 : isRing ? 0.72 : 0.2,
          opacity: isPill || isRing ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isPill && state?.label ? (
            <motion.span
              key={state.label}
              className="cursor-pill__label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {state.label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
