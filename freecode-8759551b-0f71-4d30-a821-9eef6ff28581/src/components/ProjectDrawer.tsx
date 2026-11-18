import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SITE, type Project } from "../data/site";
import { useLockScroll } from "../lib/useSmoothScroll";
import { EASE, SPRING } from "../lib/motion";

type Props = { project: Project | null; onClose: () => void };

export default function ProjectDrawer({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockScroll(Boolean(project));

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const panel = document.querySelector(".drawer__panel");
        if (!panel) return;
        const items = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const t = setTimeout(() => closeRef.current?.focus(), 300);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="drawer"
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <motion.div
            className="drawer__scrim"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            data-cursor="CLOSE"
          />

          <motion.div
            className="drawer__panel"
            variants={{
              open: { x: "0%" },
              closed: { x: "100%" },
            }}
            transition={SPRING}
          >
            <div className="drawer__head">
              <span className="mono">
                case {project.index} / 04 — {project.status}
              </span>
              <button
                ref={closeRef}
                className="drawer__close"
                onClick={onClose}
                aria-label="Close case study"
                data-cursor="CLOSE"
              >
                <X size={16} />
                <span>close</span>
              </button>
            </div>

            <div className="drawer__body">
              <motion.h3
                id="drawer-title"
                className="drawer__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: EASE }}
              >
                {project.title}
              </motion.h3>
              <p className="drawer__role mono">{project.role}</p>

              <div className="drawer__band" aria-hidden="true">
                <span>{project.year}</span>
                <span>nairobi, ke</span>
                <span>{project.tags.join(" · ")}</span>
              </div>

              <p className="drawer__detail">{project.detail}</p>

              <div className="drawer__block">
                <span className="drawer__label mono">stack</span>
                <ul className="drawer__stack">
                  {project.stack.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 + i * 0.05, duration: 0.5, ease: EASE }}
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="drawer__block">
                <span className="drawer__label mono">links</span>
                <a
                  className="drawer__live"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN ↗"
                >
                  <span>live demo — simel-coral</span>
                  <ArrowUpRight size={16} />
                </a>
                <a
                  className="drawer__live drawer__live--ghost"
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN ↗"
                >
                  <span>github.com/simel554</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="drawer__cta">
                <p>want something like this?</p>
                <a className="btn btn--coral" href={`mailto:${SITE.email}`} data-cursor="SAY HI ↗">
                  <span>tell me about it</span>
                  <span className="btn__arrow">↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
