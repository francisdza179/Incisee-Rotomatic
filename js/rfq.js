"use strict";
!(function () {
  const e = document.getElementById("rfq-form"),
    t = document.getElementById("form-success"),
    n = document.getElementById("rfq-submit-btn"),
    i = document.getElementById("submit-text"),
    d = document.getElementById("submit-icon"),
    o = document.getElementById("drawing-upload"),
    a = document.getElementById("upload-zone"),
    l = document.getElementById("upload-preview"),
    s = document.getElementById("upload-filename"),
    r = document.getElementById("upload-size");
  if (!e) return;
  function c() {
    const e = o.files;
    if (!e || 0 === e.length) return;
    const t = Array.from(e).reduce((e, t) => e + t.size, 0);
    t > 10485760 * e.length
      ? alert("File size exceeds 10MB limit")
      : (1 === e.length
          ? ((s.textContent = e[0].name), (r.textContent = m(e[0].size)))
          : ((s.textContent = `${e.length} files selected`),
            (r.textContent = m(t) + " total")),
        l.classList.add("visible"));
  }
  function m(e) {
    return e < 1024
      ? e + " B"
      : e < 1048576
        ? (e / 1024).toFixed(1) + " KB"
        : (e / 1048576).toFixed(1) + " MB";
  }
  o &&
    a &&
    (o.addEventListener("change", c),
    a.addEventListener("dragover", (e) => {
      (e.preventDefault(), a.classList.add("dragover"));
    }),
    a.addEventListener("dragleave", () => {
      a.classList.remove("dragover");
    }),
    a.addEventListener("drop", (e) => {
      (e.preventDefault(),
        a.classList.remove("dragover"),
        e.dataTransfer.files.length > 0 &&
          ((o.files = e.dataTransfer.files), c()));
    }));
  const u = [
    {
      id: "full-name",
      fieldId: "field-name",
      validate: (e) => e.trim().length >= 2,
    },
    {
      id: "company-name",
      fieldId: "field-company",
      validate: (e) => e.trim().length >= 2,
    },
    {
      id: "email",
      fieldId: "field-email",
      validate: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
    },
    {
      id: "phone",
      fieldId: "field-phone",
      validate: (e) => e.trim().length >= 7,
    },
    { id: "industry", fieldId: "field-industry", validate: (e) => "" !== e },
    {
      id: "description",
      fieldId: "field-desc",
      validate: (e) => e.trim().length >= 20,
    },
  ];
  (u.forEach(({ id: e, fieldId: t, validate: n }) => {
    const i = document.getElementById(e),
      d = document.getElementById(t);
    i &&
      d &&
      (i.addEventListener("blur", () => {
        n(i.value) || "" === i.value
          ? d.classList.remove("has-error")
          : d.classList.add("has-error");
      }),
      i.addEventListener("input", () => {
        n(i.value) && d.classList.remove("has-error");
      }));
  }),
    e.addEventListener("submit", async (o) => {
      if (
        (o.preventDefault(),
        !(function () {
          let e = !0;
          return (
            u.forEach(({ id: t, fieldId: n, validate: i }) => {
              const d = document.getElementById(t),
                o = document.getElementById(n);
              d &&
                o &&
                (i(d.value)
                  ? o.classList.remove("has-error")
                  : (o.classList.add("has-error"), (e = !1)));
            }),
            e
          );
        })())
      ) {
        const t = e.querySelector(".has-error");
        return void (
          t && t.scrollIntoView({ behavior: "smooth", block: "center" })
        );
      }
      ((n.disabled = !0),
        (i.textContent = "Sending..."),
        (d.textContent = "⏳"));
      try {
        const n = new FormData(e),
          i = n.get("full_name"),
          d = n.get("company_name"),
          o = n.get("email"),
          a = n.get("phone"),
          l = n.get("industry"),
          s = n.get("product") || "Not specified",
          r = n.get("description"),
          c = n.get("quantity") || "Not specified",
          m = n.get("timeline") || "Not specified",
          u = `RFQ from ${d} — ${s}`,
          f = [
            "New RFQ from Incisee Rotomatic Website",
            "==========================================",
            `Name: ${i}`,
            `Company: ${d}`,
            `Email: ${o}`,
            `Phone: ${a}`,
            `Industry: ${l}`,
            `Product: ${s}`,
            `Quantity: ${c}`,
            `Timeline: ${m}`,
            "",
            "Project Description:",
            `${r}`,
            "",
            "Note: Drawing/specification files may have been attached. Please check the upload zone.",
          ].join("\n"),
          g = `mailto:info@inciserotomatic.com?subject=${encodeURIComponent(u)}&body=${encodeURIComponent(f)}`;
        ((window.location.href = g),
          setTimeout(() => {
            ((e.style.display = "none"), t.classList.add("visible"));
          }, 800));
      } catch (e) {
        ((n.disabled = !1),
          (i.textContent = "Submit RFQ"),
          (d.textContent = "→"),
          alert(
            "Something went wrong. Please try emailing us directly at info@inciserotomatic.com",
          ));
      }
    }));
  const searchStr =
    window.location.search ||
    (window.location.hash.includes("?")
      ? window.location.hash.substring(window.location.hash.indexOf("?"))
      : "");
  const f = new URLSearchParams(searchStr),
    g = f.get("product"),
    v = f.get("doc");
  if (g) {
    const e = document.getElementById("product");
    e && (e.value = g);
  }
  if (v) {
    const e = document.getElementById("description");
    e && (e.value = `I'd like to request the following document: ${v}`);
  }
})();
