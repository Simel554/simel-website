/* ============================================================
   ~/albert simel — portfolio
   Vanilla JS build: cursor, reveals, marquee, tilt, drag,
   hover preview, case drawer, accordion, copy-to-clipboard.
   ============================================================ */

const PROJECTS = {
  nyumbake: {
    index: "01",
    title: "Nyumbake",
    role: "Solo dev · Product & build",
    year: "2026",
    status: "in-progress",
    tags: ["marketplace", "mpesa"],
    detail:
      "Nyumbake pairs two very different users in one product: renters hunting through Nairobi neighbourhoods and landlords listing units. It ships with KES-native pricing, saved searches, and a seeker/landlord mode switch that reshapes the whole interface. Payments integrate through M-Pesa Daraja once a listing is agreed.",
    stack: ["javascript", "node.js", "mpesa daraja", "git"],
    accent: "coral",
  },
  devarena: {
    index: "02",
    title: "DevArena",
    role: "Solo dev · Full prototype",
    year: "2026",
    status: "prototype",
    tags: ["education", "gamified"],
    detail:
      "A learning arena where progress is the reward. Students work through coding challenges with streaks and points, while parents get their own role-based view of progress. Authentication is role-aware (student / parent), and the whole interface switches between dark and light themes. Delivered as a full working prototype.",
    stack: ["node.js", "express", "sqlite", "oauth"],
    accent: "stone",
  },
  njiacode: {
    index: "03",
    title: "NjiaCode",
    role: "Solo dev · Education",
    year: "2026",
    status: "in-progress",
    tags: ["learning", "certificates"],
    detail:
      "NjiaCode is a coding education app built for learners who need a clear path rather than endless tabs. Courses are broken into lessons with completion tracking, and the next release adds free verifiable certificates for every learner who finishes a track — no paywall between a student and proof of their work.",
    stack: ["javascript", "education", "certificates"],
    accent: "coral",
  },
  "farm-input": {
    index: "04",
    title: "Farm Input",
    role: "Academic project · Data",
    year: "2025",
    status: "academic",
    tags: ["supply", "records"],
    detail:
      "Built as an academic project: a farm input management application for tracking supplies and stock. Records inputs as they arrive and leave the store, keeps a running stock position, and makes the paper ledger unnecessary for smallholders and co-operatives.",
    stack: ["javascript", "data management"],
    accent: "stone",
  },
};

const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

/* ------------------------------------------------------------
   clock (Nairobi)
   ---------------------------------------------------------- */
function tickClock() {
  const t = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
  const navClock = $("#navClock");
  const sheetClock = $("#sheetClock");
  if (navClock) navClock.textContent = t;
  if (sheetClock) sheetClock.textContent = t;
}
tickClock();
setInterval(tickClock, 1000);

/* ------------------------------------------------------------
   nav state + scroll progress
   ---------------------------------------------------------- */
const nav = $("#nav");
const progress = $("#progress");
function onScroll() {
  nav.classList.toggle("is-stuck", window.scrollY > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  progress.style.transform = `scaleX(${p})`;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ------------------------------------------------------------
   mobile menu
   ---------------------------------------------------------- */
const sheet = $("#sheet");
const menuBtn = $("#menuBtn");
function setMenu(open) {
  sheet.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("is-locked", open);
}
menuBtn.addEventListener("click", () => setMenu(true));
$("#sheetClose").addEventListener("click", () => setMenu(false));
$$("[data-goto]", sheet).forEach((b) =>
  b.addEventListener("click", () => {
    const target = document.getElementById(b.dataset.goto);
    setMenu(false);
    target?.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
  }),
);

/* ------------------------------------------------------------
   custom cursor
   ---------------------------------------------------------- */
const cursorLayer = $(".cursor-layer");
const cursorDot = $("#cursorDot");
const cursorPill = $("#cursorPill");
const cursorLabel = $("#cursorLabel");
const finePointer = window.matchMedia("(pointer: fine) and (min-width: 900px)");

let pointerX = -100;
let pointerY = -100;
let dotX = -100;
let dotY = -100;
let pillX = -100;
let pillY = -100;
let cursorOn = false;

function syncCursor() {
  cursorOn = finePointer.matches && !REDUCE;
  cursorLayer.classList.toggle("is-on", cursorOn);
  document.documentElement.classList.toggle("has-custom-cursor", cursorOn);
  if (!cursorOn) setCursorState(null);
}
syncCursor();
finePointer.addEventListener("change", syncCursor);

function setCursorState(label) {
  if (!cursorOn) return;
  cursorPill.classList.toggle("is-ring", label === "");
  cursorPill.style.opacity = label === null ? "0" : "1";
  cursorPill.style.transform = `translate(-50%, -50%) scale(${label === "" ? 0.72 : 1})`;
  cursorLabel.textContent = label ?? "";
}

window.addEventListener("pointermove", (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;

  if (cursorOn) {
    const target = e.target instanceof Element ? e.target.closest("[data-cursor], a, button") : null;
    if (!target) setCursorState(null);
    else if (target.dataset.cursor) setCursorState(target.dataset.cursor);
    else if (target.tagName === "A" || target.tagName === "BUTTON") setCursorState("");
    else setCursorState(null);
  }
}, { passive: true });

window.addEventListener("pointerdown", () => {
  if (!cursorOn) return;
  cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)";
  cursorPill.style.transform = cursorPill.style.transform.replace(/scale\([^)]*\)/, "scale(0.86)");
});
window.addEventListener("pointerup", () => {
  if (!cursorOn) return;
  cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
});
window.addEventListener("pointerleave", () => setCursorState(null));

function cursorLoop() {
  if (cursorOn) {
    dotX += (pointerX - dotX) * 0.55;
    dotY += (pointerY - dotY) * 0.55;
    pillX += (pointerX - pillX) * 0.16;
    pillY += (pointerY - pillY) * 0.16;
    cursorDot.style.left = dotX + "px";
    cursorDot.style.top = dotY + "px";
    cursorDot.style.transform = "translate(-50%, -50%)";
    if (!cursorPill.classList.contains("is-ring")) {
      cursorPill.style.left = pillX + "px";
      cursorPill.style.top = pillY + "px";
    } else {
      cursorPill.style.left = pillX + "px";
      cursorPill.style.top = pillY + "px";
    }
  }
  requestAnimationFrame(cursorLoop);
}
requestAnimationFrame(cursorLoop);

/* ------------------------------------------------------------
   magnetic elements
   ---------------------------------------------------------- */
if (!REDUCE) {
  $$(".magnetic").forEach((wrap) => {
    const strength = 0.2;
    wrap.addEventListener("pointermove", (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      wrap.style.transform = `translate(${x}px, ${y}px)`;
      wrap.style.transition = "transform 0.08s linear";
    });
    wrap.addEventListener("pointerleave", () => {
      wrap.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1)";
      wrap.style.transform = "translate(0, 0)";
    });
  });
}

/* ------------------------------------------------------------
   reveal on scroll
   ---------------------------------------------------------- */
const revealEls = $$("[data-reveal], .masked > span");

function revealAll() {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

if (REDUCE) {
  revealAll();
} else {
  // Scroll-driven reveal: reliable even when the page is jumped with anchors.
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    return r.top < vh * 0.95 && r.bottom > -vh * 0.1;
  };
  let queued = false;
  const sweep = () => {
    queued = false;
    revealEls.forEach((el) => {
      if (!el.classList.contains("is-in") && inView(el)) el.classList.add("is-in");
    });
  };
  const queueSweep = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };

  queueSweep();
  window.addEventListener("scroll", queueSweep, { passive: true });
  window.addEventListener("resize", queueSweep, { passive: true });
  window.addEventListener("load", queueSweep);
  // anchor jumps and smooth scrolls: sweep a few times while motion settles
  [120, 320, 620, 1000, 1600].forEach((t) => setTimeout(queueSweep, t));
  document.addEventListener("click", () => [80, 400, 900, 1500].forEach((t) => setTimeout(queueSweep, t)));
  // last resort so nothing can stay invisible
  window.setTimeout(revealAll, 4000);
}

/* ------------------------------------------------------------
   velocity-sensitive marquee
   ---------------------------------------------------------- */
let scrollVelocity = 0;
let lastScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    scrollVelocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
  },
  { passive: true },
);

function buildMarquee(el) {
  const track = $(".marquee__track", el);
  const half = $(".marquee__half", track);
  if (!half) return;
  // duplicate until the row is wide enough to loop seamlessly
  const clone = half.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);

  const base = parseFloat(el.dataset.speed || "2");
  let pos = 0;
  let width = half.getBoundingClientRect().width || 1;
  const measure = () => {
    width = half.getBoundingClientRect().width || 1;
  };
  window.addEventListener("resize", measure, { passive: true });
  setTimeout(measure, 300);

  const step = (dt) => {
    const boost = Math.max(-2, Math.min(2, scrollVelocity / 30));
    pos -= (base + boost * Math.abs(base) * 0.7) * dt;
    if (width > 0) pos = ((pos % width) + width) % width;
    track.style.transform = `translate3d(${-pos}px, 0, 0)`;
    scrollVelocity *= 0.92;
  };
  return step;
}

const marqueeSteppers = $$("[data-marquee]").map(buildMarquee).filter(Boolean);
let lastTime = performance.now();
function marqueeLoop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  marqueeSteppers.forEach((step) => step(dt));
  requestAnimationFrame(marqueeLoop);
}
requestAnimationFrame(marqueeLoop);

/* ------------------------------------------------------------
   hero tilt card + draggable badges
   ---------------------------------------------------------- */
const stageFrame = $("#stageFrame");
const tiltCard = $("#tiltCard");
const glare = $("#glare");

if (stageFrame && tiltCard && !REDUCE) {
  stageFrame.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = stageFrame.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 22;
    const rx = (0.5 - py) * 18;
    tiltCard.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    glare.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(255,77,61,0.28), transparent 62%)`;
  });
  stageFrame.addEventListener("pointerleave", () => {
    tiltCard.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    tiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    setTimeout(() => (tiltCard.style.transition = ""), 700);
  });
}

$$("[data-drag]").forEach((badge) => {
  let ox = 0;
  let oy = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  badge.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX - ox;
    startY = e.clientY - oy;
    badge.setPointerCapture(e.pointerId);
    badge.style.scale = "1.08";
    badge.style.zIndex = "9";
  });
  badge.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    ox = e.clientX - startX;
    oy = e.clientY - startY;
    badge.style.transform = `translate(${ox}px, ${oy}px)`;
  });
  const end = () => {
    dragging = false;
    badge.style.scale = "";
    badge.style.zIndex = "";
  };
  badge.addEventListener("pointerup", end);
  badge.addEventListener("pointercancel", end);
});

/* ------------------------------------------------------------
   work index: hover preview + case drawer
   ---------------------------------------------------------- */
const rows = $$(".row");
const preview = $("#preview");
const list = $("#workList");
let activeRow = null;
let pvX = 0;
let pvY = 0;
let pvTargetX = 0;
let pvTargetY = 0;
let pvVisible = false;
let pvLastX = 0;
let pvRotation = 0;

function fillPreview(project) {
  $("#pvIndex").textContent = `${project.index} / 04`;
  $("#pvYear").textContent = project.year;
  $("#pvMark").textContent = project.title.slice(0, 2).toLowerCase();
  $("#pvTitle").textContent = project.title;
  $("#pvStatus").textContent = project.status;
  $("#previewCard").className = `preview__card preview__card--${project.accent}`;
}

function showPreview(project) {
  if (!finePointer.matches || REDUCE) return;
  fillPreview(project);
  preview.classList.add("is-on");
  pvVisible = true;
}

function hidePreview() {
  preview.classList.remove("is-on");
  pvVisible = false;
}

list?.addEventListener("pointermove", (e) => {
  if (!pvVisible) return;
  const cardW = 268;
  const cardH = 335;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let x = e.clientX + 44;
  if (x + cardW > vw - 16) x = Math.max(16, e.clientX - cardW - 36);
  let y = Math.min(Math.max(e.clientY - 200, 92), vh - cardH - 16);
  const dx = e.clientX - pvLastX;
  pvLastX = e.clientX;
  pvRotation = Math.max(-9, Math.min(9, pvRotation * 0.8 + dx * 0.35));
  pvTargetX = x;
  pvTargetY = y;
});

list?.addEventListener("pointerleave", () => {
  hidePreview();
  activeRow = null;
  rows.forEach((r) => r.classList.remove("is-active"));
});

rows.forEach((row) => {
  row.addEventListener("pointerenter", () => {
    activeRow = row;
    rows.forEach((r) => r.classList.toggle("is-active", r === row));
    showPreview(PROJECTS[row.dataset.project]);
  });
  row.addEventListener("focus", () => {
    rows.forEach((r) => r.classList.toggle("is-active", r === row));
  });
  row.addEventListener("click", () => openDrawer(row.dataset.project));
});

(function previewLoop() {
  if (pvVisible) {
    pvX += (pvTargetX - pvX) * 0.18;
    pvY += (pvTargetY - pvY) * 0.18;
    pvRotation *= 0.9;
    preview.style.transform = `translate(${pvX}px, ${pvY}px) rotate(${pvRotation}deg)`;
  }
  requestAnimationFrame(previewLoop);
})();

/* drawer */
const drawer = $("#drawer");
const drawerBody = $(".drawer__body", drawer);

function openDrawer(id) {
  const p = PROJECTS[id];
  if (!p) return;
  $("#drawerKicker").textContent = `case ${p.index} / 04 — ${p.status}`;
  $("#drawerTitle").textContent = p.title;
  $("#drawerRole").textContent = p.role;
  $("#drawerBand").innerHTML = `
    <span>${p.year}</span><span>nairobi, ke</span><span>${p.tags.join(" · ")}</span>`;
  $("#drawerDetail").textContent = p.detail;
  $("#drawerStack").innerHTML = p.stack.map((s) => `<li>${s}</li>`).join("");

  drawer.hidden = false;
  requestAnimationFrame(() => {
    drawer.classList.add("is-open");
    drawerBody.scrollTop = 0;
    document.body.classList.add("is-locked");
    $(".drawer__close", drawer)?.focus();
  });
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  setTimeout(() => (drawer.hidden = true), 400);
}

$$("[data-close]", drawer).forEach((el) => el.addEventListener("click", closeDrawer));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!drawer.hidden) closeDrawer();
    if (!sheet.hidden) setMenu(false);
  }
});

/* ------------------------------------------------------------
   capabilities accordion
   ---------------------------------------------------------- */
$$("[data-cap]").forEach((cap) => {
  const trigger = $(".cap__trigger", cap);
  const icon = $(".cap__icon", cap);
  trigger.addEventListener("click", () => {
    const open = cap.classList.contains("is-open");
    $$("[data-cap]").forEach((other) => {
      other.classList.remove("is-open");
      $(".cap__trigger", other).setAttribute("aria-expanded", "false");
      $(".cap__icon", other).textContent = "+";
      $(".cap__trigger", other).dataset.cursor = "OPEN";
    });
    if (!open) {
      cap.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      trigger.dataset.cursor = "CLOSE";
      icon.textContent = "−";
    }
  });
});

/* ------------------------------------------------------------
   copy email + toast
   ---------------------------------------------------------- */
const EMAIL = "albertsimel360@gmail.com";
const COPY_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const CHECK_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>';
const copyBtn = $("#copyBtn");
const toast = $("#toast");
let toastTimer;

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = EMAIL;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* clipboard unavailable */
    }
    ta.remove();
  }

  const icon = $("#copyIcon");
  icon.innerHTML = CHECK_SVG;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-on"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-on");
    icon.innerHTML = COPY_SVG;
    setTimeout(() => (toast.hidden = true), 400);
  }, 2400);
});

/* ------------------------------------------------------------
   smooth anchor scroll
   ---------------------------------------------------------- */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (!sheet.hidden) setMenu(false);
    target.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
  });
});
