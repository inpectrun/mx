/**
 * Inspect.mx homepage-only logic (index.html).
 * Shared nav/search/modal behavior lives in common.js — load that first.
 */
(function () {
  "use strict";

  const openProductModal = window.InspectMX.openProductModal;

  /* ---------------------------------------------------------
     Categories — link straight to the Products page, filtered
  --------------------------------------------------------- */
  const categoryGrid = document.getElementById("categoryGrid");
  categoryGrid.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="category-card" href="products.html?category=${c.id}" aria-label="Shop ${c.name}">
      <span class="cat-icon">${c.icon}</span>
      <h3>${c.name}</h3>
      <p>${c.description}</p>
    </a>`
  ).join("");

  /* ---------------------------------------------------------
     Videos
  --------------------------------------------------------- */
  const videoGrid = document.getElementById("videoGrid");
  videoGrid.innerHTML = VIDEOS.map(
    (v) => `
    <article class="video-card">
      <a class="video-thumb" href="${v.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${v.title} on ${v.platform}">
        <span class="platform-tag">${v.platform}</span>
        <img src="${v.thumbnail}" alt="${v.title}" loading="lazy" width="480" height="600">
        <span class="play-badge">
          <span class="play-circle">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7Z"/></svg>
          </span>
        </span>
      </a>
      <div class="video-body">
        <h3>${v.title}</h3>
        <p>${v.description}</p>
        <a class="btn btn-outline btn-sm btn-block" href="${v.url}" target="_blank" rel="noopener noreferrer">Watch on ${v.platform}</a>
      </div>
    </article>`
  ).join("");

  /* ---------------------------------------------------------
     Builds
  --------------------------------------------------------- */
  const buildList = document.getElementById("buildList");
  buildList.innerHTML = BUILDS.map((b) => {
    const parts = b.parts
      .map((part) => `<button class="build-part-tag" data-part-product="${part.productId}">${part.label}</button>`)
      .join("");
    return `
    <article class="build-card">
      <div class="build-media"><img src="${b.image}" alt="${b.name}" loading="lazy" width="800" height="500"></div>
      <div class="build-info">
        <span class="build-bike">${b.bike}</span>
        <h3>${b.name}</h3>
        <p class="build-summary">${b.summary}</p>
        <div class="build-parts">${parts}</div>
        <button class="btn btn-primary" data-view-build="${b.id}">View Build</button>
      </div>
    </article>`;
  }).join("");

  buildList.addEventListener("click", (e) => {
    const partBtn = e.target.closest("[data-part-product]");
    if (partBtn) {
      openProductModal(partBtn.dataset.partProduct);
      return;
    }
    const viewBtn = e.target.closest("[data-view-build]");
    if (viewBtn) {
      const build = BUILDS.find((b) => b.id === viewBtn.dataset.viewBuild);
      if (build && build.parts.length) openProductModal(build.parts[0].productId);
    }
  });

  /* ---------------------------------------------------------
     Contact form (no backend yet — local confirmation only)
  --------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const contactNote = document.getElementById("contactNote");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: wire this up to a real backend/email endpoint (PHP, Firebase, REST API, etc.)
    contactNote.textContent = "Thanks — your message has been noted. I'll get back to you soon!";
    contactForm.reset();
  });

  /* ---------------------------------------------------------
     Subtle parallax on hero background
  --------------------------------------------------------- */
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && window.matchMedia("(min-width: 700px)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY, 600);
        heroBg.style.transform = `scale(1.05) translateY(${y * 0.15}px)`;
      },
      { passive: true }
    );
  }
})();
