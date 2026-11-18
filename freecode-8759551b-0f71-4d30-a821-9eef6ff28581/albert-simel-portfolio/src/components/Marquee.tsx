import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

type MarqueeProps = {
  items: string[];
  baseVelocity?: number;
  /** 1 = left, -1 = right */
  direction?: 1 | -1;
  className?: string;
  separator?: string;
};

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/** Velocity-sensitive infinite ticker: scroll harder, it accelerates and bends. */
export default function Marquee({
  items,
  baseVelocity = 3,
  direction = 1,
  className = "",
  separator = "✳",
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const smooth = useSpring(scrollVel, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1600, 0, 1600], [-2.4, 0, 2.4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const dir = useRef(direction);
  useAnimationFrame((_t, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    if (reduce) moveBy = dir.current * 1.2 * (delta / 1000);
    moveBy += moveBy * factor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items];

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <motion.div className="marquee__track" style={{ x }}>
        {[0, 1].map((half) => (
          <div className="marquee__half" key={half}>
            {row.map((item, i) => (
              <span className="marquee__item" key={`${half}-${i}`}>
                {item}
                <i className="marquee__sep">{separator}</i>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
