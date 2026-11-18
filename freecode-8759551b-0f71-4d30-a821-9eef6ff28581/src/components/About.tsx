import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Marquee from "./Marquee";
import { CAPABILITIES, SITE, SKILLS, STATS } from "../data/site";
import { EASE, SPRING } from "../lib/motion";

export default function About() {
  const [open, setOpen] = useState<string | null>("product");

  return (
    <section id="about" className="about">
      <div className="shell">
        <div className="about__head">
          <div className="section-label">
            <b>##</b> about
          </div>
          <h2 className="section-title about__title">
            <span className="masked">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: EASE }}
              >
                built in nairobi,
              </motion.span>
            </span>
            <span className="masked">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: EASE, delay: 0.08 }}
              >
                shipped <i className="about__accent">everywhere</i>.
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="about__top">
          <div className="about__bio">
            <span className="cmd mono">$ cat about.md</span>
            <p>
              I'm a developer based in Nairobi, Kenya, building web platforms and Android apps
              that serve real local needs — from house-hunting and academic projects to coding
              education.
            </p>
            <p>
              I've completed my diploma in Information &amp; Communication Technology at Regional
              Centre Training Institute and am now awaiting graduation. After completing my
              education I joined the{" "}
              <a
                className="about__link"
                href={SITE.americanSpaces}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN ↗"
              >
                American Spaces
              </a>{" "}
              where I am situated in the American Corner Moi as a volunteer.
            </p>
            <span className="cmd mono about__exit">$ exit 0</span>
          </div>

          <div className="bento">
            {STATS.map((s, i) => (
              <motion.div
                className="bento__cell"
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              >
                <span className="bento__num">{s.value}</span>
                <span className="bento__label">{s.label}</span>
                <span className="bento__idx mono">0{i + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="about__marquee">
          <Marquee items={SKILLS} baseVelocity={1.8} direction={-1} separator="·" />
        </div>

        <div className="caps">
          <div className="caps__head">
            <h3 className="caps__title">capabilities</h3>
            <span className="mono">$ ls skills/ — {SKILLS.length} entries</span>
          </div>

          <LayoutGroup>
            <div className="caps__list">
              {CAPABILITIES.map((c) => {
                const isOpen = open === c.id;
                return (
                  <div className={`cap ${isOpen ? "is-open" : ""}`} key={c.id}>
                    {isOpen ? (
                      <motion.span
                        layoutId="capHighlight"
                        className="cap__highlight"
                        transition={SPRING}
                      />
                    ) : null}
                    <button
                      className="cap__trigger"
                      onClick={() => setOpen(isOpen ? null : c.id)}
                      aria-expanded={isOpen}
                      data-cursor={isOpen ? "CLOSE" : "OPEN"}
                    >
                      <span className="cap__idx mono">{c.index}</span>
                      <span className="cap__name">
                        {c.title}
                        <i className="cap__kicker">{c.kicker}</i>
                      </span>
                      <span className="cap__icon">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          className="cap__panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="cap__inner">
                            <p>{c.body}</p>
                            <ul>
                              {c.items.map((it) => (
                                <li key={it} className="mono">
                                  {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <div className="about__resume">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="OPEN ↗"
            className="about__resume-link"
          >
            <span>full experience on linkedin</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
