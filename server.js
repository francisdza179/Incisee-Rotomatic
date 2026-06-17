const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 9090;
const BASE = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function supportsGzip(acceptEncoding) {
  return /\bgzip\b/.test(acceptEncoding || '');
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(BASE, urlPath);

  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    const type = MIME[ext] || 'text/plain';

    const acceptEncoding = req.headers['accept-encoding'];
    if (supportsGzip(acceptEncoding)) {
      zlib.gzip(data, (err, compressed) => {
        if (err) {
          res.writeHead(500);
          return res.end('Compression error');
        }
        res.writeHead(200, {
          'Content-Type': type,
          'Content-Encoding': 'gzip',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(compressed);
      });
    } else {
      res.writeHead(200, {
        'Content-Type': type,
        'Access-Control-Allow-Origin': '*',
      });
      res.end(data);
    }
  } catch (e) {
    const filePath404 = path.join(BASE, '404.html');
    try {
      const data404 = fs.readFileSync(filePath404);
      const acceptEncoding = req.headers['accept-encoding'];
      if (supportsGzip(acceptEncoding)) {
        zlib.gzip(data404, (err, compressed) => {
          res.writeHead(404, {
            'Content-Type': 'text/html',
            'Content-Encoding': 'gzip',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(err ? data404 : compressed);
        });
      } else {
        res.writeHead(404, {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(data404);
      }
    } catch (e2) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
