# usePopcorn 🎬

usePopcorn is a React + TypeScript application for searching movies and maintaining a list of watched movies along with user ratings.

## Features ✨

- **Search Movies:** Instantly search for any movie using the OMDB API.
- **Movie Details:** View detailed information including plot, actors, director, genre, runtime, and IMDB rating.
- **Watched List:** Add movies to your watched list and keep track of your personal star ratings.
- **Local Storage Support:** Your watched movies and ratings are saved in the browser's local storage and persist across reloads.
- **Custom Star Rating System:** A reusable and fully typed Star Rating component.
- **Fully Responsive:** Optimized for desktop, tablet, and mobile devices.

## Tech Stack 🛠️

- **React 19**
- **TypeScript**
- **Vite**
- **CSS3 / Flexbox & Grid**

## Setup & Running Locally 🚀

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Improvements Made
- Fixed completely missing and implicit `any` types throughout the TypeScript codebase.
- Enforced strict ESLint and Prettier rules to keep code clean and readable.
- Updated `index.css` with responsive media queries for screens between 600px - 900px and mobile screens under 600px.
