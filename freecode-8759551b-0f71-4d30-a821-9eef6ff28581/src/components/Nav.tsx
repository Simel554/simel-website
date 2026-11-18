import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { SITE } from "../data/site";
import { useLockScroll } from "../lib/useSmoothScroll";
import { EASE } from "../lib/motion";

const LINKS = [
  { id: "about", label: "about", index: "01" },
  { id: "work", label: "work", index: "02" },
  { id: "contact", label: "contact", index: "03" },
];

function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        timeZone: SITE.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const clock = useClock();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 34, mass: 0.5 });

  useLockScroll(open);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className={`nav ${stuck ? "is-stuck" : ""}`}>
        <div className="shell nav__inner">
          <a href="#top" className="brand" aria-label="Albert Simel, back to top">
            <span className="brand__tilde">~$</span>
            <span>cd ~/albert</span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="nav__link">
                <span>
                  <i className="nav__index">{l.index}</i>
                  {l.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="nav__status">
            <span className="time">
              NBO <b>{clock}</b>
            </span>
            <span className="status-pill">
              <span className="live-dot" />
              accepting projects
            </span>
            <button
              className="menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="sheet"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="sheet__top">
              <span className="brand">
                <span className="brand__tilde">~$</span>
                <span>cd ~/albert</span>
              </span>
              <button className="sheet__close" onClick={() => setOpen(false)}>
                close ✕
              </button>
            </div>

            <div className="sheet__links">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE }}
                  onClick={() => {
                    setOpen(false);
                    requestAnimationFrame(() => {
                      document.querySelector(`#${l.id}`)?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  <em>{l.index}</em>
                  {l.label}/
                </motion.button>
              ))}
            </div>

            <div className="sheet__foot">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                github ↗
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin ↗
              </a>
              <span>nairobi, ke · {clock}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
