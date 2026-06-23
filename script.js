const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   DATOS — edita aquí tu información personal
   ========================================================= */

const SKILLS_PRINCIPALES = [
  { name: "C#",         pct: 80 },
  { name: ".NET",       pct: 75 },
  { name: "JavaScript", pct: 75 },
  { name: "Python",     pct: 70 },
  { name: "SQL Server", pct: 75 },
  { name: "Docker",     pct: 60 },
];

const SKILLS_CATEGORIAS = {
  "Lenguajes":             ["C#", "Python", "JavaScript", "SQL"],
  "Frontend":              ["HTML", "CSS"],
  "Backend / Frameworks":  [".NET"],
  "Bases de datos":        ["SQL Server", "MySQL"],
  "Herramientas y DevOps": ["DBeaver", "Docker", "Railway", "GitHub"],
};

const PROYECTOS = [
  {
    name: "RecyRoute",
    desc: "Proyecto desarrollado en equipo en el SENA que conecta recicladores, empresas de reciclaje y ciudadanos, optimizando la gestión del material reciclable para impulsar su reutilización y fomentar la sostenibilidad ambiental.",
    tags: ["C#", ".NET", "SQL Server"],
    repo: "https://github.com/SoySergy/RecyRoute",
    demo: "https://github.com/SoySergy/RecyRoute",
  },
  {
    name: "Cajero Automático",
    desc: "Simulación de las funcionalidades básicas de un cajero automático: consulta de saldo, retiro y depósito.",
    tags: ["C#", ".NET"],
    repo: "https://github.com/juanmb1001-ctrl/CajeroJuan",
    demo: "https://github.com/juanmb1001-ctrl/CajeroJuan",
  },
  {
    name: "Portafolio Personal",
    desc: "Portafolio web interactivo con estética de terminal hacker, construido con HTML, CSS y JavaScript puro.",
    tags: ["JavaScript", "HTML", "CSS"],
    repo: "#",
    demo: "#",
  },
];

const EXPERIENCIA = [
  {
    hash:    "2",
    date:    "Febrero 2025 — Diciembre 2025",
    role:    "Digitador y Analista de Datos",
    company: "Procesos y Servicios S.A.S",
    bullets: [
      "Ingreso, depuración y validación de información en sistemas digitales.",
      "Garantía de precisión, organización y cumplimiento de estándares de calidad.",
    ],
  },
  {
    hash:    "1",
    date:    "Febrero 2024 — Diciembre 2024",
    role:    "Auxiliar de Archivo",
    company: "Procesos y Servicios S.A.S",
    bullets: [
      "Organización, clasificación, almacenamiento y control de documentos físicos y digitales.",
      "Garantía de correcta conservación y fácil acceso a la información.",
    ],
  },
];

/* =========================================================
   1) Pantalla de arranque
   ========================================================= */
function runBootSequence() {
  const screen = document.getElementById("boot-screen");
  const textEl = document.getElementById("boot-text");

  if (prefersReducedMotion) {
    screen.classList.add("hidden");
    return;
  }

  const lines = [
    "> iniciando sistema...",
    "> portafolio listo ✓",
  ];

  let output = "", lineIndex = 0, charIndex = 0;

  function typeNext() {
    if (lineIndex >= lines.length) {
      setTimeout(() => screen.classList.add("hidden"), 350);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      output += line[charIndex++];
      textEl.textContent = output;
      setTimeout(typeNext, 14);
    } else {
      output += "\n";
      textEl.textContent = output;
      lineIndex++; charIndex = 0;
      setTimeout(typeNext, 120);
    }
  }
  typeNext();
}

/* =========================================================
   2) Lluvia de código (canvas de fondo)
   ========================================================= */
function startMatrixRain() {
  const canvas = document.getElementById("matrix-rain");
  const ctx    = canvas.getContext("2d");
  const chars  = "01アイウエオカキクケコ{}<>/;=+-*";
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 16);
    drops = new Array(cols).fill(0);
  }
  resize();
  window.addEventListener("resize", resize);

  if (prefersReducedMotion) return;

  function draw() {
    ctx.fillStyle = "rgba(10, 14, 13, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff66";
    ctx.font = "14px monospace";
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      else drops[i] = y + 16;
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* =========================================================
   3) Navegación
   ========================================================= */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function setupNav() {
  document.querySelectorAll("[data-target]").forEach(el => {
    el.addEventListener("click", () => {
      scrollToSection(el.dataset.target);
      document.querySelector(".cmd-nav").classList.remove("open");
      document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
    });
  });

  const toggle = document.getElementById("menu-toggle");
  const nav    = document.querySelector(".cmd-nav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  const sections = document.querySelectorAll(".section");
  const links    = document.querySelectorAll(".cmd-link");
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        links.forEach(l => l.classList.toggle("active", l.dataset.target === entry.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" }).observe
    ? sections.forEach(s =>
        new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting)
              links.forEach(l => l.classList.toggle("active", l.dataset.target === entry.target.id));
          });
        }, { rootMargin: "-40% 0px -55% 0px" }).observe(s)
      )
    : null;
}

/* =========================================================
   4) Mini terminal de comandos
   ========================================================= */
const COMMAND_MAP = {
  inicio: "inicio",       home: "inicio",
  perfil: "perfil",       about: "perfil",       whoami: "perfil",
  estudios: "estudios",   education: "estudios",
  skills: "conocimientos", conocimientos: "conocimientos",
  proyectos: "proyectos", projects: "proyectos",
  experiencia: "experiencia", experience: "experiencia",
  contacto: "contacto",   contact: "contacto",
};

function showToast(message) {
  let toast = document.getElementById("cmd-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cmd-toast";
    Object.assign(toast.style, {
      position: "fixed", top: "76px", right: "20px",
      background: "#0e1513", border: "1px solid #234034",
      color: "#5be8ff", padding: "10px 16px", borderRadius: "6px",
      fontFamily: "JetBrains Mono, monospace", fontSize: "13px",
      zIndex: "200", opacity: "0", transition: "opacity 0.25s ease",
      maxWidth: "260px",
    });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => (toast.style.opacity = "1"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (toast.style.opacity = "0"), 2400);
}

function setupCommandInput() {
  const form  = document.getElementById("cmd-form");
  const input = document.getElementById("cmd-input");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const raw = input.value.trim().toLowerCase().replace(/^cd\s+/, "").replace(/^\.?\/?/, "");
    input.value = "";
    if (!raw) return;
    if (raw === "help") {
      showToast("comandos: inicio · perfil · estudios · skills · proyectos · experiencia · contacto");
      return;
    }
    const sectionId = COMMAND_MAP[raw];
    if (sectionId) {
      scrollToSection(sectionId);
      showToast(`> cd ${sectionId}`);
    } else {
      showToast(`"${raw}" no encontrado — escribe "help"`);
    }
  });
}

/* =========================================================
   5) Render: Skills
   ========================================================= */
function renderSkillBars() {
  document.getElementById("skill-bars").innerHTML = SKILLS_PRINCIPALES.map(s => `
    <div class="bar-item reveal">
      <div class="bar-top">
        <span>${s.name}</span><span class="bar-pct">${s.pct}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" data-pct="${s.pct}"></div>
      </div>
    </div>`
  ).join("");
}

function renderSkillTags() {
  document.getElementById("skill-tags").innerHTML = Object.entries(SKILLS_CATEGORIAS).map(([cat, items]) => `
    <div class="tag-group reveal">
      <h4>${cat}</h4>
      <div class="tag-list">
        ${items.map(i => `<span class="tag">${i}</span>`).join("")}
      </div>
    </div>`
  ).join("");
}

/* =========================================================
   6) Render: Proyectos
   ========================================================= */
function renderProjects() {
  document.getElementById("projects-grid").innerHTML = PROYECTOS.map(p => `
    <article class="project-card reveal">
      <div class="window-bar">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="window-name">${p.name}</span>
      </div>
      <div class="project-body">
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${p.repo}" target="_blank" rel="noopener">→ código</a>
          ${p.demo !== p.repo ? `<a href="${p.demo}" target="_blank" rel="noopener">→ demo</a>` : ""}
        </div>
      </div>
    </article>`
  ).join("");
}

/* =========================================================
   7) Render: Experiencia
   ========================================================= */
function renderExperience() {
  document.getElementById("git-log").innerHTML = EXPERIENCIA.map(e => `
    <div class="commit reveal">
      <p>
        <span class="commit-hash">#${e.hash}</span>
        <span class="commit-date">${e.date}</span>
      </p>
      <h3 class="commit-title">${e.role}</h3>
      <p class="commit-company">@ ${e.company}</p>
      <ul class="commit-body">
        ${e.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>
    </div>`
  ).join("");
}

/* =========================================================
   8) Animaciones reveal al hacer scroll
   ========================================================= */
function setupRevealOnScroll() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const fill = entry.target.querySelector(".bar-fill");
        if (fill) fill.style.width = fill.dataset.pct + "%";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
}

/* =========================================================
   9) Copiar correo al portapapeles
   ========================================================= */
function setupCopyEmail() {
  const btn = document.getElementById("copy-email");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.value);
      const original = btn.innerHTML;
      btn.innerHTML = `${btn.dataset.value} <small>(¡copiado!)</small>`;
      setTimeout(() => (btn.innerHTML = original), 1800);
    } catch {
      showToast("Copia el correo manualmente: " + btn.dataset.value);
    }
  });
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  runBootSequence();
  startMatrixRain();
  setupNav();
  setupCommandInput();
  renderSkillBars();
  renderSkillTags();
  renderProjects();
  renderExperience();
  setupRevealOnScroll();
  setupCopyEmail();
  document.getElementById("year").textContent = new Date().getFullYear();
});