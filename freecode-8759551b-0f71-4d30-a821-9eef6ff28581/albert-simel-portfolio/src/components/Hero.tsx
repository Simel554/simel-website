import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Code2, Smartphone, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";
import Marquee from "./Marquee";
import { MARQUEE_WORDS, SITE } from "../data/site";
import { EASE } from "../lib/motion";

const HERO_LINES = ["albert", "simel"];

export default function Hero() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // mouse tilt
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [9, -9]), {
    stiffness: 240,
    damping: 26,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-11, 11]), {
    stiffness: 240,
    damping: 26,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,77,61,0.28), transparent 62%)`;

  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const resetTilt = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <section id="top" className="hero">
      <div className="shell hero__inner">
        <div className="hero__meta">
          <span className="eyebrow">
            <i className="tick">+/</i> Nairobi, Kenya — {SITE.coords}
          </span>
          <span className="status-pill">
            <span className="live-dot" />
            available for work · {SITE.availability}
          </span>
        </div>

        <h1 className="hero__title" aria-label="Albert Simel">
          {HERO_LINES.map((line, i) => (
            <span className="masked hero__line" key={line}>
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.15, ease: EASE, delay: 0.12 + i * 0.08 }}
              >
                {line}
                {i === 1 ? <i className="hero__dot">.</i> : null}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero__grid">
          <motion.div
            className="hero__lede"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
          >
            <p className="hero__role">
              <span className="mono">[ web &amp; android developer ]</span>
            </p>
            <p className="hero__desc">{SITE.tagline}</p>

            <div className="hero__ctas">
              <Magnetic strength={0.2}>
                <a href="#work" className="btn btn--coral" data-cursor="VIEW WORK">
                  <span>view my work</span>
                  <ArrowUpRight size={15} strokeWidth={2} className="btn__arrow" />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href={`mailto:${SITE.email}`} className="btn" data-cursor="SAY HI ↗">
                  <span>get in touch</span>
                  <span className="btn__arrow">↗</span>
                </a>
              </Magnetic>
            </div>

            <div className="hero__stats">
              {[
                ["4", "independent projects"],
                ["8+", "languages & tools"],
                ["2026", "latest ship"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="hero__stat-v">{v}</div>
                  <div className="hero__stat-l">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* focal centerpiece: tilt card + draggable badge cluster */}
          <motion.div
            className="hero__stage"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.36 }}
            data-cursor={dragging ? "DRAG" : "TILT"}
          >
            <div
              className="stage__frame"
              ref={cardRef}
              onPointerMove={onTilt}
              onPointerLeave={resetTilt}
            >
              <motion.div
                className="tilt-card"
                style={
                  reduce
                    ? undefined
                    : { rotateX: rx, rotateY: ry, transformPerspective: 900 }
                }
              >
                <motion.div className="tilt-card__glare" style={{ background: glare }} />
                <div className="tilt-card__top">
                  <span className="mono">~/albert — card.01</span>
                  <span className="mono">NBO</span>
                </div>
                <div className="tilt-card__mid">
                  <span className="tilt-card__mark">as</span>
                  <div className="tilt-card__rings" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="tilt-card__bot">
                  <p>builds that solve real local problems.</p>
                  <div className="tilt-card__tags">
                    <span>node</span>
                    <span>react</span>
                    <span>android</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="badge badge--a"
              drag
              dragMomentum={false}
              dragElastic={0.18}
              whileDrag={{ scale: 1.08, cursor: "grabbing" }}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              data-cursor="DRAG"
            >
              <Code2 size={13} /> ship end to end
            </motion.div>

            <motion.div
              className="badge badge--b"
              drag
              dragMomentum={false}
              dragElastic={0.18}
              whileDrag={{ scale: 1.08 }}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              data-cursor="DRAG"
            >
              <Smartphone size={13} /> android + web
            </motion.div>

            <motion.div
              className="badge badge--c"
              drag
              dragMomentum={false}
              dragElastic={0.18}
              whileDrag={{ scale: 1.08 }}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              data-cursor="DRAG"
            >
              <Sparkles size={13} /> mpesa native
            </motion.div>

            <span className="stage__axis stage__axis--v" aria-hidden="true" />
            <span className="stage__axis stage__axis--h" aria-hidden="true" />
            <span className="stage__note mono">FIG. 01 — drag the badges</span>
          </motion.div>
        </div>
      </div>

      <div className="hero__ticker">
        <Marquee items={MARQUEE_WORDS} baseVelocity={2.4} />
      </div>

      <a href="#about" className="hero__scroll" data-cursor="SCROLL">
        <span>scroll</span>
        <i />
      </a>
    </section>
  );
}
