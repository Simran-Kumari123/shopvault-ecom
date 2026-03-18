# ShopVault — React E-Commerce Dashboard

A complete authentication-based e-commerce dashboard built with React, Vite, React Router, and Tailwind CSS.

## Features

### Auth
- Register with name, email, password (stored in `localStorage`)
- Login with email/password validation + error messages
- **5-minute session timer** with live countdown in sidebar
- Auto-logout on session expiry with toast notification
- Session persisted across page refresh
- All routes protected — redirects to `/login` if not authenticated

### Dashboard
- Welcome message with user's first name + time-based greeting
- Session countdown banner (turns red when < 1 min remaining)
- Quick stats: cart count, cart total
- Quick action cards to navigate the app

### Products
- Fetches from **DummyJSON API** (`https://dummyjson.com/products`)
- Responsive grid (2 → 3 → 4 columns)
- Product cards: image, title, category, price, rating, discount badge
- **Real-time search** with debounce
- **Category filter** dropdown
- **Infinite scroll** (IntersectionObserver)
- Loading skeletons & error handling
- "In Cart" indicator on cards

### Cart
- Add / remove items
- Increase / decrease quantity (remove if quantity hits 0)
- Prevent duplicate adds (increases quantity instead)
- Subtotal per item, tax (8%), shipping (free over $50), grand total
- Cart persisted per user in localStorage
- Empty state with CTA

### Profile
- View name, email, account ID
- Edit name, email, password
- Validation on all fields
- Email uniqueness check across accounts

### UI / UX
- **Dark / Light mode** toggle (persisted)
- Fully responsive (mobile sidebar, tablet, desktop)
- Toast notifications (react-hot-toast)
- Playfair Display + DM Sans typography
- Consistent orange brand palette

## Tech Stack

- **React 18** + **Vite**
- **React Router v6** (nested routes, protected routes)
- **Tailwind CSS v3** (utility-only, custom config)
- **DummyJSON API** (free, no auth required)
- **react-hot-toast** for notifications
- **lucide-react** for icons

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx      # Auth state, session logic
│   ├── CartContext.jsx      # Cart state, localStorage sync
│   └── ThemeContext.jsx     # Dark/light mode
├── hooks/
│   ├── useProducts.js       # Fetch, search, filter, infinite scroll
│   └── useSessionTimer.js   # Live countdown timer
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   └── layout/
│       └── Layout.jsx       # Sidebar + mobile navbar
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   └── Profile.jsx
├── App.jsx                  # Router setup
├── main.jsx
└── index.css
```

## Setup & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deploy

### Vercel
```bash
npm i -g vercel
vercel
```
`vercel.json` handles SPA routing automatically.

### Netlify
Drag & drop the `dist/` folder into Netlify, or connect the repo.
`netlify.toml` handles SPA routing automatically.

## Bonus Features Implemented
- ✅ Infinite scroll on products
- ✅ Product search + category filter
- ✅ Dark / Light mode
- ✅ Toast notifications (react-hot-toast)
- ✅ Session persisted on page refresh
- ✅ Custom hooks: `useProducts`, `useSessionTimer`
