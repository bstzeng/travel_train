import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, stat } from 'node:fs/promises';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (request, response) => {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
  const normalizedPath = requestPath === '/' ? '/index.html' : requestPath;
  const targetPath = path.normalize(path.join(__dirname, normalizedPath));

  if (!targetPath.startsWith(__dirname)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  try {
    const fileStat = await stat(targetPath);
    const finalPath = fileStat.isDirectory() ? path.join(targetPath, 'index.html') : targetPath;
    const content = await readFile(finalPath);
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(finalPath)] || 'application/octet-stream'
    });
    response.end(content);
  } catch {
    try {
      const fallback = await readFile(path.join(__dirname, '404.html'));
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(fallback);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  }
});

server.listen(port, () => {
  console.log(`Bopomofo Train Journey is running at http://localhost:${port}`);
});
