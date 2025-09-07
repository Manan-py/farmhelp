import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the public directory
app.use('/static', express.static(path.join(__dirname, '../client/public/static')));
app.use('/figmaAssets', express.static(path.join(__dirname, '../client/public/figmaAssets')));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌱 Planto Dashboard running on http://0.0.0.0:${PORT}`);
    console.log(`📂 Serving static files from client/public/`);
});