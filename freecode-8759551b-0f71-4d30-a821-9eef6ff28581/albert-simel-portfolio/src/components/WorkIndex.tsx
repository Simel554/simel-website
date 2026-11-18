import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "../data/site";
import ProjectDrawer from "./ProjectDrawer";
import { EASE } from "../lib/motion";

export default function WorkIndex() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const py = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  const vx = useVelocity(px);
  const rot = useSpring(useTransform(vx, [-1500, 0, 1500], [-9, 0, 9], { clamp: true }), {
    stiffness: 220,
    damping: 26,
  });

  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // keep the floating card fully on screen, flipping side near the edge
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
  const cardW = 268;
  const cardH = 335;
  const tx = useTransform(px, (v) => {
    const right = v + 44;
    return right + cardW > vp.w - 16 ? clamp(v - cardW - 36, 16, vp.w - cardW - 16) : right;
  });
  const ty = useTransform(py, (v) => clamp(v - 200, 92, vp.h - cardH - 16));

  const track = (e: React.PointerEvent) => {
    if (reduce) return;
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const activeProject = PROJECTS.find((p) => p.id === active) ?? null;

  return (
    <section id="work" className="work">
      <div className="shell">
        <div className="work__head">
          <div className="section-label">
            <b>##</b> work <span className="mono">$ ls ~/work/ · 5 entries</span>
          </div>
          <h2 className="section-title work__title">
            <span className="masked">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: EASE }}
              >
                selected projects
              </motion.span>
            </span>
          </h2>
          <p className="work__intro">
            Platforms built for Kenyan communities — house-hunting, food redistribution and
            coding education. Open a row for the full case.
          </p>
        </div>

        <div
          className={`work__list ${active ? "is-hovering" : ""}`}
          onPointerMove={track}
          onPointerLeave={() => setActive(null)}
        >
          <div className="work__list-head mono">
            <span>idx</span>
            <span>project</span>
            <span>role / tags</span>
            <span>year</span>
          </div>

          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              className={`row ${active === p.id ? "is-active" : ""}`}
              onPointerEnter={() => setActive(p.id)}
              onFocus={() => setActive(p.id)}
              onClick={() => setOpen(p)}
              data-cursor="VIEW CASE"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 * i }}
              aria-label={`Open case study for ${p.title}`}
            >
              <span className="row__hairline" aria-hidden="true" />
              <span className="row__idx mono">{p.index}</span>
              <span className="row__main">
                <span className="row__title">{p.path}</span>
                <span className="row__summary">{p.summary}</span>
              </span>
              <span className="row__meta">
                <span className="row__role">{p.role}</span>
                <span className="row__tags">
                  {p.tags.map((t) => (
                    <i key={t}>{t}</i>
                  ))}
                </span>
              </span>
              <span className="row__year mono">
                {p.year}
                <ArrowUpRight size={15} className="row__arrow" />
              </span>
            </motion.button>
          ))}
        </div>

        <div className="work__foot mono">
          <span>04 projects · 01 live portfolio</span>
          <a href="#contact" data-cursor="SAY HI ↗">
            start yours ↗
          </a>
        </div>
      </div>

      {/* spring-tracked hover preview */}
      <AnimatePresence>
        {activeProject && !reduce ? (
          <motion.div
            className="preview"
            style={{ x: tx, y: ty, rotate: rot }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.32, ease: EASE }}
            aria-hidden="true"
          >
            <PreviewCard project={activeProject} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ProjectDrawer project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function PreviewCard({ project }: { project: Project }) {
  return (
    <div className={`preview__card preview__card--${project.accent}`}>
      <div className="preview__top mono">
        <span>{project.index} / 04</span>
        <span>{project.year}</span>
      </div>
      <div className="preview__mid">
        <span className="preview__mark">{project.title.slice(0, 2).toLowerCase()}</span>
        <span className="preview__grid" aria-hidden="true" />
      </div>
      <div className="preview__bot">
        <strong>{project.title}</strong>
        <span className="mono">{project.status}</span>
      </div>
    </div>
  );
}
