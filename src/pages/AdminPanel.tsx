import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Trash2,
  Edit3,
  Bell,
  Image,
  Eye,
  Lock,
  LogOut,
  Check,
  X,
  Loader2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  uploadedAt: string;
}

interface Notification {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const CATEGORIES = [
  'Kashmir',
  'Goa',
  'Rajasthan',
  'Himachal',
  'Adventure',
  'Culture',
  'Street Photography',
  'General',
];

const INPUT_CLS =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors';

/* ------------------------------------------------------------------ */
/*  Login Gate                                                         */
/* ------------------------------------------------------------------ */
const LoginGate: React.FC<{
  onLogin: (pw: string) => void;
}> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLogin(password);
      } else {
        setError('Wrong password');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 border-brand-accent/20 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-brand-accent/30">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-white">Admin Access</h1>
          <p className="text-brand-muted font-mono text-xs uppercase tracking-widest mt-2">
            Enter password to continue
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
            <X className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={INPUT_CLS}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Login
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Upload Section                                                     */
/* ------------------------------------------------------------------ */
const UploadSection: React.FC<{
  password: string;
  onUploaded: () => void;
}> = ({ password, onUploaded }) => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl || !title) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password 
        },
        body: JSON.stringify({
          imageUrl: mediaUrl,
          title,
          description,
          category
        }),
      });
      if (res.ok) {
        setSuccess('Media added successfully!');
        setMediaUrl('');
        setTitle('');
        setDescription('');
        setCategory(CATEGORIES[0]);
        onUploaded();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Upload failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 border-brand-accent/20 mb-8"
    >
      <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Upload className="w-5 h-5 text-brand-accent" /> Upload Media (JPG, PNG, MP4)
      </h3>

      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 mb-5 text-sm">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
          <X className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
            Media URL (Image or Video Link) *
          </label>
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className={INPUT_CLS}
            placeholder="https://example.com/image.jpg or https://youtube.com/..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={INPUT_CLS}
              placeholder="Image title"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={INPUT_CLS + ' appearance-none'}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-brand-bg text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={INPUT_CLS + ' resize-none'}
            placeholder="Short description..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !mediaUrl || !title}
          className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Upload Media
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Gallery Card (with inline edit)                                    */
/* ------------------------------------------------------------------ */
const GalleryCard: React.FC<{
  item: GalleryImage;
  password: string;
  onRefresh: () => void;
}> = ({ item, password, onRefresh }) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDesc, setEditDesc] = useState(item.description);
  const [editCat, setEditCat] = useState(item.category);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDesc,
          category: editCat,
        }),
      });
      if (res.ok) {
        setEditing(false);
        onRefresh();
      }
    } catch {
      /* network error */
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/admin/gallery/${item.id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });
      onRefresh();
    } catch {
      /* network error */
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card border-brand-accent/20 overflow-hidden"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display font-bold text-white text-sm leading-tight">
            {item.title}
          </h4>
          <span className="text-[9px] font-mono bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full whitespace-nowrap">
            {item.category}
          </span>
        </div>
        {item.description && (
          <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <p className="text-brand-muted/50 text-[10px] font-mono">
          {new Date(item.uploadedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              setEditing(!editing);
              setEditTitle(item.title);
              setEditDesc(item.description);
              setEditCat(item.category);
            }}
            className="flex-1 py-2 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex-1 py-2 text-xs font-bold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      </div>

      {/* Inline Edit */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-white/10 space-y-3">
              <div>
                <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className={INPUT_CLS + ' resize-none'}
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-1">
                  Category
                </label>
                <select
                  value={editCat}
                  onChange={(e) => setEditCat(e.target.value)}
                  className={INPUT_CLS + ' appearance-none'}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-brand-bg text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2 text-xs font-bold rounded-lg bg-brand-accent text-white hover:bg-brand-accent/80 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}{' '}
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 py-2 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" /> Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-3xl z-10"
          >
            <p className="text-white font-display font-bold text-sm">Are you sure?</p>
            <p className="text-brand-muted text-xs">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}{' '}
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Gallery Manager Tab                                                */
/* ------------------------------------------------------------------ */
const GalleryManager: React.FC<{ password: string }> = ({ password }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setImages(Array.isArray(data) ? data : data.items || []);
      }
    } catch {
      /* network error */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="space-y-8">
      <UploadSection password={password} onUploaded={fetchImages} />

      <div>
        <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Image className="w-5 h-5 text-brand-accent" /> Gallery Images
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="glass-card border-brand-accent/20 p-12 text-center">
            <Image className="w-12 h-12 text-brand-muted mx-auto mb-4" />
            <p className="text-brand-muted text-sm">No images uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {images.map((img) => (
                <GalleryCard
                  key={img.id}
                  item={img}
                  password={password}
                  onRefresh={fetchImages}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Notification Card                                                  */
/* ------------------------------------------------------------------ */
const NotificationCard: React.FC<{
  item: Notification;
  password: string;
  onMarked: () => void;
}> = ({ item, password, onMarked }) => {
  const [marking, setMarking] = useState(false);

  const markAsRead = async () => {
    setMarking(true);
    try {
      await fetch(`/api/admin/notifications/${item.id}/read`, {
        method: 'PUT',
        headers: { 'x-admin-password': password },
      });
      onMarked();
    } catch {
      /* network error */
    } finally {
      setMarking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-5 border-brand-accent/20 relative ${
        !item.read ? 'bg-white/[0.06]' : ''
      }`}
    >
      {/* Unread indicator */}
      {!item.read && (
        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-white text-sm">{item.name}</h4>
            <p className="text-brand-accent text-xs font-mono">{item.email}</p>
          </div>
          <span className="text-brand-muted/50 text-[10px] font-mono whitespace-nowrap">
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {item.subject && (
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider">
            {item.subject}
          </p>
        )}

        <p className="text-brand-muted text-sm leading-relaxed">{item.message}</p>

        {!item.read && (
          <button
            onClick={markAsRead}
            disabled={marking}
            className="mt-2 px-4 py-2 text-xs font-bold rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors flex items-center gap-1 disabled:opacity-50"
          >
            {marking ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Eye className="w-3 h-3" />
            )}{' '}
            Mark as Read
          </button>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Notifications Tab                                                  */
/* ------------------------------------------------------------------ */
const NotificationsTab: React.FC<{
  password: string;
  unreadCount: number;
  onRefresh: () => void;
  notifications: Notification[];
  loading: boolean;
}> = ({ password, onRefresh, notifications, loading }) => {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5 text-brand-accent" /> Contact Submissions
      </h3>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="glass-card border-brand-accent/20 p-12 text-center">
          <Bell className="w-12 h-12 text-brand-muted mx-auto mb-4" />
          <p className="text-brand-muted text-sm">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              item={n}
              password={password}
              onMarked={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Admin Dashboard                                                    */
/* ------------------------------------------------------------------ */
const AdminDashboard: React.FC<{
  password: string;
  onLogout: () => void;
}> = ({ password, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'notifications'>('gallery');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifLoading, setNotifLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    setNotifLoading(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(
          (Array.isArray(data) ? data : data.notifications || []).sort(
            (a: Notification, b: Notification) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      }
    } catch {
      /* network error */
    } finally {
      setNotifLoading(false);
    }
  }, [password]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Admin Panel
          </h1>
          <p className="text-brand-muted font-mono uppercase tracking-widest text-xs mt-2">
            Manage gallery & notifications
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all text-sm font-bold"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'gallery'
              ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20'
              : 'bg-white/5 text-brand-muted hover:text-white hover:bg-white/10'
          }`}
        >
          <Image className="w-4 h-4" /> Gallery Manager
        </button>
        <button
          onClick={() => {
            setActiveTab('notifications');
            fetchNotifications();
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'notifications'
              ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20'
              : 'bg-white/5 text-brand-muted hover:text-white hover:bg-white/10'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'gallery' ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryManager password={password} />
          </motion.div>
        ) : (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <NotificationsTab
              password={password}
              unreadCount={unreadCount}
              onRefresh={fetchNotifications}
              notifications={notifications}
              loading={notifLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main AdminPanel Page                                               */
/* ------------------------------------------------------------------ */
const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState<string | null>(null);

  return password ? (
    <AdminDashboard password={password} onLogout={() => setPassword(null)} />
  ) : (
    <LoginGate onLogin={(pw) => setPassword(pw)} />
  );
};

export default AdminPanel;
