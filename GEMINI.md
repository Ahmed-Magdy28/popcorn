# Popcorn - Movie Search & Watchlist App

A modern React application for searching movies using the OMDb API, viewing details, and managing a personal watchlist with ratings.

## 🚀 Project Overview

- **Frontend:** React 19, TypeScript, Vite
- **State Management:** Custom React Hooks for logic encapsulation
- **API:** OMDb API integration for movie data
- **Testing:** Vitest + React Testing Library
- **Linting/Formatting:** ESLint + Prettier

## 🛠 Building and Running

### Development
```bash
npm run dev
```
Starts the Vite development server.

### Build
```bash
npm run build
```
Compiles the application for production.

### Testing
```bash
npm run test
```
Runs the Vitest test suite.

### Linting
```bash
npm run lint
```
Runs ESLint to check for code quality and style issues.

## 📁 Architecture & Directory Structure

- `src/components/`: Atomized UI components.
    - `header/`: Components related to the navigation and search bar.
    - `main/`: Core application components including movie lists and details.
- `src/logic/`: Custom hooks that encapsulate business logic and side effects (e.g., fetching data, local storage).
- `src/data/`: Static data or initial states.
- `src/config.ts`: API keys, URLs, and other global constants.
- `src/helper.ts`: Utility functions and shared API fetching logic.
- `src/types.ts`: TypeScript interfaces and type definitions.

## 📝 Development Conventions

- **Logic Segregation:** Keep components focused on UI. Move complex state management, data fetching, and side effects into custom hooks in `src/logic/`.
- **API Fetching:** Use the `SetDataFromAPI` utility in `src/helper.ts` for consistent error handling and timeout management.
- **Component Patterns:**
    - Use functional components with arrow functions or traditional function declarations.
    - Prefer named exports for components and hooks.
- **Type Safety:** Maintain and update `src/types.ts` for all data structures. Avoid `any` where possible.
- **Testing:** Add tests for critical logic in hooks and UI components using Vitest and React Testing Library.
- **Styling:** Global styles are managed in `src/index.css`. Use CSS classes for styling rather than inline styles where possible.

## 🔑 Configuration

The application requires an OMDb API key. This is currently configured in `src/config.ts`.
- `ApiKey`: '236dabe5' (Default key, replace with your own if needed)
- `ApiUrl`: 'https://www.omdbapi.com/'
