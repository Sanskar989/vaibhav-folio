# Prompt: Build Backend And Admin Panel For This Portfolio

You are a senior full-stack developer. Upgrade this existing Vite + React + TypeScript portfolio into a production-ready portfolio CMS with secure admin access.

## Current project context

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, lucide-react, motion, recharts.
- Backend: Express server in `server.ts`.
- Database/auth: Firebase Auth, Firestore, Firebase Admin SDK.
- Existing frontend file: `src/App.tsx`.
- Existing Firebase client file: `src/lib/firebase.ts`.
- Existing security rules file: `firestore.rules`.
- Existing editable data: profile, projects, experience, education, skills, certifications, social posts, contact messages, sync settings.

## Main goal

Create a secure backend and admin dashboard so the portfolio owner can log in and edit all website data without touching code.

## Required features

1. Authentication
   - Use Firebase Google Sign-In.
   - Only allow admin users to access edit screens and admin API routes.
   - Admin check must support:
     - `ADMIN_EMAIL` environment variable.
     - Firestore user role: `users/{uid}.role === "admin"`.
   - Never use hardcoded frontend passwords.
   - Never expose service account JSON or admin secrets to the browser.

2. Backend API
   - Protect admin-only routes with Firebase ID-token verification.
   - Add reusable middleware: `requireAdmin`.
   - Admin routes should include:
     - `GET /api/admin/settings`
     - `PATCH /api/admin/settings`
     - `GET /api/admin/messages`
     - `DELETE /api/admin/messages/:id`
     - `POST /api/admin/sync/instagram`
     - optional CRUD endpoints for profile/projects/experience/education/skills/certifications if not handled directly by Firestore.
   - Public routes should include:
     - `POST /api/contact`
     - optional public read endpoints if Firestore direct reads are removed.

3. Database design
   - Use these Firestore collections/documents:
     - `config/main`
     - `projects`
     - `experience`
     - `education`
     - `skills`
     - `certifications`
     - `social_posts`
     - `messages`
     - `users`
   - Add `createdAt`, `updatedAt`, and `order` fields where useful.
   - Validate required fields before writes.

4. Admin dashboard
   - Create a polished admin UI inside the existing portfolio.
   - Admin can edit:
     - profile name, title, about, photo, email, phone, location, social links
     - projects with title, description, details, tags, image, live link, repo link, order
     - work experience
     - education
     - skills and skill scores
     - certifications
     - photography/social posts
     - site sync settings
   - Admin can view and delete contact messages.
   - Use clear loading, saving, success, and error states.
   - Avoid saving on every keystroke for large forms; use explicit Save buttons or debounced updates.

5. Firestore security rules
   - Public users can read portfolio content.
   - Anyone can submit contact messages with validation.
   - Only admins can write portfolio content, read messages, delete messages, and update settings.
   - Rules must validate document shape and field sizes.

6. Environment variables
   - Add/update `.env.example` with:
     - `ADMIN_EMAIL`
     - `FIREBASE_SERVICE_ACCOUNT`
     - `GEMINI_API_KEY`
     - `LINKEDIN_CLIENT_ID`
     - `LINKEDIN_CLIENT_SECRET`
     - `INSTAGRAM_ACCESS_TOKEN`
   - Make clear which variables are server-only and which are safe for the client.

7. Quality
   - Keep the current design style, but clean up duplicated admin components.
   - Split large `src/App.tsx` into maintainable files if needed:
     - `src/components`
     - `src/admin`
     - `src/hooks`
     - `src/services`
     - `src/types`
   - Add TypeScript types for every collection.
   - Run `npm run lint` and `npm run build`.
   - Fix all TypeScript errors.

## Important security requirements

- Do not trust frontend state for admin authorization.
- Do not store admin passwords in React code.
- Do not return secret tokens such as Instagram access tokens to non-admin users.
- Do not allow unauthenticated writes except validated contact form submissions.
- Do not place Firebase Admin SDK code in frontend files.

## Expected output

Make the code changes directly. Then summarize:

- What files changed.
- How admin login works.
- What Firestore collections are used.
- What environment variables are required.
- How to run locally.
- How to deploy.
