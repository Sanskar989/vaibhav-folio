import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Multer config for image uploads
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e6) + path.extname(file.originalname);
      cb(null, uniqueName);
    }
  });
  const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

  // Gallery & Notification data helpers
  const galleryPath = path.join(process.cwd(), "data", "gallery.json");
  const notifPath = path.join(process.cwd(), "data", "notifications.json");

  if (!fs.existsSync(path.join(process.cwd(), "data"))) fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  if (!fs.existsSync(galleryPath)) fs.writeFileSync(galleryPath, "[]", "utf-8");
  if (!fs.existsSync(notifPath)) fs.writeFileSync(notifPath, "[]", "utf-8");

  function readJSON(p: string) { try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return []; } }
  function writeJSON(p: string, data: any) { fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf-8"); }

  // Simple password-based admin auth middleware
  const ADMIN_PASSWORD = "vaibhavtravel";

  function requireAdminPassword(req: any, res: any, next: any) {
    const pw = req.headers["x-admin-password"] || req.body?.password;
    if (pw !== ADMIN_PASSWORD) return res.status(401).json({ success: false, message: "Invalid password" });
    next();
  }

  // Contact Submissions (file-based)
  const contactDir = path.join(process.cwd(), "contact-submissions");
  const allSubmissionsPath = path.join(contactDir, "all-submissions.json");

  if (!fs.existsSync(contactDir)) {
    fs.mkdirSync(contactDir, { recursive: true });
  }
  if (!fs.existsSync(allSubmissionsPath)) {
    fs.writeFileSync(allSubmissionsPath, JSON.stringify([], null, 2), "utf-8");
  }

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Name, email, and message are required." });
      }

      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
      const safeName = name.replace(/[^a-zA-Z0-9]/g, "");
      const filename = `${dateStr}_${timeStr}_${safeName}.json`;

      const submission = {
        name,
        email,
        subject: subject || "No Subject",
        message,
        submittedAt: now.toISOString(),
      };

      fs.writeFileSync(path.join(contactDir, filename), JSON.stringify(submission, null, 2), "utf-8");

      let allSubmissions: any[] = [];
      try {
        const raw = fs.readFileSync(allSubmissionsPath, "utf-8");
        allSubmissions = JSON.parse(raw);
      } catch {
        allSubmissions = [];
      }
      allSubmissions.push(submission);
      fs.writeFileSync(allSubmissionsPath, JSON.stringify(allSubmissions, null, 2), "utf-8");

      // Save notification
      const notifications = readJSON(notifPath);
      notifications.unshift({
        id: "notif-" + Date.now(),
        type: "contact",
        name,
        email,
        subject: subject || "No Subject",
        message,
        read: false,
        createdAt: new Date().toISOString(),
      });
      writeJSON(notifPath, notifications);
      console.log("\n🔔 NEW CONTACT NOTIFICATION!");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject || "No Subject"}`);
      console.log(`Message: ${message}\n`);

      res.status(200).json({
        success: true,
        message: "Your message has been received! Vaibhav will get back to you soon.",
      });
    } catch (err) {
      console.error("Failed to save contact message:", err);
      res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const raw = fs.readFileSync(allSubmissionsPath, "utf-8");
      const allSubmissions = JSON.parse(raw);
      res.status(200).json({ success: true, submissions: allSubmissions });
    } catch (err) {
      console.error("Failed to read submissions:", err);
      res.status(500).json({ success: false, message: "Failed to load submissions." });
    }
  });

  // Admin login (password-based)
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, message: "Admin access granted" });
    } else {
      res.status(401).json({ success: false, message: "Wrong password" });
    }
  });

  // Get all gallery items (public)
  app.get("/api/gallery", (_req, res) => {
    const items = readJSON(galleryPath);
    res.json({ success: true, items });
  });

  // Upload image with metadata (protected)
  app.post("/api/admin/gallery", requireAdminPassword, upload.single("image"), (req: any, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
    const items = readJSON(galleryPath);
    const newItem = {
      id: "img-" + Date.now(),
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      category: req.body.category || "General",
      image: "/uploads/" + req.file.filename,
      uploadedAt: new Date().toISOString(),
    };
    items.push(newItem);
    writeJSON(galleryPath, items);
    res.json({ success: true, item: newItem });
  });

  // Update gallery item metadata (protected)
  app.put("/api/admin/gallery/:id", requireAdminPassword, (req, res) => {
    const items = readJSON(galleryPath);
    const idx = items.findIndex((i: any) => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: "Not found" });
    items[idx] = { ...items[idx], ...req.body, id: items[idx].id, image: items[idx].image };
    writeJSON(galleryPath, items);
    res.json({ success: true, item: items[idx] });
  });

  // Delete gallery item + file (protected)
  app.delete("/api/admin/gallery/:id", requireAdminPassword, (req, res) => {
    const items = readJSON(galleryPath);
    const idx = items.findIndex((i: any) => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: "Not found" });
    const filePath = path.join(process.cwd(), "public", items[idx].image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    items.splice(idx, 1);
    writeJSON(galleryPath, items);
    res.json({ success: true });
  });

  // Get all notifications (protected)
  app.get("/api/admin/notifications", requireAdminPassword, (req, res) => {
    const notifications = readJSON(notifPath);
    res.json({ success: true, notifications });
  });

  // Mark notification as read (protected)
  app.put("/api/admin/notifications/:id/read", requireAdminPassword, (req, res) => {
    const notifications = readJSON(notifPath);
    const idx = notifications.findIndex((n: any) => n.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: "Notification not found" });
    notifications[idx].read = true;
    writeJSON(notifPath, notifications);
    res.json({ success: true, notification: notifications[idx] });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
