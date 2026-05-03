import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';

export default function Contact() {
  const { data } = useDataStore();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in name, email, and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">GET IN TOUCH</h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Let's create something unforgettable</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Contact Info</h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-8">
              Open to travel operations roles, brand collaborations, destination marketing partnerships, and freelance consulting. Let's connect!
            </p>
          </div>

          <div className="space-y-6">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-accent/50 transition-colors">
                <Mail className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Email</div>
                <div className="text-white font-medium text-sm">{profile.email}</div>
              </div>
            </a>

            <a href={`tel:${profile.phone}`} className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-accent/50 transition-colors">
                <Phone className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Phone</div>
                <div className="text-white font-medium text-sm">{profile.phone}</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Location</div>
                <div className="text-white font-medium text-sm">{profile.location}</div>
              </div>
            </div>

            <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-accent/50 transition-colors">
                <Linkedin className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">LinkedIn</div>
                <div className="text-white font-medium text-sm">{profile.linkedin}</div>
              </div>
            </a>

            <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-accent/50 transition-colors">
                <Instagram className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Instagram</div>
                <div className="text-white font-medium text-sm">@{profile.instagram}</div>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 border-brand-accent/20"
        >
          <h3 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h3>

          {successMsg && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 mb-5 text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                placeholder="Collaboration / Hire / General"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">Message</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
