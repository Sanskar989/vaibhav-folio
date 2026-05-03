import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());

// ----------------------------------------------------
// DATABASE CONNECTION (Serverless-safe lazy connect)
// ----------------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI;
let cachedConnection: Promise<typeof mongoose> | null = null;

function connectDB() {
  if (!MONGODB_URI) {
    return Promise.reject(new Error("Missing MONGODB_URI environment variable."));
  }
  if (!cachedConnection) {
    cachedConnection = mongoose.connect(MONGODB_URI).then((m) => {
      console.log("Connected to MongoDB successfully.");
      return m;
    });
  }
  return cachedConnection;
}

async function ensureDB(res: any): Promise<boolean> {
  try {
    await connectDB();
    return true;
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Database not connected: " + err.message });
    return false;
  }
}

// ----------------------------------------------------
// MONGOOSE SCHEMAS
// ----------------------------------------------------
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "General" },
  image: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});
const GalleryItem = mongoose.models.GalleryItem || mongoose.model("GalleryItem", gallerySchema);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: "No Subject" },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});
const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", contactSchema);

const notificationSchema = new mongoose.Schema({
  type: { type: String, default: "contact" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: "No Subject" },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

// ----------------------------------------------------
// HELPER MIDDLEWARE
// ----------------------------------------------------
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const ADMIN_PASSWORD = "vaibhavtravel";
function requireAdminPassword(req: any, res: any, next: any) {
  const pw = req.headers["x-admin-password"] || req.body?.password;
  if (pw !== ADMIN_PASSWORD) return res.status(401).json({ success: false, message: "Invalid password" });
  next();
}

// ----------------------------------------------------
// CONTACT SUBMISSIONS
// ----------------------------------------------------
app.post("/api/contact", async (req, res) => {
  if (!(await ensureDB(res))) return;
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required." });
    }
    await ContactSubmission.create({ name, email, subject, message });
    await Notification.create({ type: "contact", name, email, subject, message });
    res.status(200).json({ success: true, message: "Your message has been received! Vaibhav will get back to you soon." });
  } catch (err: any) {
    console.error("Failed to save contact message:", err);
    res.status(500).json({ success: false, message: "Failed to send message: " + err.message });
  }
});

// ----------------------------------------------------
// ADMIN AUTH (no DB needed)
// ----------------------------------------------------
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: "Admin access granted" });
  } else {
    res.status(401).json({ success: false, message: "Wrong password" });
  }
});

// ----------------------------------------------------
// GALLERY API
// ----------------------------------------------------
app.get("/api/gallery", async (_req, res) => {
  if (!(await ensureDB(res))) return;
  try {
    const items = await GalleryItem.find().sort({ uploadedAt: -1 }).lean();
    const formattedItems = items.map((item: any) => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      uploadedAt: item.uploadedAt
    }));
    res.json({ success: true, items: formattedItems });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to fetch gallery: " + err.message });
  }
});

app.post("/api/admin/gallery", requireAdminPassword, async (req: any, res: any) => {
  if (!(await ensureDB(res))) return;
  try {
    const imageUrl = req.body.imageUrl;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "No media URL provided" });
    }
    const doc = await GalleryItem.create({
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      category: req.body.category || "General",
      image: imageUrl,
    });
    res.json({
      success: true,
      item: { id: doc._id.toString(), title: doc.title, description: doc.description, category: doc.category, image: doc.image, uploadedAt: doc.uploadedAt }
    });
  } catch (err: any) {
    console.error("Gallery upload failed:", err);
    res.status(500).json({ success: false, message: "Upload failed: " + err.message });
  }
});

app.put("/api/admin/gallery/:id", requireAdminPassword, async (req: any, res: any) => {
  if (!(await ensureDB(res))) return;
  try {
    const { title, description, category } = req.body;
    await GalleryItem.findByIdAndUpdate(req.params.id, { title, description, category });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to update: " + err.message });
  }
});

app.delete("/api/admin/gallery/:id", requireAdminPassword, async (req: any, res: any) => {
  if (!(await ensureDB(res))) return;
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to delete: " + err.message });
  }
});

// ----------------------------------------------------
// CLOUDINARY SIGNATURE API
// ----------------------------------------------------
app.get("/api/admin/cloudinary-signature", requireAdminPassword, (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET!
    );
    res.json({ success: true, timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to generate signature: " + err.message });
  }
});

// ----------------------------------------------------
// NOTIFICATIONS API
// ----------------------------------------------------
app.get("/api/admin/notifications", requireAdminPassword, async (req, res) => {
  if (!(await ensureDB(res))) return;
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).lean();
    const formattedNotifs = notifications.map((n: any) => ({
      id: n._id.toString(),
      type: n.type,
      name: n.name,
      email: n.email,
      subject: n.subject,
      message: n.message,
      read: n.read,
      createdAt: n.createdAt
    }));
    res.json({ success: true, notifications: formattedNotifs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to fetch notifications: " + err.message });
  }
});

app.put("/api/admin/notifications/:id/read", requireAdminPassword, async (req: any, res: any) => {
  if (!(await ensureDB(res))) return;
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to mark as read: " + err.message });
  }
});

export default app;
