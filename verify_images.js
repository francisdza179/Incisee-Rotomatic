const fs = require('fs');
const path = require('path');

// Recursively find all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'templates') {
        results = results.concat(getHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(__dirname);
let totalErrors = 0;

console.log(`Scanning ${htmlFiles.length} HTML files for broken image references...\n`);

htmlFiles.forEach(htmlPath => {
  const content = fs.readFileSync(htmlPath, 'utf8');
  const dirName = path.dirname(htmlPath);
  const relativeHtmlPath = path.relative(__dirname, htmlPath);

  // Regex to match img src
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  // Regex to match link rel="preload" href
  const preloadRegex = /<link[^>]+rel=["']preload["'][^>]+href=["']([^"']+)["']/g;

  let match;
  const imagesToCheck = [];

  while ((match = imgRegex.exec(content)) !== null) {
    imagesToCheck.push({ type: 'img', url: match[1], line: getLineNumber(content, match.index) });
  }

  while ((match = preloadRegex.exec(content)) !== null) {
    if (match[0].includes('as="image"')) {
      imagesToCheck.push({ type: 'preload', url: match[1], line: getLineNumber(content, match.index) });
    }
  }

  imagesToCheck.forEach(({ type, url, line }) => {
    // Skip external URLs
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || url.startsWith('data:')) {
      return;
    }

    // Decode URL characters like %20, %26
    let decodedUrl = decodeURIComponent(url);

    // Decode basic HTML entities that might appear in URLs
    decodedUrl = decodedUrl
      .replace(/&ndash;/g, '–')
      .replace(/&#8322;/g, '₂')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');

    // Resolve path relative to the HTML file
    const resolvedPath = path.resolve(dirName, decodedUrl);

    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ Broken image reference in [${relativeHtmlPath}:${line}]:`);
      console.error(`   Type: <${type}>, Referenced: "${url}"`);
      console.error(`   Resolved path: "${resolvedPath}"\n`);
      totalErrors++;
    }
  });
});

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

if (totalErrors > 0) {
  console.log(`Summary: Found ${totalErrors} broken image references.`);
  process.exit(1);
} else {
  console.log('✅ All image references are valid!');
  process.exit(0);
}
