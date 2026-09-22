/**
 * Inspect.mx shared logic — runs on every page (index.html, products.html).
 * Handles: navbar, search panel, mobile drawer, product modal, info modal,
 * social links, footer categories, and cross-page search handoff.
 *
 * Requires products.js (CATEGORIES, PRODUCTS, VIDEOS, BUILDS, SOCIAL_LINKS)
 * to be loaded first. Page-specific scripts (home.js / products-page.js)
 * load after this file and can call window.InspectMX.* helpers.
 */
(function () {
  "use strict";

  window.InspectMX = window.InspectMX || {};

  const money = (n) => "₱" + Number(n).toLocaleString("en-PH");
  const productById = (id) => PRODUCTS.find((p) => p.id === id);
  const categoryById = (id) => CATEGORIES.find((c) => c.id === id);
  function starString(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  window.InspectMX.money = money;
  window.InspectMX.productById = productById;
  window.InspectMX.categoryById = categoryById;
  window.InspectMX.starString = starString;

  /* ---------------------------------------------------------
     Navbar: sticky shadow
  --------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 12);
    },
    { passive: true }
  );

  /* ---------------------------------------------------------
     Search: navbar panel, mobile drawer field, bottom-tab button.
     If the current page defines window.InspectMXApplySearch (products.html
     does), search filters in place. Otherwise it hands off to products.html.
  --------------------------------------------------------- */
  function submitSearch(query) {
    const q = query.trim();
    if (typeof window.InspectMXApplySearch === "function") {
      window.InspectMXApplySearch(q);
    } else {
      window.location.href = "products.html?q=" + encodeURIComponent(q);
    }
  }

  const searchToggle = document.getElementById("searchToggle");
  const searchPanel = document.getElementById("searchPanel");
  const navSearchInput = document.getElementById("navSearchInput");
  searchToggle.addEventListener("click", () => {
    const open = searchPanel.classList.toggle("open");
    searchToggle.setAttribute("aria-expanded", String(open));
    if (open) setTimeout(() => navSearchInput.focus(), 150);
  });
  navSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitSearch(navSearchInput.value);
      searchPanel.classList.remove("open");
    }
  });

  const hamburger = document.getElementById("hamburger");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  function closeDrawer() {
    hamburger.setAttribute("aria-expanded", "false");
    mobileDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("open");
  }
  hamburger.addEventListener("click", () => {
    const open = !mobileDrawer.classList.contains("open");
    hamburger.setAttribute("aria-expanded", String(open));
    mobileDrawer.classList.toggle("open", open);
    drawerBackdrop.classList.toggle("open", open);
  });
  drawerBackdrop.addEventListener("click", closeDrawer);
  mobileDrawer.querySelectorAll(".mobile-link").forEach((a) => a.addEventListener("click", closeDrawer));

  const drawerClose = document.getElementById("drawerClose");
  drawerClose.addEventListener("click", closeDrawer);

  const drawerSearchInput = document.getElementById("drawerSearchInput");
  drawerSearchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    submitSearch(drawerSearchInput.value);
    closeDrawer();
  });

  const tabSearchBtn = document.getElementById("tabSearchBtn");
  if (tabSearchBtn) {
    tabSearchBtn.addEventListener("click", () => {
      searchPanel.classList.add("open");
      searchToggle.setAttribute("aria-expanded", "true");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navSearchInput.focus(), 300);
    });
  }

  /* ---------------------------------------------------------
     Footer categories (same on every page, links to products.html)
  --------------------------------------------------------- */
  const footerCategoriesEl = document.getElementById("footerCategories");
  if (footerCategoriesEl) {
    footerCategoriesEl.innerHTML =
      "<h4>Categories</h4>" +
      CATEGORIES.slice(0, 6).map((c) => `<a href="products.html?category=${c.id}">${c.name}</a>`).join("");
  }

  /* ---------------------------------------------------------
     Social links
  --------------------------------------------------------- */
  const socialIcons = { tiktok: "🎵", facebook: "📘", youtube: "▶️", instagram: "📸" };
  function socialHTML() {
    return Object.entries(SOCIAL_LINKS)
      .map(
        ([key, url]) =>
          `<a class="social-btn" href="${url}" target="_blank" rel="noopener noreferrer">
            <span>${socialIcons[key] || "🔗"}</span> ${key.charAt(0).toUpperCase() + key.slice(1)}
          </a>`
      )
      .join("");
  }
  const socialRowEl = document.getElementById("socialRow");
  if (socialRowEl) socialRowEl.innerHTML = socialHTML();
  const footerSocialRowEl = document.getElementById("footerSocialRow");
  if (footerSocialRowEl) footerSocialRowEl.innerHTML = socialHTML();

  /* ---------------------------------------------------------
     Buy button behavior
  --------------------------------------------------------- */
  function openAffiliateLink(productId) {
    const p = productById(productId);
    if (!p) return;
    window.open(p.affiliateUrl, "_blank", "noopener,noreferrer");
  }
  window.InspectMX.openAffiliateLink = openAffiliateLink;

  /* ---------------------------------------------------------
     Product detail modal (slides in from the right)
  --------------------------------------------------------- */
  const productModal = document.getElementById("productModal");
  const modalScroll = document.getElementById("modalScroll");
  const modalClose = document.getElementById("modalClose");

  function videoFrameHTML(video) {
    return `
      <div class="pm-video-frame" data-video-embed="${video.embedUrl}" data-video-title="${video.title}">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <span class="play-badge"><span class="play-circle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7Z"/></svg>
        </span></span>
      </div>`;
  }

  function productModalHTML(p) {
    const cat = categoryById(p.category);
    const badge = p.personallyUsed
      ? `<span class="badge badge-used">🏍️ Personally Used</span>`
      : `<span class="badge badge-recommended">✓ Recommended</span>`;

    const gallery = p.gallery && p.gallery.length ? p.gallery : [p.image];
    const thumbs = gallery
      .map(
        (img, i) =>
          `<div class="pm-thumb ${i === 0 ? "active" : ""}" data-thumb="${img}"><img src="${img}" alt="${p.name} photo ${i + 1}" loading="lazy"></div>`
      )
      .join("");

    const reasons = p.reasons.map((r) => `<li>${r}</li>`).join("");

    const experienceHTML =
      p.personallyUsed && p.experience
        ? `<div class="pm-section">
          <h4>My Experience</h4>
          <p class="pm-experience-quote">"${p.experience}"</p>
          ${p.video ? videoFrameHTML(p.video) : ""}
        </div>`
        : p.video
        ? `<div class="pm-section"><h4>See It In Action</h4>${videoFrameHTML(p.video)}</div>`
        : "";

    const specsRows = Object.entries(p.specs)
      .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
      .join("");

    const photoGrid = gallery.map((img) => `<img src="${img}" alt="${p.name} product photo" loading="lazy">`).join("");

    return `
      <div class="pm-gallery">
        <div class="pm-main-img"><img id="pmMainImg" src="${gallery[0]}" alt="${p.name}" loading="lazy"></div>
        ${gallery.length > 1 ? `<div class="pm-thumbs">${thumbs}</div>` : ""}
      </div>
      <div class="pm-body">
        <div class="pm-badges">${badge}<span class="badge badge-affiliate">Affiliate Product</span></div>
        <h2 class="pm-title" id="modalProductName">${p.name}</h2>
        <div class="pm-category">${cat ? cat.name : p.category}</div>
        <div class="pm-price">${money(p.price)}</div>
        <div class="product-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviewCount} reviews)</div>
        <p class="pm-desc">${p.description}</p>
        <div class="pm-buy-row">
          <button class="btn btn-primary btn-block" data-buy="${p.id}">Buy on Shopee</button>
        </div>
        <p class="pm-disclosure-inline">This is an affiliate link — purchases are completed on Shopee. Inspect.mx may earn a commission at no extra cost to you.</p>
      </div>

      <div class="pm-section">
        <h4>Why I Recommend It</h4>
        <ul class="pm-reasons">${reasons}</ul>
      </div>

      ${experienceHTML}

      <div class="pm-section">
        <h4>Specifications</h4>
        <table class="pm-specs">${specsRows}</table>
      </div>

      <div class="pm-section">
        <h4>Product Photos</h4>
        <div class="pm-photo-grid">${photoGrid}</div>
      </div>
    `;
  }

  function openProductModal(productId) {
    const p = productById(productId);
    if (!p) return;
    modalScroll.innerHTML = productModalHTML(p);
    modalScroll.scrollTop = 0;
    productModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeProductModal() {
    productModal.classList.remove("open");
    document.body.style.overflow = "";
  }
  window.InspectMX.openProductModal = openProductModal;

  modalClose.addEventListener("click", closeProductModal);
  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) closeProductModal();
  });

  modalScroll.addEventListener("click", (e) => {
    const buyBtn = e.target.closest("[data-buy]");
    if (buyBtn) {
      openAffiliateLink(buyBtn.dataset.buy);
      return;
    }
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) {
      document.getElementById("pmMainImg").src = thumb.dataset.thumb;
      modalScroll.querySelectorAll(".pm-thumb").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      return;
    }
    const photo = e.target.closest(".pm-photo-grid img");
    if (photo) {
      document.getElementById("pmMainImg").src = photo.src;
      modalScroll.querySelector(".pm-gallery").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const videoFrame = e.target.closest("[data-video-embed]");
    if (videoFrame) {
      const embedUrl = videoFrame.dataset.videoEmbed;
      const title = videoFrame.dataset.videoTitle;
      videoFrame.innerHTML = `<iframe src="${embedUrl}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    }
  });

  /* ---------------------------------------------------------
     Info modal (privacy / terms / affiliate disclosure)
  --------------------------------------------------------- */
  const infoModal = document.getElementById("infoModal");
  const infoModalClose = document.getElementById("infoModalClose");
  const infoModalTitle = document.getElementById("infoModalTitle");
  const infoModalBody = document.getElementById("infoModalBody");

  const INFO_CONTENT = {
    privacy: {
      title: "Privacy Policy",
      body: `<p>Inspect.mx does not process payments or store payment information — all purchases are completed on the external marketplace (Shopee).</p>
             <p>Any information submitted through the contact form (name, email, message) is used solely to respond to your inquiry and is not sold or shared with third parties.</p>
             <p>This site may use standard analytics and affiliate tracking cookies/parameters (such as those used by Shopee's affiliate program) to attribute purchases made through Inspect.mx links.</p>`,
    },
    terms: {
      title: "Terms & Conditions",
      body: `<p>Inspect.mx is an independent affiliate recommendation website. We do not manufacture, own, stock, or ship any products listed on this site.</p>
             <p>All purchases are completed on the external marketplace (Shopee) through the affiliate links provided. Pricing, availability, and order fulfillment are controlled entirely by the external seller/marketplace, not Inspect.mx.</p>
             <p>Product opinions shared here reflect personal experience or independent research and are provided for informational purposes only.</p>`,
    },
    disclosure: {
      title: "Affiliate Disclosure",
      body: `<p>Some links on Inspect.mx are affiliate links. If you purchase through these links, I may earn a commission at no additional cost to you.</p>
             <p>Products are labeled "Personally Used" when I've tested them myself, or "Recommended" when they are researched picks I have not personally tested.</p>`,
    },
  };

  function openInfoModal(key) {
    const content = INFO_CONTENT[key];
    if (!content) return;
    infoModalTitle.textContent = content.title;
    infoModalBody.innerHTML = content.body;
    infoModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeInfoModal() {
    infoModal.classList.remove("open");
    document.body.style.overflow = "";
  }
  infoModalClose.addEventListener("click", closeInfoModal);
  infoModal.addEventListener("click", (e) => {
    if (e.target === infoModal) closeInfoModal();
  });

  document.querySelectorAll("[data-modal]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openInfoModal(link.dataset.modal);
    });
  });
  const footerDisclosureLink = document.getElementById("footerDisclosureLink");
  if (footerDisclosureLink) {
    footerDisclosureLink.addEventListener("click", (e) => {
      e.preventDefault();
      openInfoModal("disclosure");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeInfoModal();
      closeDrawer();
    }
  });

  /* ---------------------------------------------------------
     Scroll-reveal animation (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in-view"));
    }
  }

  /* ---------------------------------------------------------
     Active-section highlighting (navbar / drawer / tab bar)
     Products now lives on its own page, so it's marked active
     statically there; other sections are anchor-tracked on the
     page that contains them (index.html).
  --------------------------------------------------------- */
  const navActiveTargets = document.querySelectorAll("[data-section]");
  function setActiveSection(id) {
    navActiveTargets.forEach((el) => el.classList.toggle("active", el.dataset.section === id));
  }

  if (document.body.dataset.page === "products") {
    setActiveSection("products");
  } else {
    const trackedSectionIds = ["home", "categories", "builds", "about", "contact"];
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      trackedSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }
  }
})();
