# 🛒 ShopVault — React E-Commerce Dashboard

A complete authentication-based e-commerce dashboard built using **React, Vite, React Router, and Tailwind CSS**, featuring session management, product browsing, and a dynamic cart system.


---

## 📌 Features

### 🔐 Authentication
- User registration with name, email, password (stored in localStorage)
- Secure login with validation & error handling
- ⏳ **5-minute session timer** with live countdown
- Auto logout on session expiry
- Session persistence across refresh
- Protected routes (redirects to `/login`)

---

### 📊 Dashboard
- Personalized greeting (based on time of day)
- Session countdown alert (turns red under 1 minute)
- Quick stats: cart items & total
- Navigation shortcuts

---

### 🛍️ Products
- Data fetched from **DummyJSON API**
- Responsive product grid
- Product details: image, price, rating, category
- 🔍 Real-time search with debounce
- 🧩 Category filtering
- ♾️ Infinite scroll (IntersectionObserver)
- Loading skeletons & error handling
- "In Cart" indicator

---

### 🛒 Cart
- Add / remove products
- Quantity management
- Prevent duplicate entries
- Pricing breakdown:
  - Subtotal
  - Tax (8%)
  - Shipping (Free over $50)
- Persistent cart per user

---

### 👤 Profile
- View & edit user details
- Input validation
- Email uniqueness check

---

### 🎨 UI/UX
- 🌙 Dark / Light mode toggle
- Fully responsive design
- Toast notifications
- Clean typography & consistent theme

---

## 🧰 Tech Stack

- ⚛️ React 18 + Vite  
- 🔀 React Router v6  
- 🎨 Tailwind CSS  
- 📦 DummyJSON API  
- 🔔 react-hot-toast  
- 🎯 lucide-react  

---

## 📁 Project Structure
src/
├── context/
├── hooks/
├── components/
├── pages/
├── App.jsx
├── main.jsx
└── index.css



---

## ⚙️ Installation & Setup

```bash
npm install
npm run dev


🏗️ Build
npm run build


🌐 Deployment
Vercel
vercel
