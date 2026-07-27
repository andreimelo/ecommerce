# Melo Ecommerce (Full Stack)

Melo Ecommerce is a full-stack ecommerce platform with a React frontend and an Express/MongoDB backend.

This root README is the main entry point for running and understanding the entire repository.

## Overview

- Customer storefront with category browsing and product detail pages.
- Authentication flow using Firebase + backend session logic.
- Cart, checkout, and Stripe payment integration.
- Product ratings/reviews with review image upload support.
- Wishlist, orders, and account pages.
- AI shopping assistant endpoint and chat widget integration.
- Admin routes for product, category, coupon, and account management.

## Repository Structure

```text
ecommerce/
├── client/                # React app (CRA + Tailwind)
│   ├── src/
│   │   ├── pages/         # Auth, admin, user, storefront pages
│   │   ├── library/       # Shared components/services/hooks/helpers
│   │   └── resources/     # Images, icons, styles
│   └── README.md          # Client-focused notes
├── server/                # Express API
│   └── src/
│       ├── controllers/   # Route handlers
│       ├── models/        # Mongoose models
│       ├── routes/v1/     # API routes mounted under /api/v1
│       ├── middlewares/   # Auth, CSRF, security middleware
│       ├── config/        # Env/config bootstrapping
│       └── loaders/       # Server startup loaders
├── package.json           # Root helper scripts
└── README.md              # This file
```

## Tech Stack

### Frontend

- React 18
- React Router v5
- Redux
- Tailwind CSS
- Firebase Web SDK
- Stripe JS + React Stripe

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK
- JWT + cookie/session flow
- CSRF protection
- Cloudinary (image uploads)
- Stripe API

## API Base Path

Backend routes are mounted under:

`/api/v1`

Main route groups:

- `/api/v1/auth`
- `/api/v1/user`
- `/api/v1/product`
- `/api/v1/category`
- `/api/v1/sub-category`
- `/api/v1/coupon`
- `/api/v1/admin`
- `/api/v1/cloudinary`
- `/api/v1/stripe`
- `/api/v1/ai`

## Environment Variables

### Server (`server/.env`)

Core:

- `PORT` (default fallback: `8000`)
- `MONGODB_URI`
- `FIREBASEDB_URI` (if used in your environment)
- `JWT_SECRET`

Firebase Admin:

- `FIREBASE_TYPE`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_CLIENT_ID`
- `FIREBASE_AUTH_URI`
- `FIREBASE_TOKEN_URI`
- `FIREBASE_AUTH_PROVIDER_X509`
- `FIREBASE_CLIENT_X509`

Cloudinary:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Stripe:

- `STRIPE_API_SECRET`

### Client (`client/.env`)

Core:

- `REACT_APP_BASE_URL` (example: `http://localhost:8000/api/v1`)
- `REACT_APP_UNDER_MAINTENANCE`
- `REACT_GEOLOCATION_URL`

Firebase Web:

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGE_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`
- `REACT_APP_FIREBASE_MEASUREMENT_ID`

Auth redirects:

- `REACT_APP_REGISTER_COMPLETE_REDIRECT_URL`
- `REACT_APP_FORGOT_PASSWORD_REDIRECT_URL`

Stripe:

- `REACT_APP_STRIPE_API_KEY`

## Setup and Run

### 1) Install dependencies

From repo root:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2) Start backend

Option A (from root, using helper script):

```bash
npm run service
```

Option B (from `server`):

```bash
npm run dev
```

or

```bash
npm run start
```

### 3) Start frontend

From `client`:

```bash
npm start
```

Frontend URL:
http://localhost:3000

## Build

From `client`:

```bash
npm run build
```

The production output is generated in `client/build`.

## Script Reference

### Root (`package.json`)

- `npm run service` -> installs yarn packages and runs backend loader.

### Client (`client/package.json`)

- `npm start`
- `npm run build`
- `npm test`
- `npm run eject`

### Server (`server/package.json`)

- `npm run dev`
- `npm run start`

## Notes

- Keep backend port and `REACT_APP_BASE_URL` aligned.
- Client base URL normalization falls back to `http://localhost:8000/api/v1` if not set.
- This repository includes both `package-lock.json` and `yarn.lock`; use one package manager consistently in your workflow.
