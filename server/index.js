import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from 'dist'
app.use(express.static(path.join(__dirname, "dist")));

// API example route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// For React Router: serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log("Billy Buddy backend is running 🚀"));
