import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Use the PORT environment variable provided by Railway
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express static server is running on port ${port}`);
});
