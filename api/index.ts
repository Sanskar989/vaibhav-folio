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
    const encoded = "eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6InZhaWJoYXYtcmVzdW1lLTg4MGY2IiwicHJpdmF0ZV9rZXlfaWQiOiI0MTMwOTQyNDg4OTMxYjdjZTQ3ODdjNmIyMGQ0ZGYwYmUwMDAwZjcxIiwicHJpdmF0ZV9rZXkiOiItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ3NKeThCZ2IrNjhvN1Fcbk9iRE5YS09DU3REK3M2KzFObHl6am5JU0haYTJsU1BBTWNqOWY5dzFvR3lmWWZJRy9xRXcyYXBjdXhvbFppS2ZcbldqM2dHOHJET1NhU05sOXMxRVJFV1YzQnYrQjJZNE8ycGdCci9GMDUzV0R4Tm5NbGRsajhvM2x0T2h3OXBmU2tcbkVYeEF3V0t0NEtka0t6NHlpV1hqR3VGNnQ2eWxnbkNxVGFYallwb3JXOFNuRlZGSUJsZHVUUXJ4ek1sblRZcEZcbkJ1RDVMNEloTXROcGVBd3IvSjJBeTlZOVh0OHkzS0Jnb0cxWCthRVUxUWhiRkRjcXZodVhUVkU1a0lYdWh3Vk5cbklGMklLdzIwMGJhRGJmdDdzVERXanJPUmlHbzlFb3psa2ZsZVhXNnpOWWtSejBLdnAvN3JjVENPRVFScGgyNUNcbmxKZXNGQTJYQWdNQkFBRUNnZ0VBQm90d3pvcGJ1eVE0aUxNQXhUWGw0M0NydEZzcGJXYTFMSUJZVnRiNElWWFhcbko1bmM3Y0k4SVcvSllWL01YemF6OHhMN1ZvNG9aczZVdDJFclpBYzZkS1NLRWxudDA4bllGSThmTU52MkVSb2tcbmFqK3lXV2lkTkxOMVdZWTc1MnN4NDl6bEkyRm5ySEpRTkNLVUNqUXY1N05ZT2NjcEZLdkRpMWc4eFRrUlg3TmZcblVVbkJBODlmR1c0dWFDVzQ4aFVuaGR5eFJKVlYraVlRMXozVTB4T1FWNW90YTUxOEhwNUFEN2QyMVphWS9VU01cbjVXOVVqcUI5VVpOZFE2a2ZDcFZUbGF5Wi9tSXB6MU03YlRTUTNsOXBoYU83aE00TTdNblBvZjUvV2xGa3hyMkdcblpza2FWQ1V0VFROZEdNWXJrRkM1QTZiZDBpalk1YXRjVkpPRUhjNk5VUUtCZ1FEY0Z5Y2ZTTmllaXZCNGpYQTBcblVOUXRyaFhBamYxNTVHdjN1UWhmZGg4STBYRnR5YU5FRXZMeTR6akZyczdxSmxPNEVEVDFpMU02YmxNa0xhV2VcbmxTVk5uZVNPbVcvTnpwOEFLbVRaZXk0OUZpNU1sMUFWSUFCbTJ2emlZa3JlR2FZWk1aL1Q3WkoxSUc2aGdPNUFcbjZkSThaaXZ4d3pmUUNobFozQThJcVVmREp3S0JnUURJUGNJbzhPbFg5NS9leXQvVEtRVGtJdStjREJwQ2tRRTRcblozTDNLMkVXenltaVJJeFJ1RkFJQktFaTEwTzFrRTZIYkVyLy80R1NLSGR0Wll0L3pQNEwrOERadnVLV1gyYXZcbkpCR3AzbW5LbW9DUXdmdUJyaXlQQmtza0xIRGNiRmcvUk5KdnMvQmhrWG5DdDFURlRta3IyZi9rYS9FdzA0S2hcbkxHN0hwTjRvRVFLQmdGWTd4QnBmNG5BTUpEZzN3clRjenFXdlJkcVNSN1NRcVRVQWpLVktsTkpScmMzRWFYSHNcbnNzQTBBelNCVDVVeXV5NnRPdkxTU2lQa3dqSzBwK1hBcmtNQkVHSkhBQ1YxUlpzOUFSS3RUdXFrWERPcVBiaHBcbk4zOFZZbXdZOHhpZW1CUGErN0ovclJpelFtV0pMTkRHVEpkWnVQSWErUzFNSjY2cnFFQk9nMDJWQW9HQU1OZnZcbnJuRGxXbEhLcTF1dE1TTEdVS2U4N3NGOC9sUEVpbStoZVcwWlo2anNyT292bUJkdlhpVlM4TjYxWTJwcDNWcXJcbkNMcllia0Iwc1RpZHlIVEdXMEh6anFtak42N1pxMHNQQy9KMnQ3YnNPV00zNkRBR0tuVU1peXhUODFCeVRpeUpcbmNEbmlIc3FQZXRHaFdlZUFlL1BYR1c3RERIZnJXMGt0VklHQXR5RUNnWUVBazhOSlBnZU84bU9sTmhacGxMRXFcbnJxVzhjcFNoTFY1V2NhSFZGTXNQRmx1NnZFY0ZZU0JUSjlTdzFhWnBGVTQycDYrejNkalhzOEtKZ1ZpZnhWd0FcbnY2dTlLODhaUloyNi8wUTZjQS81Tm9LQyt3MlRVTStKTXdxUEhzKzhNcXJpakdTcEFPcWExN05ISTh3ejg1SHJcbitWbFI5MkVCSGtiNHEwUk9hQ0NyaGtNPVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwiY2xpZW50X2VtYWlsIjoiZmlyZWJhc2UtYWRtaW5zZGstZmJzdmNAdmFpYmhhdi1yZXN1bWUtODgwZjYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJjbGllbnRfaWQiOiIxMDAxMDI1NjE5OTg2NTYyNTAwMzciLCJhdXRoX3VyaSI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwidG9rZW5fdXJpIjoiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4iLCJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLCJjbGllbnRfeDUwOV9jZXJ0X3VybCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvZmlyZWJhc2UtYWRtaW5zZGstZmJzdmMlNDB2YWliaGF2LXJlc3VtZS04ODBmNi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVuaXZlcnNlX2RvbWFpbiI6Imdvb2dsZWFwaXMuY29tIn0=";
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

app.post("/api/admin/gallery", requireAdminPassword, upload.single("image"), async (req: any, res: any) => {
  if (!checkFirebase(res)) return;
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });

    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;
    const uniqueName = `uploads/${Date.now()}-${Math.round(Math.random() * 1e6)}-${originalName}`;
    const bucket = admin.storage().bucket();
    const file = bucket.file(uniqueName);

    await file.save(fileBuffer, {
      metadata: { contentType: req.file.mimetype },
      public: true, // Make publicly readable
    });

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueName}`;

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
      if (data?.image) {
        const bucket = admin.storage().bucket();
        const urlObj = new URL(data.image);
        const filePath = decodeURIComponent(urlObj.pathname.replace(`/${bucket.name}/`, ''));
        const file = bucket.file(filePath);
        await file.delete().catch(() => console.log("File not found in storage, ignoring."));
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
