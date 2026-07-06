(function () {
  "use strict";

  var pages = [
    { title: "Home", url: "index.html", desc: "Precision die-cutting and web converting solutions — IATF 16949 certified manufacturer in Chennai, India.", cat: "Home", keywords: "die cutting, rotary die cutting, web converting, precision cutting, chennai" },
    { title: "About Us", url: "about.html", desc: "Learn about Incisee Rotomatic, our mission, values, and commitment to quality in precision die-cutting.", cat: "Company", keywords: "about, company, history, mission, values, IATF 16949, incise group" },
    { title: "Manufacturing Facility", url: "manufacturing.html", desc: "State-of-the-art manufacturing facility with advanced die-cutting and web converting capabilities.", cat: "Company", keywords: "manufacturing, facility, plant, machinery, production, quality control" },
    { title: "Resources", url: "resources.html", desc: "Technical resources, datasheets, white papers, and industry insights for precision die-cut solutions.", cat: "Company", keywords: "resources, datasheets, white papers, technical, downloads, insights" },
    { title: "Careers", url: "careers.html", desc: "Join Incisee Rotomatic — career opportunities in manufacturing, engineering, and support.", cat: "Company", keywords: "careers, jobs, employment, join us, opportunities" },
    { title: "Contact Us", url: "contact.html", desc: "Get in touch with Incisee Rotomatic for inquiries, quotes, and support.", cat: "Company", keywords: "contact, phone, email, address, location, chennai" },
    { title: "Request a Quote", url: "contact.html#rfq", desc: "Submit an RFQ for custom die-cut parts, gaskets, membranes, and adhesive components.", cat: "Company", keywords: "RFQ, quote, request quote, custom parts, pricing" },
    { title: "Privacy Policy", url: "privacy-policy.html", desc: "Incisee Rotomatic privacy policy — how we collect, use, and protect your information.", cat: "Legal", keywords: "privacy, policy, data, GDPR, information" },
    { title: "Terms of Use", url: "terms-of-use.html", desc: "Terms and conditions for using the Incisee Rotomatic website.", cat: "Legal", keywords: "terms, conditions, legal, website use" },
    { title: "Products Overview", url: "products.html", desc: "Browse our full range of precision die-cut products including gaskets, tapes, membranes, and seals.", cat: "Products", keywords: "all products, die cut products, overview, catalog" },
    { title: "ePTFE Membranes", url: "products/epfte-membranes.html", desc: "Expanded PTFE membranes for venting, filtration, and pressure equalization in automotive and industrial applications.", cat: "Products", keywords: "eptfe, PTFE, membrane, venting, filtration, waterproof, breathable" },
    { title: "EP Valves", url: "products/ep-valves.html", desc: "Pressure relief valves and EP valves for battery packs, enclosures, and electronic housings.", cat: "Products", keywords: "EP valve, pressure relief valve, battery vent, enclosure vent" },
    { title: "Thermal Interface Pads", url: "products/thermal-interface-pads.html", desc: "Thermal interface materials for heat dissipation in electronics, EV batteries, and power modules.", cat: "Products", keywords: "thermal pad, TIM, thermal interface, heat sink, heat dissipation, gap filler" },
    { title: "Protective Films", url: "products/protective-film.html", desc: "Protective films for surface protection during manufacturing, assembly, and transit.", cat: "Products", keywords: "protective film, surface protection, masking, temporary protection" },
    { title: "Foam Die-Cuts", url: "products/foam-die-cuts.html", desc: "Custom foam die-cuts for gasketing, sealing, cushioning, and vibration damping.", cat: "Products", keywords: "foam, gasket, cushioning, vibration damping, sealing, PU foam, PE foam" },
    { title: "Medical Assembly", url: "products/medical-assembly.html", desc: "Precision medical device components and assemblies for healthcare applications.", cat: "Products", keywords: "medical, healthcare, device, assembly, sterile, ISO 13485" },
    { title: "Adhesive Tapes", url: "products/adhesive-tape.html", desc: "High-performance adhesive tapes for bonding, mounting, and sealing applications.", cat: "Products", keywords: "adhesive tape, bonding tape, mounting tape, double sided tape" },
    { title: "VHB Tape", url: "products/vhb-tape.html", desc: "Very High Bond (VHB) acrylic foam tape for structural bonding and panel attachment.", cat: "Products", keywords: "VHB, very high bond, acrylic foam, structural bonding, 3M" },
    { title: "Silicone Pads", url: "products/silicone-pads.html", desc: "Silicone pads and gaskets for thermal management, sealing, and electrical insulation.", cat: "Products", keywords: "silicone, pad, gasket, thermal, insulation, rubber" },
    { title: "Silicone Foam Gaskets", url: "products/silicone-foam-gaskets.html", desc: "Silicone foam gaskets for environmental sealing and compression applications.", cat: "Products", keywords: "silicone foam, gasket, seal, compression, environmental seal" },
    { title: "XLPE Foam Gaskets", url: "products/xlpe-foam-gaskets.html", desc: "Cross-linked polyethylene foam gaskets for sealing and cushioning solutions.", cat: "Products", keywords: "XLPE, cross-linked polyethylene, foam gasket, seal, cushion" },
    { title: "Sealing Tapes", url: "products/sealing-tapes.html", desc: "Specialized sealing tapes for moisture, dust, and air sealing in various industries.", cat: "Products", keywords: "sealing tape, moisture barrier, dust seal, air seal, gasket tape" },
    { title: "Double Sided Tape", url: "products/double-sided-tape.html", desc: "Double-sided adhesive tapes for mounting, assembly, and bonding applications.", cat: "Products", keywords: "double sided tape, double coated, mounting, bonding, splicing" },
    { title: "Polyamide Tapes", url: "products/polyamide-tapes.html", desc: "Polyamide (Kapton) tapes for high-temperature masking and electrical insulation.", cat: "Products", keywords: "polyamide, kapton, high temperature, masking, insulation, solder" },
    { title: "Polyester Tape Die-Cuts", url: "products/polyester-tape-die-cuts.html", desc: "Precision die-cut polyester tapes for electrical insulation and masking applications.", cat: "Products", keywords: "polyester, PET, die cut, insulation, masking, flame retardant" },
    { title: "Electronic Die-Cuts", url: "products/electronic-die-cuts.html", desc: "Precision die-cut components for electronics including EMI shielding, insulation, and thermal management.", cat: "Products", keywords: "electronic, EMI, shielding, insulation, die cut, PCB" },
    { title: "Medical Die-Cuts", url: "products/medical-die-cuts.html", desc: "Custom medical die-cut components for diagnostic devices, wearables, and surgical equipment.", cat: "Products", keywords: "medical die cut, diagnostic, wearable, surgical, healthcare component" },
    { title: "Medical Die-Cut — Heart Monitor", url: "products/medical-die-cut-heart-monitor.html", desc: "Precision die-cut components for heart monitoring devices and medical electronics.", cat: "Products", keywords: "heart monitor, cardiac, medical electronics, ECG, die cut" },
    { title: "Adhesive Vent Stickers", url: "products/adhesive-vent-stickers.html", desc: "Pressure-sensitive vent stickers for enclosure pressure equalization and moisture management.", cat: "Products", keywords: "vent sticker, pressure equalization, venting, adhesive vent" },
    { title: "Breathable Caps & Seals", url: "products/breathable-caps-seals.html", desc: "Breathable caps and seals for venting and protection of sensors, motors, and electronics.", cat: "Products", keywords: "breathable, cap, seal, vent, sensor protection, motor vent" },
    { title: "Logos & Labels", url: "products/logos-labels.html", desc: "Custom logos, nameplates, and labels for branding and identification.", cat: "Products", keywords: "logo, label, nameplate, branding, identification, custom print" },
    { title: "PRV Valves", url: "products/prv-valves.html", desc: "Pressure Relief Valves (PRV) for overpressure protection in enclosures and battery systems.", cat: "Products", keywords: "PRV, pressure relief valve, overpressure, battery safety, venting" },
    { title: "Vent Plugs", url: "products/vent-plugs.html", desc: "Snap-in vent plugs for quick pressure equalization and drainage in automotive and industrial housings.", cat: "Products", keywords: "vent plug, snap-in, pressure equalization, drainage, housing vent" },
    { title: "Industries Overview", url: "industries.html", desc: "Industries we serve — automotive, aerospace, EV, healthcare, and telecom precision die-cut solutions.", cat: "Industries", keywords: "industries, served, markets, applications" },
    { title: "Automotive", url: "industries/automotive.html", desc: "Automotive die-cut solutions — gaskets, seals, tapes, and membranes for OEMs and Tier 1 suppliers.", cat: "Industries", keywords: "automotive, OEM, tier 1, gasket, seal, automotive tape, IATF 16949" },
    { title: "Aerospace", url: "industries/aerospace.html", desc: "Aerospace-grade die-cut components for lightweight sealing, insulation, and interior applications.", cat: "Industries", keywords: "aerospace, aviation, aircraft, lightweight, seal, insulation, interior" },
    { title: "Electric Vehicles (EV)", url: "industries/ev.html", desc: "EV battery die-cut solutions — thermal pads, venting membranes, and electrical insulation components.", cat: "Industries", keywords: "EV, electric vehicle, battery, thermal management, venting, insulation" },
    { title: "Healthcare", url: "industries/healthcare.html", desc: "Healthcare die-cut solutions for medical devices, diagnostics, and sterile barrier systems.", cat: "Industries", keywords: "healthcare, medical, diagnostic, sterile, ISO 13485, medical device" },
    { title: "Telecom", url: "industries/telecom.html", desc: "Telecom die-cut solutions — EMI shielding, gasketing, and thermal management for network infrastructure.", cat: "Industries", keywords: "telecom, telecommunications, EMI shielding, RF, network, 5G" }
  ];

  var rootPath = "";
  var searchModal = null;
  var searchInput = null;
  var searchResults = null;

  function getRootPath() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || "";
      var match = src.match(/(.*)js\/search\.js/);
      if (match) {
        rootPath = match[1];
        return;
      }
    }
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    rootPath = depth > 0 ? "../".repeat(depth) : "";
  }

  function injectStyles() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = rootPath + "css/components/search.css";
    document.head.appendChild(link);
  }

  function createModal() {
    if (searchModal) return;
    getRootPath();
    injectStyles();

    searchModal = document.createElement("div");
    searchModal.className = "search-modal";
    searchModal.id = "search-modal";
    searchModal.setAttribute("role", "dialog");
    searchModal.setAttribute("aria-modal", "true");
    searchModal.setAttribute("aria-label", "Search site");

    searchModal.innerHTML =
      '<div class="search-modal__backdrop"></div>' +
      '<div class="search-modal__content">' +
        '<div class="search-modal__header">' +
          '<div class="search-modal__input-wrap">' +
            '<svg class="search-modal__input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
              '<circle cx="11" cy="11" r="8"/>' +
              '<path d="M21 21l-4.35-4.35"/>' +
            '</svg>' +
            '<input class="search-modal__input" id="search-input" type="text" placeholder="Search pages, products, industries&hellip;" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">' +
          '</div>' +
          '<button class="search-modal__close" aria-label="Close search (Escape)">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M18 6L6 18"/>' +
              '<path d="M6 6l12 12"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
        '<div class="search-modal__body">' +
          '<div class="search-modal__results" id="search-results"></div>' +
          '<div class="search-modal__empty">' +
            '<div class="search-modal__empty-icon">' +
              '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="11" cy="11" r="8"/>' +
                '<path d="M21 21l-4.35-4.35"/>' +
              '</svg>' +
            '</div>' +
            '<p class="search-modal__empty-text">Search across all pages, products, and industries</p>' +
            '<div class="search-modal__hints">' +
              '<span class="search-modal__hint">Press <kbd>Ctrl+K</kbd> to open</span>' +
              '<span class="search-modal__hint"><kbd>&uarr;</kbd> <kbd>&darr;</kbd> to navigate</span>' +
              '<span class="search-modal__hint"><kbd>Esc</kbd> to close</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="search-modal__footer">' +
          '<span class="search-modal__footer-text" id="search-footer">' + pages.length + ' pages indexed</span>' +
        '</div>' +
      '</div>';

    document.body.appendChild(searchModal);

    searchInput = document.getElementById("search-input");
    searchResults = document.getElementById("search-results");

    var backdrop = searchModal.querySelector(".search-modal__backdrop");
    var closeBtn = searchModal.querySelector(".search-modal__close");

    function closeSearch() {
      searchModal.classList.remove("open");
      document.body.style.overflow = "";
      searchInput.blur();
    }

    backdrop.addEventListener("click", closeSearch);
    closeBtn.addEventListener("click", closeSearch);

    searchInput.addEventListener("input", onSearchInput);
    searchInput.addEventListener("keydown", onSearchKeydown);

    document.addEventListener("keydown", function (e) {
      if (searchModal && searchModal.classList.contains("open") && e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      }
    });
  }

  var selectedIndex = -1;

  function onSearchInput() {
    var query = searchInput.value.trim().toLowerCase();
    selectedIndex = -1;
    renderResults(query);
  }

  function onSearchKeydown(e) {
    var items = searchResults ? searchResults.querySelectorAll(".search-modal__result") : [];
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelected(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelected(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        items[selectedIndex].click();
      }
    }
  }

  function updateSelected(items) {
    items.forEach(function (el, i) {
      el.classList.toggle("selected", i === selectedIndex);
    });
    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: "nearest" });
    }
  }

  function renderResults(query) {
    var emptyEl = searchModal.querySelector(".search-modal__empty");
    var footer = document.getElementById("search-footer");

    if (!query || query.length < 1) {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
      emptyEl.style.display = "";
      footer.textContent = pages.length + " pages indexed";
      return;
    }

    var terms = query.split(/\s+/);

    var scored = [];
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      var score = 0;
      var titleLower = p.title.toLowerCase();
      var descLower = (p.desc || "").toLowerCase();
      var keywordsLower = (p.keywords || "").toLowerCase();
      var catLower = (p.cat || "").toLowerCase();
      var urlLower = p.url.toLowerCase();

      for (var t = 0; t < terms.length; t++) {
        var term = terms[t];
        if (!term) continue;

        if (titleLower.indexOf(term) === 0) score += 20;
        else if (titleLower.indexOf(term) > 0) score += 15;

        if (keywordsLower.indexOf(term) >= 0) score += 10;

        if (descLower.indexOf(term) >= 0) score += 5;

        if (catLower.indexOf(term) >= 0) score += 3;

        if (urlLower.indexOf(term) >= 0) score += 2;

        if (titleLower === term) score += 30;
      }

      if (score > 0) {
        scored.push({ page: p, score: score });
      }
    }

    scored.sort(function (a, b) { return b.score - a.score; });
    var results = scored.slice(0, 12).map(function (s) { return s.page; });

    emptyEl.style.display = "none";
    searchResults.style.display = "";

    if (!results.length) {
      searchResults.innerHTML =
        '<div class="search-modal__no-results">' +
          '<p>No results found for <strong>"' + escapeHtml(query) + '"</strong></p>' +
          '<p class="search-modal__no-results-hint">Try a different search term or browse the navigation menu</p>' +
        '</div>';
      footer.textContent = "0 results found";
      return;
    }

    var html = "";
    var currentCat = "";
    for (var r = 0; r < results.length; r++) {
      var page = results[r];
      var cat = page.cat;
      var url = rootPath + page.url;
      var titleHighlighted = highlightMatch(page.title, terms);
      var descHighlighted = highlightMatch(page.desc, terms);

      if (cat !== currentCat) {
        currentCat = cat;
        html += '<div class="search-modal__category">' + cat + '</div>';
      }

      html +=
        '<a href="' + url + '" class="search-modal__result" onclick="window.__closeSearch()">' +
          '<div class="search-modal__result-title">' + titleHighlighted + '</div>' +
          '<div class="search-modal__result-desc">' + descHighlighted + '</div>' +
        '</a>';
    }
    searchResults.innerHTML = html;
    footer.textContent = results.length + " result" + (results.length > 1 ? "s" : "") + " found for \u201c" + escapeHtml(query) + "\u201d";
  }

  function highlightMatch(text, terms) {
    if (!text) return "";
    var escaped = escapeHtml(text);
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i].toLowerCase();
      if (!term) continue;
      var regex = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      escaped = escaped.replace(regex, "<mark>$1</mark>");
    }
    return escaped;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  window.__openSearch = function () {
    createModal();
    searchModal.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      searchInput.focus();
      searchInput.select();
    }, 150);
    renderResults("");
  };

  window.__closeSearch = function () {
    if (!searchModal) return;
    searchModal.classList.remove("open");
    document.body.style.overflow = "";
    searchInput.blur();
  };

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      window.__openSearch();
    }
  });
})();
