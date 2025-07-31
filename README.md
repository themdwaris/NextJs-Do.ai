# Do.ai - AI Powered Creativity Platform

Do.ai is a fully responsive, modern web application that offers a suite of AI-powered tools for image generation, background/object removal, article and blog titles generation and resume analysis. Built using the latest technologies, Do.ai provides a seamless user experience with authentication, real-time feedback, and beautiful UI components.

* Generate stunning images based on prompts
* Generate high-quality articles
* Generate creative blog titles
* Remove objects or background from uploaded images
* Upload and get AI feedback on resumes
* Like and publish creations
* Download generated images with one click

---

## 🚀 Features

### ✅ AI Image Generation

* Generate images in various styles: Realistic, Anime, Ghibli, 3D, etc.
* Toggle public/private creation visibility
* One-click download functionality for generated images

### ✅ AI Article Generation

* Generate high-quality articles based on any topic or keyword
* Supports token length customization

### ✅ Blog Title Generator

* Get creative blog title suggestions using AI from a provided topic

### ✅ Resume Review

* Upload a PDF resume and receive AI-generated constructive feedback

### ✅ Object & Background Removal

* Remove specific objects from images using AI
* Remove background from uploaded images

### ✅ Like & Publish

* Like and unlike any published creation
* Mark your own content as public for others to view

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* React (with client/server components)
* Tailwind CSS
* Clerk (for authentication)
* Axios
* React Hot Toast (for alerts)

### Backend / API

* OpenAI / Gemini AI for content generation
* Cloudinary (for image upload/transformation)
* PDF-Parse (for reading resumes)
* PostgreSQL (via Neon) for database
* SQL tagged template via `@vercel/postgres`

---

## 📁 Folder Structure

```
app/
├── api/
│   ├── generate-img/
│   ├── generate-article/
│   ├── generate-title/
│   ├── remove-bg/
│   ├── remove-obj/
│   └── resume-review/
├── components/
│   ├── Loader.jsx
│   ├── Navbar.jsx
├── assets/
│   └── assets.js
├── config/
│   ├── cloudinary.js
│   └── db.js
├── page.jsx
├── layout.jsx
```

---

## 🧑‍💻 How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/doai.git
cd doai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root with the following:

```env
CLERK_SECRET_KEY=your_key
CLERK_PUBLISHABLE_KEY=your_key
GEMINI_API_KEY=your_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
DATABASE_URL=your_neon_or_postgres_url
```

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📸 Screenshots

* Coming soon!

---

Made with ❤️ by \[Mohammad Waris]
