# First Project

A modern React application built with Vite, featuring Firebase integration, React Router, and IndexedDB for local storage.

## Project Overview

This is a full-featured React application that demonstrates:
- Component-based architecture
- Client-side routing
- Firebase authentication and database integration
- Local data persistence with IndexedDB
- Modern build tooling with Vite

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **Backend**: Firebase 12.8.0
- **Local Storage**: IndexedDB (idb 8.0.3)
- **Linting**: ESLint 9.39.1
- **Node Version**: ES Module (type: "module")

## Project Structure

```
src/
├── components/       # Reusable React components
├── pages/           # Page components for routing
├── auth/            # Authentication logic
├── firebase/        # Firebase configuration and utilities
├── utils/           # Utility functions
├── assets/          # Static assets
├── App.jsx          # Main App component
├── App.css          # App styles
├── index.css        # Global styles
└── main.jsx         # React DOM entry point
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Available Scripts

### Development Server
```bash
npm run dev
```
Starts the Vite development server. Open [http://localhost:5173](http://localhost:5173) to view in the browser.

### Build for Production
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build.

### Lint Code
```bash
npm lint
```
Runs ESLint to check code quality.

## Features

- **Responsive UI**: Mobile-friendly design
- **Client-side Routing**: Seamless navigation with React Router
- **Firebase Integration**: Real-time database and authentication
- **Persistent Storage**: Local data storage with IndexedDB
- **Modern JavaScript**: ES6+ with module support
- **Code Quality**: ESLint configuration for consistent code style

## Firebase Configuration

Update your Firebase credentials in `src/firebase/` directory with your project configuration.

## Development Notes

- Hot Module Replacement (HMR) enabled by default in dev mode
- ESLint rules configured for React and React Hooks best practices
- Type definitions available for TypeScript support

## License

ISC