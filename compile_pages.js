const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const headerTemplate = fs.readFileSync(path.join(templatesDir, 'header.html'), 'utf8');
const footerTemplate = fs.readFileSync(path.join(templatesDir, 'footer.html'), 'utf8');

// Get all HTML files recursively (excluding templates directory)
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'templates' && file !== 'node_modules' && file !== '.git') {
        results = results.concat(getHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(__dirname);

htmlFiles.forEach(filePath => {
  const relativePath = path.relative(__dirname, filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Determine depth (e.g. "industries/ev.html" has 1 slash -> depth is "../")
  // For windows, handle backslash
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const slashCount = (normalizedPath.match(/\//g) || []).length;
  const depth = slashCount > 0 ? '../'.repeat(slashCount) : '';

  // 1. Process Header
  let headerHtml = headerTemplate.replace(/\{\{ROOT\}\}/g, depth);

  // Set active class based on page path
  if (normalizedPath === 'index.html') {
    headerHtml = headerHtml.replace('href="' + depth + 'index.html" class="navbar__link"', 'href="' + depth + 'index.html" class="navbar__link active"');
  } else if (normalizedPath === 'about.html') {
    headerHtml = headerHtml.replace('href="' + depth + 'about.html" class="navbar__link"', 'href="' + depth + 'about.html" class="navbar__link active"');
  } else if (normalizedPath.startsWith('industries/')) {
    headerHtml = headerHtml.replace('href="' + depth + 'industries.html" class="navbar__link navbar__dropdown-toggle"', 'href="' + depth + 'industries.html" class="navbar__link navbar__dropdown-toggle active"');
    // Set active on the matching sub-menu item
    const pageName = normalizedPath.replace('industries/', '');
    headerHtml = headerHtml.replace(
      'href="' + depth + 'industries/' + pageName + '" class="navbar__dropdown-item',
      'href="' + depth + 'industries/' + pageName + '" class="navbar__dropdown-item active'
    );
  } else if (normalizedPath.startsWith('products/')) {
    headerHtml = headerHtml.replace('href="' + depth + 'products.html" class="navbar__link navbar__dropdown-toggle"', 'href="' + depth + 'products.html" class="navbar__link navbar__dropdown-toggle active"');
    // Set active on the matching sub-menu item
    const pageName = normalizedPath.replace('products/', '');
    headerHtml = headerHtml.replace(
      'href="' + depth + 'products/' + pageName + '" class="navbar__dropdown-item',
      'href="' + depth + 'products/' + pageName + '" class="navbar__dropdown-item active'
    );
  } else if (normalizedPath === 'manufacturing.html') {
    headerHtml = headerHtml.replace('href="' + depth + 'manufacturing.html" class="navbar__link"', 'href="' + depth + 'manufacturing.html" class="navbar__link active"');
  } else if (normalizedPath === 'resources.html') {
    headerHtml = headerHtml.replace('href="' + depth + 'resources.html" class="navbar__link"', 'href="' + depth + 'resources.html" class="navbar__link active"');
  } else if (normalizedPath === 'careers.html') {
    headerHtml = headerHtml.replace('href="' + depth + 'careers.html" class="navbar__link"', 'href="' + depth + 'careers.html" class="navbar__link active"');
  } else if (normalizedPath === 'contact.html') {
    headerHtml = headerHtml.replace('href="' + depth + 'contact.html" class="navbar__link"', 'href="' + depth + 'contact.html" class="navbar__link active"');
  }

  // 2. Process Footer
  const footerHtml = footerTemplate.replace(/\{\{ROOT\}\}/g, depth);

  // 3. Find and replace header
  const headerStart = content.indexOf('<header');
  const headerEnd = content.indexOf('</header>') + '</header>'.length;
  if (headerStart !== -1 && headerEnd !== -1) {
    content = content.substring(0, headerStart) + headerHtml + content.substring(headerEnd);
  } else {
    console.warn(`Warning: Header not found in ${relativePath}`);
  }

  // 4. Find and replace footer
  const footerStart = content.indexOf('<footer');
  const footerEnd = content.indexOf('</footer>') + '</footer>'.length;
  if (footerStart !== -1 && footerEnd !== -1) {
    content = content.substring(0, footerStart) + footerHtml + content.substring(footerEnd);
  } else {
    console.warn(`Warning: Footer not found in ${relativePath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Successfully compiled header and footer templates into ${htmlFiles.length} HTML files.`);
