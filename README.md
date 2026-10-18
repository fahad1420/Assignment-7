# বাজার দর (Bazar Dor) — Daily Commodity Price Tracker

Bazar Dor is a full-stack web application built for **Programming Hero Assignment 7**. It helps users track and compare daily market prices of essential commodities and grocery items across different divisions and regional markets in Bangladesh.

---

## Live Links

- **Live Website:** [https://assignment-7-psi-three.vercel.app](https://assignment-7-psi-three.vercel.app)
- **GitHub Repository:** [https://github.com/fahad1420/Assignment-7](https://github.com/fahad1420/Assignment-7)

---

## Project Purpose

Commodity prices in local markets often vary from one district or market to another. The purpose of this project is to give buyers an easy, accessible way to check daily prices, see which items became more expensive or cheaper, compare rates across regional markets, and make informed shopping decisions.

---

## Key Features

- **Daily Market Overview & Ticker:** Hero section displaying daily market metrics and a moving price ticker showing top price movers.
- **Price Increases & Decreases:** Separate, automatically sorted sections highlighting items with price increases (▲) and price drops (▼).
- **Product Catalog & Category Filtering:** Browse daily staples (rice, lentils, oil, vegetables, fish, meat, eggs, spices) and filter by category.
- **Dynamic Price Sorting:** Sort products within categories from lowest to highest or highest to lowest price.
- **Market Price Comparison:** Dedicated product detail pages (`/product/[slug]`) comparing prices across different regional markets with calculated minimum, maximum, and average rates.
- **Authentication with Better Auth:**
  - Email and password registration and login with password visibility toggle.
  - Social login using Google and GitHub OAuth.
  - Automatic account linking for accounts sharing the same email.
- **Route Protection:** Protected routes (`/product/[slug]`, `/profile`, `/profile/update`) guarded by Edge Middleware that redirects unauthenticated visitors to `/signin?reason=protected`.
- **User Profile Management:** Protected profile page showing user details and a form to update display name.
- **Resilient Fallback Data Fetching:** Multi-endpoint fallback system that automatically switches to backup APIs if a primary endpoint fails.
- **Responsive Design & Error Handling:** Fully responsive layout for mobile, tablet, and desktop, with a localized custom 404 page and an error boundary with retry support.

---

## Technologies Used

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI & Styling:** React 19, Tailwind CSS 4, Lucide React
- **Database:** MongoDB Atlas (native `mongodb` driver)
- **Authentication:** Better Auth with `@better-auth/mongo-adapter`
- **Feedback:** React Hot Toast
- **Deployment:** Vercel

---

## Local Setup and Installation

Follow these steps to run the project locally on your machine:

### 1. Clone the repository

```bash
git clone https://github.com/fahad1420/Assignment-7.git
cd Assignment-7
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required credentials:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Better Auth configuration
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Configure OAuth Redirect URIs

When setting up Google and GitHub OAuth, make sure to add the appropriate callback URLs:

**Local Development:**
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

**Production:**
- Google: `https://assignment-7-psi-three.vercel.app/api/auth/callback/google`
- GitHub: `https://assignment-7-psi-three.vercel.app/api/auth/callback/github`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the local development server with Turbopack.
- `npm run build` — Creates an optimized production build.
- `npm run start` — Runs the compiled production build locally.
- `npm run lint` — Runs ESLint to check for code issues.
- `npx tsc --noEmit` — Runs the TypeScript compiler to verify types.
