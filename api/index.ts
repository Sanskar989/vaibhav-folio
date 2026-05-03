import express from "express";
import multer from "multer";
import admin from "firebase-admin";

const app = express();
app.use(express.json());

let firebaseInitialized = false;
let initError = "";

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (!encoded) {
      throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable.");
    }
    const serviceAccount = JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "vaibhav-resume-880f6.appspot.com"
    });
    firebaseInitialized = true;
  } catch (e: any) {
    console.error("Firebase Admin initialization failed", e);
    initError = e.message;
  }
} else {
  firebaseInitialized = true;
}

// Multer using memory storage for serverless
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Admin Password Auth
const ADMIN_PASSWORD = "vaibhavtravel";
function requireAdminPassword(req: any, res: any, next: any) {
  const pw = req.headers["x-admin-password"] || req.body?.password;
  if (pw !== ADMIN_PASSWORD) return res.status(401).json({ success: false, message: "Invalid password" });
  next();
}

// Helper to check DB
function checkFirebase(res: any) {
  if (!firebaseInitialized) {
    res.status(500).json({ success: false, message: "Firebase not initialized: " + initError });
    return false;
  }
  return true;
}

// ----------------------------------------------------
// CONTACT SUBMISSIONS
// ----------------------------------------------------
app.post("/api/contact", async (req, res) => {
  if (!checkFirebase(res)) return;
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

    const db = admin.firestore();
    await db.collection("contact_submissions").add(submission);

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
  } catch (err: any) {
    console.error("Failed to save contact message:", err);
    res.status(500).json({ success: false, message: "Failed to send message: " + err.message });
  }
});

// ----------------------------------------------------
// ADMIN AUTH
// ----------------------------------------------------
app.post("/api/admin/login", (req, res) => {
  if (!checkFirebase(res)) return;
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
  if (!checkFirebase(res)) return;
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("gallery").orderBy("uploadedAt", "desc").get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, items });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to fetch gallery: " + err.message });
  }
});

app.post("/api/admin/gallery", requireAdminPassword, async (req: any, res: any) => {
  if (!checkFirebase(res)) return;
  try {
    let imageUrl = req.body.imageUrl;
    
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "No media URL provided" });
    }

    const newItem = {
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      category: req.body.category || "General",
      image: imageUrl,
      uploadedAt: new Date().toISOString(),
    };

    const db = admin.firestore();
    const docRef = await db.collection("gallery").add(newItem);

    res.json({ success: true, item: { id: docRef.id, ...newItem } });
  } catch (err: any) {
    console.error("Gallery upload failed:", err);
    res.status(500).json({ success: false, message: "Upload failed: " + err.message });
  }
});

app.put("/api/admin/gallery/:id", requireAdminPassword, async (req: any, res: any) => {
  if (!checkFirebase(res)) return;
  try {
    const db = admin.firestore();
    const { title, description, category } = req.body;
    await db.collection("gallery").doc(req.params.id).update({
      title, description, category
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to update: " + err.message });
  }
});

app.delete("/api/admin/gallery/:id", requireAdminPassword, async (req: any, res: any) => {
  if (!checkFirebase(res)) return;
  try {
    const db = admin.firestore();
    const docRef = db.collection("gallery").doc(req.params.id);
    const doc = await docRef.get();
    if (doc.exists) {
      const data = doc.data();
      if (data?.image && data.image.includes('storage.googleapis.com')) {
        try {
          const bucket = admin.storage().bucket();
          const urlObj = new URL(data.image);
          const filePath = decodeURIComponent(urlObj.pathname.replace(`/${bucket.name}/`, ''));
          const file = bucket.file(filePath);
          await file.delete().catch(() => console.log("File not found in storage, ignoring."));
        } catch (e) {
          console.log("Bucket delete skipped for external/legacy URL");
        }
      }
      await docRef.delete();
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to delete: " + err.message });
  }
});

// ----------------------------------------------------
// NOTIFICATIONS API
// ----------------------------------------------------
app.get("/api/admin/notifications", requireAdminPassword, async (req, res) => {
  if (!checkFirebase(res)) return;
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("notifications").orderBy("createdAt", "desc").get();
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, notifications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to fetch notifications: " + err.message });
  }
});

app.put("/api/admin/notifications/:id/read", requireAdminPassword, async (req: any, res: any) => {
  if (!checkFirebase(res)) return;
  try {
    const db = admin.firestore();
    await db.collection("notifications").doc(req.params.id).update({ read: true });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Failed to mark as read: " + err.message });
  }
});

export default app;
