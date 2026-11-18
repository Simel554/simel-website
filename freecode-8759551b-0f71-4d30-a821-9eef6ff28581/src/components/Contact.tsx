import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import { SITE } from "../data/site";
import { EASE, SPRING } from "../lib/motion";

const SOCIALS = [
  { label: "github", href: SITE.github, handle: "github.com/simel554" },
  { label: "linkedin", href: SITE.linkedin, handle: "linkedin.com/in/albertsimel" },
  { label: "x / twitter", href: SITE.x, handle: "x.com/albertsimel" },
  { label: "whatsapp", href: SITE.whatsapp, handle: "+254 716 034 770" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SITE.email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2400);
  }, []);

  return (
    <>
      <section id="contact" className="contact">
        <div className="shell">
          <div className="section-label">
            <b>##</b> contact
          </div>

          <h2 className="contact__headline">
            <span className="masked">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 1.05, ease: EASE }}
              >
                got something
              </motion.span>
            </span>
            <span className="masked">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 1.05, ease: EASE, delay: 0.08 }}
              >
                worth <i>building</i>?
              </motion.span>
            </span>
          </h2>

          <div className="contact__grid">
            <div className="contact__left">
              <p className="contact__pitch">
                Have a project or an idea? I'm open to freelance and contract work — tell me what
                you're building and I'll reply within 24 hours.
              </p>

              <div className="contact__actions">
                <Magnetic strength={0.2}>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--coral"
                    data-cursor="SAY HI ↗"
                  >
                    <span>start a new project</span>
                    <ArrowUpRight size={15} className="btn__arrow" />
                  </a>
                </Magnetic>

                <button
                  className="copy-pill"
                  onClick={copy}
                  data-cursor="COPY"
                  aria-label="Copy email address"
                >
                  <span className="copy-pill__text">{SITE.email}</span>
                  <span className="copy-pill__icon">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </span>
                </button>
              </div>

              <div className="contact__meta mono">
                <span>Nairobi, KE — {SITE.coords}</span>
                <span>reply window &lt; 24h</span>
              </div>
            </div>

            <div className="contact__right">
              <span className="contact__label mono">elsewhere</span>
              <ul className="socials">
                {SOCIALS.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                  >
                    <Magnetic strength={0.14}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social"
                        data-cursor="OPEN ↗"
                      >
                        <span className="social__label">{s.label}</span>
                        <span className="social__handle mono">{s.handle}</span>
                        <ArrowUpRight size={16} className="social__arrow" />
                      </a>
                    </Magnetic>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* oversized closing wordmark */}
        <div className="contact__wordmark" aria-hidden="true">
          <span>albert simel</span>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer__row">
          <span className="mono">$ © 2026 albert simel · nairobi, ke</span>
          <nav className="footer__links mono" aria-label="Footer">
            <a href="#about">about</a>
            <a href="#work">work</a>
            <a href="#contact">contact</a>
            <a href="#top" data-cursor="TOP">back to top ↑</a>
          </nav>
        </div>
      </footer>

      <AnimatePresence>
        {copied ? (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={SPRING}
          >
            <span className="toast__dot" />
            copied to clipboard ✓
            <span className="toast__mail mono">{SITE.email}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
