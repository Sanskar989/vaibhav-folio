import express from "express";
import multer from "multer";
import admin from "firebase-admin";

const app = express();
app.use(express.json());

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "vaibhav-resume-880f6.appspot.com"
    });
  } catch (e) {
    console.error("Firebase Admin initialization failed", e);
  }
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Multer using memory storage for serverless
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Admin Password Auth
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
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required." });
    }

    const submission = {
      name,
      email,
      subject: subject || "No Subject",
      message,
      submittedAt: new Date().toISOString(),
    };

    // Save to Firestore
    await db.collection("contact_submissions").add(submission);

    // Save notification
    const notification = {
      type: "contact",
      name,
      email,
      subject: subject || "No Subject",
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    await db.collection("notifications").add(notification);

    res.status(200).json({
      success: true,
      message: "Your message has been received! Vaibhav will get back to you soon.",
    });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
});

// ----------------------------------------------------
// ADMIN AUTH
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
  try {
    const snapshot = await db.collection("gallery").orderBy("uploadedAt", "desc").get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch gallery" });
  }
});

app.post("/api/admin/gallery", requireAdminPassword, upload.single("image"), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });

    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;
    const uniqueName = `uploads/${Date.now()}-${Math.round(Math.random() * 1e6)}-${originalName}`;
    const file = bucket.file(uniqueName);

    await file.save(fileBuffer, {
      metadata: { contentType: req.file.mimetype },
      public: true, // Make publicly readable
    });

    // Get public URL
    // Actually, bucket.file().publicUrl() exists in newer SDKs, or we construct it manually
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueName}`;

    const newItem = {
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      category: req.body.category || "General",
      image: imageUrl,
      uploadedAt: new Date().toISOString(),
    };

    const docRef = await db.collection("gallery").add(newItem);

    res.json({ success: true, item: { id: docRef.id, ...newItem } });
  } catch (err) {
    console.error("Gallery upload failed:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

app.put("/api/admin/gallery/:id", requireAdminPassword, async (req: any, res: any) => {
  try {
    const { title, description, category } = req.body;
    await db.collection("gallery").doc(req.params.id).update({
      title, description, category
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
});

app.delete("/api/admin/gallery/:id", requireAdminPassword, async (req: any, res: any) => {
  try {
    const docRef = db.collection("gallery").doc(req.params.id);
    const doc = await docRef.get();
    if (doc.exists) {
      const data = doc.data();
      if (data?.image) {
        // Try to delete from storage. Extract path from URL.
        const urlObj = new URL(data.image);
        const filePath = decodeURIComponent(urlObj.pathname.replace(`/${bucket.name}/`, ''));
        const file = bucket.file(filePath);
        await file.delete().catch(() => console.log("File not found in storage, ignoring."));
      }
      await docRef.delete();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
});

// ----------------------------------------------------
// NOTIFICATIONS API
// ----------------------------------------------------
app.get("/api/admin/notifications", requireAdminPassword, async (req, res) => {
  try {
    const snapshot = await db.collection("notifications").orderBy("createdAt", "desc").get();
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
});

app.put("/api/admin/notifications/:id/read", requireAdminPassword, async (req: any, res: any) => {
  try {
    await db.collection("notifications").doc(req.params.id).update({ read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to mark as read" });
  }
});

// Vercel serverless functions require the app to be exported
export default app;
