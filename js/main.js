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
    (c, i) => `
    <a class="category-card reveal" style="animation-delay:${(i % 8) * 0.06}s" href="products.html?category=${c.id}" aria-label="Shop ${c.name}">
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
    (v, i) => `
    <article class="video-card reveal" style="animation-delay:${(i % 8) * 0.08}s">
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
    <article class="build-block">
      <div class="container builds-header reveal">
        <div class="builds-header-text">
          <span class="build-bike">${b.bike}</span>
          <h2 class="builds-title">${b.name} <span class="accent">${b.tagline}</span></h2>
          <p class="builds-desc">${b.description || b.summary}</p>
        </div>
        <button class="btn btn-primary builds-cta" data-view-build="${b.id}">
          Shop This Build
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </button>
      </div>
      <div class="builds-media-full reveal">
        <img src="${b.image}" alt="${b.name} ${b.tagline}" loading="lazy">
      </div>
      <div class="container">
        <div class="build-parts-full">${parts}</div>
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
     Subtle parallax on hero background (Ken Burns zoom runs
     independently via CSS on the inner .hero-bg element)
  --------------------------------------------------------- */
  const heroBgWrap = document.getElementById("heroBgWrap");
  if (heroBgWrap && window.matchMedia("(min-width: 700px)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY, 600);
        heroBgWrap.style.transform = `translateY(${y * 0.15}px)`;
      },
      { passive: true }
    );
  }

  /* Pick up the category/video/build cards just injected above */
  window.InspectMX.initReveals();
})();
