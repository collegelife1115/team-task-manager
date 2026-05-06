import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Proxy API requests to the Backend to bypass CORS entirely
const targetUrl = process.env.VITE_API_URL || 'http://localhost:5000/api';

console.log(`[Proxy Config] Backend target is: ${targetUrl}`);

app.use('/api', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    // Log the EXACT final URL we are sending to
    console.log(`[Proxy] ${req.method} ${req.url} -> ${targetUrl}${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('[Proxy Error]', err);
    res.status(502).send('Proxy Error: Could not connect to backend.');
  }
}));

// Log every single request that hits the server
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Explicit health check endpoint for Railway proxy
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Server Error: Could not find index.html. Did the build fail?');
    }
  });
});

// Use the PORT environment variable provided by Railway
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express static server is running on port ${port}`);
});
