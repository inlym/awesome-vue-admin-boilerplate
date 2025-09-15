# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 admin boilerplate built with modern tooling including Vite, TypeScript, Pinia for state management, Vue Router for routing, and Tailwind CSS with SCSS for styling.

## Development Commands

### Setup and Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
# Runs Vite dev server with hot reload and opens browser automatically
```

### Build and Production

```bash
pnpm build
# Runs type checking and builds for production (parallel execution)

pnpm build-only
# Builds without type checking

pnpm preview
# Preview production build locally
```

### Code Quality and Linting

```bash
pnpm type-check
# Run Vue TypeScript compiler for type checking

pnpm lint
# Run ESLint with auto-fix enabled

pnpm format
# Format source code with Prettier
```

## Architecture and Project Structure

### Core Technologies

- **Vue 3**: Uses Composition API with `<script setup>` syntax
- **TypeScript**: Strict type checking enabled with project references
- **Pinia**: State management using composable stores pattern
- **Vue Router**: Client-side routing with lazy loading support
- **Vite**: Build tool with HMR and optimized bundling
- **Tailwind CSS v4**: Utility-first CSS framework (latest version)
- **SCSS**: CSS preprocessor integrated with Tailwind

### Source Structure

```text
src/
├── main.ts              # App entry point, mounts Vue app with Pinia and Router
├── App.vue              # Root component with RouterView
├── assets/              # Static assets and global styles
│   └── main.scss        # Global SCSS with Tailwind imports
├── components/          # Reusable Vue components
│   ├── HelloWorld.vue   # Example component
│   └── icons/           # SVG icon components
├── router/              # Vue Router configuration
│   └── index.ts         # Routes definition with lazy loading
├── stores/              # Pinia stores
│   └── counter.ts       # Example store using composition API
└── views/               # Page-level components
    ├── HomeView.vue
    └── AboutView.vue
```

### Configuration Files

- **vite.config.ts**: Vite configuration with Vue plugin and path aliases (@/ → src/)
- **eslint.config.ts**: ESLint with Vue and TypeScript rules, Prettier integration
- **tailwind.config.ts**: Tailwind CSS configuration for content scanning
- **postcss.config.ts**: PostCSS with Tailwind and Autoprefixer
- **tsconfig.json**: TypeScript project references setup
- **tsconfig.app.json**: App-specific TypeScript configuration
- **tsconfig.node.json**: Node.js TypeScript configuration

### State Management Pattern

Stores use Pinia's composition API pattern with `defineStore()` and return reactive refs and functions. Example pattern:

```typescript
export const useStoreNameStore = defineStore('storeName', () => {
  const state = ref(initialValue)
  const computed = computed(() => derivedValue)
  function action() {
    /* mutations */
  }
  return { state, computed, action }
})
```

### Styling Architecture

- Global styles in `src/assets/main.scss` with Tailwind directives
- Component-scoped styles using `<style scoped>`
- Tailwind v4 utilities available throughout
- SCSS preprocessing for complex styling needs
- CSS custom properties for theme variables

### Build Process

The build uses TypeScript project references for faster compilation and runs type checking in parallel with the Vite build process using `npm-run-all2`.

### Code Standards

- **ESLint**: Vue recommended rules + TypeScript + Prettier formatting
- **Prettier**: Single quotes, no semicolons, 100 character line length
- **EditorConfig**: 2-space indentation, UTF-8, LF line endings
- **TypeScript**: Strict mode enabled with path mapping for `@/` alias
