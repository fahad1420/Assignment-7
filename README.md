# Assignment 7 — Daily Commodity Market Tracker

A modern, responsive full-stack web application built with **Next.js 16**, **React 19**, **MongoDB**, and **Better Auth** to monitor and analyze daily commodity and grocery market prices in Bangladesh.

The application aggregates real-time price reports across 8 divisions and 12 major markets, calculating minimum, maximum, and average market rates, daily price fluctuations (increases and decreases), and category-level trends.

---

## Live Links

- **Production Deployment:** [https://assignment-7.vercel.app](https://assignment-7.vercel.app) *(or your deployed Vercel URL)*
- **GitHub Repository:** [https://github.com/fahad1420/Assignment-7](https://github.com/fahad1420/Assignment-7)

---

## Key Features

- **Daily Market Summary & Price Ticker:** Live headline ticker and hero overview showing key commodity price changes.
- **Price Fluctuation Sections:** Automatically sorted sections highlighting products with daily price increases (▲) and price drops (▼).
- **Comprehensive Product Catalog:** Browse complete catalog of grocery staples including rice, lentils, edible oils, vegetables, fish, meat, eggs, dairy, and spices.
- **Category Filtering & Sorting:** Filter products by category and sort dynamically by price (lowest to highest, highest to lowest).
- **Detailed Market Analysis:** Dynamic product detail pages (`/product/[slug]`) comparing prices across different regional markets with minimum, maximum, and average calculations.
- **Multi-Provider Authentication:**
  - Secure Email/Password registration and sign-in.
  - Social authentication with **Google OAuth** and **GitHub OAuth**.
  - Secure automatic account linking across providers sharing the same email.
- **Protected User Profile:**
  - Server-side route protection redirecting unauthenticated visitors to `/signin?reason=protected`.
  - Profile overview displaying name, email, avatar image (supporting GitHub and Google remote avatars), and a fallback avatar.
  - Profile update page (`/profile/update`) to update display name.
- **Resilient Fallback API Integration:** Robust multi-endpoint fallback architecture ensuring zero-downtime data fetching across primary and backup sources.
- **Responsive & Accessible UI:** Optimized for mobile, tablet, and desktop screens with semantic HTML, loading skeletons, and interactive toast feedback.

---

## Technology Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication:** [Better Auth](https://better-auth.com/) (with `@better-auth/mongo-adapter`)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (`mongodb` driver)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Deployment Platform:** [Vercel](https://vercel.com/)

---

## Project Structure

```text
├── public/                 # Static assets (logos, illustrations)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/  # Better Auth API catch-all handler
│   │   ├── category/[slug]/    # Category product filtering page
│   │   ├── product/[slug]/     # Product details & market comparison page
│   │   ├── profile/            # Protected user profile page
│   │   │   └── update/         # Profile name update page
│   │   ├── signin/             # User sign-in page
│   │   ├── signup/             # User sign-up page
│   │   ├── globals.css         # Global stylesheet & design system
│   │   ├── layout.tsx          # Root layout with navigation & providers
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── page.tsx            # Home page with hero, trends & product catalog
│   ├── components/         # Reusable UI components (header, footer, auth form, product card)
│   └── lib/                # Core utilities, Better Auth config, MongoDB client, API fetchers
├── .env.example            # Template for environment variables
├── next.config.ts          # Next.js configuration (images remotePatterns, Turbopack)
├── package.json            # Project dependencies and npm scripts
└── tsconfig.json           # TypeScript configuration
```

---

## Prerequisites

- **Node.js:** v20.x or later (tested on Node v24.x)
- **npm:** v10.x or later
- **MongoDB Atlas:** Cluster with active database user and Network Access allowlist (e.g. `0.0.0.0/0`).
- **Google Cloud Console:** OAuth 2.0 Web Client credentials.
- **GitHub Developer Settings:** OAuth App credentials.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/fahad1420/Assignment-7.git
cd Assignment-7
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a local environment file from `.env.example`:

```bash
cp .env.example .env.local
```

Populate the required credentials in `.env.local`:

```env
# MongoDB Atlas Connection
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bazardor?retryWrites=true&w=majority"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_secure_random_secret_string"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth Credentials
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

#### OAuth Redirect / Callback URLs:

| Provider | Local Callback URL | Production Callback URL |
|---|---|---|
| **Google** | `http://localhost:3000/api/auth/callback/google` | `https://<your-vercel-domain>/api/auth/callback/google` |
| **GitHub** | `http://localhost:3000/api/auth/callback/github` | `https://<your-vercel-domain>/api/auth/callback/github` |

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available NPM Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Runs the Next.js development server with Turbopack |
| `build` | `npm run build` | Builds the optimized production application |
| `start` | `npm run start` | Runs the compiled production server |
| `lint` | `npm run lint` | Runs ESLint to check for code quality and style issues |

---

## Verification & Code Quality

Run the following checks to ensure code integrity:

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build test
npm run build
```

---

## Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. Import the project on [Vercel](https://vercel.com/new).
3. Set the **Framework Preset** to **Next.js**.
4. Configure all environment variables in the Vercel Dashboard under **Project Settings > Environment Variables**:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (set to your production Vercel domain, e.g. `https://assignment-7.vercel.app`)
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
5. Ensure your MongoDB Atlas cluster has network access enabled for `0.0.0.0/0` so Vercel serverless functions can connect.
6. Deploy the project.
