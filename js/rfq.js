/* ============================================================
   INCISE ROTOMATIC — RFQ Form Handler
   ============================================================ */

'use strict';

(function initRFQ() {
  const form = document.getElementById('rfq-form');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('rfq-submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitIcon = document.getElementById('submit-icon');
  const uploadInput = document.getElementById('drawing-upload');
  const uploadZone = document.getElementById('upload-zone');
  const uploadPreview = document.getElementById('upload-preview');
  const uploadFilename = document.getElementById('upload-filename');
  const uploadSize = document.getElementById('upload-size');

  if (!form) return;

  // ── Upload Zone ─────────────────────────────────────────
  if (uploadInput && uploadZone) {
    uploadInput.addEventListener('change', handleFileSelect);

    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        uploadInput.files = e.dataTransfer.files;
        handleFileSelect();
      }
    });
  }

  function handleFileSelect() {
    const files = uploadInput.files;
    if (!files || files.length === 0) return;

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    const totalSize = Array.from(files).reduce((sum, f) => sum + f.size, 0);

    if (totalSize > maxSize * files.length) {
      showFileError('File size exceeds 10MB limit');
      return;
    }

    // Show preview
    if (files.length === 1) {
      uploadFilename.textContent = files[0].name;
      uploadSize.textContent = formatBytes(files[0].size);
    } else {
      uploadFilename.textContent = `${files.length} files selected`;
      uploadSize.textContent = formatBytes(totalSize) + ' total';
    }

    uploadPreview.classList.add('visible');
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function showFileError(msg) {
    alert(msg); // In production, replace with inline error display
  }

  // ── Form Validation ─────────────────────────────────────
  const requiredFields = [
    { id: 'full-name', fieldId: 'field-name', validate: v => v.trim().length >= 2 },
    { id: 'company-name', fieldId: 'field-company', validate: v => v.trim().length >= 2 },
    { id: 'email', fieldId: 'field-email', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'phone', fieldId: 'field-phone', validate: v => v.trim().length >= 7 },
    { id: 'industry', fieldId: 'field-industry', validate: v => v !== '' },
    { id: 'description', fieldId: 'field-desc', validate: v => v.trim().length >= 20 },
  ];

  function validateForm() {
    let valid = true;
    requiredFields.forEach(({ id, fieldId, validate }) => {
      const input = document.getElementById(id);
      const field = document.getElementById(fieldId);
      if (!input || !field) return;
      if (!validate(input.value)) {
        field.classList.add('has-error');
        valid = false;
      } else {
        field.classList.remove('has-error');
      }
    });
    return valid;
  }

  // Live validation on blur
  requiredFields.forEach(({ id, fieldId, validate }) => {
    const input = document.getElementById(id);
    const field = document.getElementById(fieldId);
    if (!input || !field) return;
    input.addEventListener('blur', () => {
      if (!validate(input.value) && input.value !== '') {
        field.classList.add('has-error');
      } else {
        field.classList.remove('has-error');
      }
    });
    input.addEventListener('input', () => {
      if (validate(input.value)) {
        field.classList.remove('has-error');
      }
    });
  });

  // ── Form Submit ─────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitIcon.textContent = '⏳';

    try {
      // Collect form data
      const formData = new FormData(form);

      // Build mailto URL as fallback (since no backend is configured yet)
      const name = formData.get('full_name');
      const company = formData.get('company_name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const industry = formData.get('industry');
      const product = formData.get('product') || 'Not specified';
      const description = formData.get('description');
      const quantity = formData.get('quantity') || 'Not specified';
      const timeline = formData.get('timeline') || 'Not specified';

      const subject = `RFQ from ${company} — ${product}`;
      const body = [
        `New RFQ from Incise Rotomatic Website`,
        `==========================================`,
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Industry: ${industry}`,
        `Product: ${product}`,
        `Quantity: ${quantity}`,
        `Timeline: ${timeline}`,
        ``,
        `Project Description:`,
        `${description}`,
        ``,
        `Note: Drawing/specification files may have been attached. Please check the upload zone.`,
      ].join('\n');

      const mailtoUrl = `mailto:info@inciserotomatic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open mailto (this triggers the user's email client)
      window.location.href = mailtoUrl;

      // Show success state after short delay
      setTimeout(() => {
        form.style.display = 'none';
        successEl.classList.add('visible');
      }, 800);

    } catch (err) {
      submitBtn.disabled = false;
      submitText.textContent = 'Submit RFQ';
      submitIcon.textContent = '→';
      alert('Something went wrong. Please try emailing us directly at info@inciserotomatic.com');
    }
  });

  // ── Pre-fill from URL params ─────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const preProduct = params.get('product');
  const preDoc = params.get('doc');

  if (preProduct) {
    const productSelect = document.getElementById('product');
    if (productSelect) productSelect.value = preProduct;
  }

  if (preDoc) {
    const desc = document.getElementById('description');
    if (desc) desc.value = `I'd like to request the following document: ${preDoc}`;
  }
})();
