### ✅ Here's your `PLAN.md` (post-Phase 1, EJS + Tailwind + Express setup complete):

```markdown
# 🛠️ Umbraix Plugins Website – Development Plan

Welcome to the development roadmap for the Umbraix Plugins website. This document outlines the next stages of the project, with clear goals, tasks, and structure for front-end and back-end work using EJS, Tailwind CSS, and Express.js (all inside the `/src` directory).

---

## Read project Strucutre too

---

## 🎨 PHASE 2: UI/UX Development (Frontend Templates)

### 🔹 Goals
- Build modular, reusable UI components
- Pages should be responsive, clean, and Tailwind-optimized
- Use EJS partials (`partials/header.ejs`, `footer.ejs`, etc.)

### 📄 Pages to Create under src folder
- [ ] `home.ejs` → Overview + featured plugins
- [ ] `plugins.ejs` → Full plugin list with cards, categories, filters
- [ ] `pluginDetails.ejs` → Single plugin view with description, changelog, download
- [ ] `about.ejs` → Umbraix mission, team, background
- [ ] `contact.ejs` → Simple contact form
- [ ] `404.ejs` → Fallback page for broken routes

### 🔁 Components (in `/src/componets`)
- [ ] `header.ejs` → Navigation bar
- [ ] `footer.ejs` → Footer + social links
- [ ] `pluginCard.ejs` → Reusable plugin card template
- [ ] `alert.ejs` → Success/error/warning banners

---

## 🔁 PHASE 3: Routing & Backend Logic

### 🔹 Goals
- Organize backend into controller files
- Dynamically serve plugins from `/data/plugins.json`

### 🧠 Plugin Routes (`/routes/plugins.js`)
- [ ] `GET /plugins` → List all plugins
- [ ] `GET /plugins/:id` → Show plugin detail

### 📦 Data File Structure
`/data/plugins.json` example:
```json
[
  {
    "id": "jobs",
    "name": "Umbraix Jobs",
    "desc": "A free Jobs Reborn alternative",
    "price": 0,
    "downloads": 120,
    "category": "Economy",
    "version": "1.0.0",
    "premium": false
  }
]
````

---

## 🔐 PHASE 4: Premium Features & Authentication (Optional)

### 🔹 Goals

* Allow account-based access for premium plugins
* Basic login/register system with session management

### 🔧 Features

* [ ] Login/Logout functionality (`express-session`)
* [ ] Register page and form validation
* [ ] Role-based access (premium vs free)
* [ ] Block premium downloads unless logged in

---

## 🚀 PHASE 5: Admin & Upload System (Future Scope)

### 🛠 Admin Dashboard (Only for Umbraix Devs)

* [ ] Plugin upload form (Title, Description, Upload ZIP)
* [ ] Edit existing plugins
* [ ] Delete plugins
* [ ] Auto-update from GitHub/Webhooks (later)

---

## ✨ Deployment Readiness

### Final Checklist:

* [ ] Minify assets using PostCSS
* [ ] Add SEO tags + OpenGraph meta
* [ ] Add 404 and error handling middleware
* [ ] Compress responses with `compression`
* [ ] Host on Railway / Vercel / Render / VPS

---

## 💡 Bonus Ideas (For Later)

* Add client-side search with Fuse.js
* Track downloads with a lightweight analytics module
* Add blog or updates section for news on Umbraix Plugins

---

### 💬 Questions? Suggestions?

Submit issues via GitHub or email [dev@umbraix.org](mailto:dev@umbraix.org)
```
