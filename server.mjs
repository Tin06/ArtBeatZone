import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT || 3000)
const root = path.join(dirname, 'out')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
}

function resolveFile(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0])
  const normalizedPath = decodedPath === '/' ? '/index.html' : decodedPath
  const requestedPath = path.join(root, normalizedPath)
  const resolvedPath = path.resolve(requestedPath)

  if (!resolvedPath.startsWith(path.resolve(root))) {
    return null
  }

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath
  }

  if (!path.extname(resolvedPath)) {
    const htmlPath = `${resolvedPath}.html`
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      return htmlPath
    }
  }

  return path.join(root, '404.html')
}

http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/')

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('Not found')
    return
  }

  const isNotFound = path.basename(filePath) === '404.html' && req.url !== '/404.html'
  const ext = path.extname(filePath)
  res.writeHead(isNotFound ? 404 : 200, {
    'cache-control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    'content-type': contentTypes[ext] || 'application/octet-stream',
  })
  fs.createReadStream(filePath).pipe(res)
}).listen(port, '0.0.0.0', () => {
  console.log(`Serving static export from ${root} on port ${port}`)
})
