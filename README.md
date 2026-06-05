# Inditex Mobile Shop

A single-page application for browsing and purchasing mobile devices.
Built as part of a frontend technical assessment.

## Prerequisites

- Node.js 24+
- npm 10+

## Installation

```bash
npm install
```

## Scripts

| Script | Description |
|---|---|
| `npm start` | Start the development server |
| `npm run build` | Build for production |
| `npm test` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## Tech Stack

- React 19 + Vite
- React Router v7
- Vitest + React Testing Library
- CSS Modules
- ESLint + Prettier

## Project Structure

```
src/
  api/           API client and cache layer
  components/    Shared UI components
  pages/         Application views (PLP, PDP)
  hooks/         Custom React hooks
  context/       Global state providers
  utils/         Helper functions
  styles/        Global styles and CSS variables
  test/          Test setup and utilities
```

## API

Base URL: `https://itx-frontend-test.onrender.com`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/product` | Fetch all products |
| GET | `/api/product/:id` | Fetch product detail |
| POST | `/api/cart` | Add product to cart |

## Notes

- API responses are cached client-side with a 1-hour TTL
- Cart count is persisted in localStorage and restored on page load
- Search filters products in real time by brand and model
