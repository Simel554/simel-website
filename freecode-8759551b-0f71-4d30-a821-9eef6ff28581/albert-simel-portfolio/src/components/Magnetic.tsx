import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
  inline?: boolean;
};

/** Wraps children so they lean toward the pointer, springing back on leave. */
export default function Magnetic({
  children,
  strength = 0.22,
  className,
  style,
  inline = false,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 300, damping: 28, mass: 0.6 });

  const baseStyle: CSSProperties = {
    ...style,
    display: inline ? "inline-block" : undefined,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? baseStyle : { ...baseStyle, x, y }}
      onPointerMove={
        reduce
          ? undefined
          : (e) => {
              const el = ref.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              mx.set((e.clientX - (r.left + r.width / 2)) * strength);
              my.set((e.clientY - (r.top + r.height / 2)) * strength);
            }
      }
      onPointerLeave={
        reduce
          ? undefined
          : () => {
              mx.set(0);
              my.set(0);
            }
      }
    >
      {children}
    </motion.div>
  );
}
