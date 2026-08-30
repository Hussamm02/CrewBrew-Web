# CrewBrew Web

Premium specialty coffee equipment storefront and admin management platform.

---

## ☕ Overview

CrewBrew is a modern web application for specialty coffee gear, drippers, grinders, kettles, scales, and accessories, based in Jordan.

### Features
* **Dynamic Storefront:** Interactive catalog with instant search, brand pages, category filters, and product specifications.
* **Cart & WhatsApp Checkout:** Instant cart management with automated WhatsApp order message generator in JOD.
* **Supabase Cloud Backend:** Real-time database sync for products, brands, categories, and image assets with Row Level Security (RLS).
* **Admin Management Portal:** Dedicated dashboard at `/admin` (or `/admin.html`) for managing catalog items, stock status, specs, brand logos, and uploading assets to Supabase Storage.
* **Vercel Ready:** Pre-configured with `vercel.json` rewrites for seamless production deployment.
* **Responsive & Fast:** Custom vanilla CSS styling with dark aesthetic, micro-animations, and mobile drawer navigation.

---

## 🛠️ Project Structure

```
├── admin.html                    # Standalone Admin Portal
├── index.html                    # Storefront Entry Point
├── styles.css                    # Storefront Styles & Design System
├── vercel.json                   # Vercel Production Routing & Rewrites
├── vite.config.js                # Vite Multi-page Configuration
├── supabase_schema.sql           # Database Schema, Tables & RLS Policies
├── supabase_storage_policies.sql # Storage Bucket Policies
├── public/                       # Static Assets & Database Services
│   ├── logo.svg                  # Brand Vector Favicon & Logo
│   ├── db.js                     # Unified Data Layer (Local + Supabase REST)
│   ├── script.js                 # Storefront Routing & Interactions
│   ├── supabase-config.js        # Supabase Project Credentials
│   └── brands/                   # Brand & Product Imagery
└── dist/                         # Optimized Production Build Output
```

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)

### 2. Installation
```bash
git clone <your-repository-url>
cd "CrewBrew Web"
npm install
```

### 3. Local Development
Start the local development server:
```bash
npm run dev
```

* **Storefront:** `http://localhost:5173/`
* **Admin Portal:** `http://localhost:5173/admin.html`

---

## ☁️ Supabase Cloud Setup

1. **Schema Setup:**
   * Open the [Supabase SQL Editor](https://app.supabase.com/).
   * Run `supabase_schema.sql` to create tables (`brands`, `categories`, `products`, `product_variants`) and RLS policies.
   * Run `supabase_storage_policies.sql` to set up image storage permissions for the `crewbrew-assets` bucket.

2. **Configuration:**
   * Open `public/supabase-config.js` and verify your credentials:
   ```javascript
   window.CREWBREW_CONFIG = {
     supabaseUrl: 'https://<your-project>.supabase.co',
     supabasePublishableKey: '<your-anon-publishable-key>',
     cloudEnabled: true
   };
   ```

3. **Admin User:**
   * In the Supabase Dashboard, go to **Authentication** &rarr; **Users** &rarr; **Add User**.
   * Use those credentials to sign in at `/admin`.

---

## 🌐 Deploying to Vercel

### Option 1: Via GitHub (Recommended)
1. Push your repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/dashboard), click **"Add New Project"** and import the repository.
3. Vercel automatically detects the Vite framework and outputs to `dist/`.
4. Click **Deploy**.

### Option 2: Via Vercel CLI
```bash
npx vercel --prod
```

`vercel.json` ensures that `/admin` cleanly routes to `admin.html`.

---

## 📦 Production Build

To build the static production bundle into `dist/`:
```bash
npm run build
```
