/**
 * Inspect.mx Products page logic (products.html).
 * Shared nav/search/modal behavior lives in common.js — load that first.
 * Supports ?category=<id> and ?q=<query> URL params so links from the
 * homepage (category cards, footer, nav search) land pre-filtered.
 */
(function () {
  "use strict";

  const money = window.InspectMX.money;
  const categoryById = window.InspectMX.categoryById;
  const starString = window.InspectMX.starString;
  const openProductModal = window.InspectMX.openProductModal;
  const openAffiliateLink = window.InspectMX.openAffiliateLink;

  const filterChips = document.getElementById("filterChips");
  const productGrid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsMeta = document.getElementById("resultsMeta");
  const productSearchInput = document.getElementById("productSearchInput");

  /* Filter chips (built from categories + "All") */
  filterChips.innerHTML +=
    CATEGORIES.map((c) => `<button class="chip" data-filter="${c.id}" role="tab" aria-selected="false">${c.name}</button>`).join("");

  let activeFilter = "all";
  filterChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    setFilter(chip.dataset.filter);
  });

  function setFilter(filterId) {
    activeFilter = filterId;
    filterChips.querySelectorAll(".chip").forEach((c) => {
      const isActive = c.dataset.filter === filterId;
      c.classList.toggle("active", isActive);
      c.setAttribute("aria-selected", String(isActive));
    });
    applyFilters();
  }

  function productCardHTML(p) {
    const cat = categoryById(p.category);
    const badge = p.personallyUsed
      ? `<span class="badge badge-used">🏍️ Personally Used</span>`
      : `<span class="badge badge-recommended">✓ Recommended</span>`;
    return `
    <article class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name} details">
      <div class="product-media">
        <div class="badge-row">${badge}</div>
        <span class="badge badge-affiliate">Affiliate</span>
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="600">
      </div>
      <div class="product-body">
        <span class="product-category">${cat ? cat.name : p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviewCount})</div>
        <div class="product-price">${money(p.price)}</div>
      </div>
      <button class="product-buy-btn" data-buy="${p.id}">Buy on Shopee</button>
    </article>`;
  }

  function renderProducts(list) {
    productGrid.innerHTML = list.map(productCardHTML).join("");
    emptyState.classList.toggle("hidden", list.length > 0);
    resultsMeta.textContent = list.length ? `Showing ${list.length} product${list.length === 1 ? "" : "s"}` : "";
  }

  function applyFilters() {
    const q = productSearchInput.value.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchesCategory = activeFilter === "all" || p.category === activeFilter;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
    renderProducts(filtered);
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  productSearchInput.addEventListener("input", debounce(applyFilters, 120));

  productGrid.addEventListener("click", (e) => {
    const buyBtn = e.target.closest("[data-buy]");
    if (buyBtn) {
      e.stopPropagation();
      openAffiliateLink(buyBtn.dataset.buy);
      return;
    }
    const card = e.target.closest(".product-card");
    if (card) openProductModal(card.dataset.id);
  });
  productGrid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".product-card");
    if (card) {
      e.preventDefault();
      openProductModal(card.dataset.id);
    }
  });

  /* Let common.js's navbar/drawer search fields filter in place instead of redirecting */
  window.InspectMXApplySearch = function (q) {
    productSearchInput.value = q;
    applyFilters();
    document.getElementById("productToolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    productSearchInput.focus();
  };

  /* ---------------------------------------------------------
     Init: read ?category= and ?q= from the URL
  --------------------------------------------------------- */
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category");
  const initialQuery = params.get("q");

  if (initialCategory && CATEGORIES.some((c) => c.id === initialCategory)) {
    activeFilter = initialCategory;
  }
  filterChips.querySelectorAll(".chip").forEach((c) => {
    const isActive = c.dataset.filter === activeFilter;
    c.classList.toggle("active", isActive);
    c.setAttribute("aria-selected", String(isActive));
  });
  if (initialQuery) productSearchInput.value = initialQuery;

  applyFilters();
})();
