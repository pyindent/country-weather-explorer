// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable globals like `test` and `describe`
    environment: 'jsdom', // Use jsdom for React testing
    setupFiles: './vitest.setup.ts', // Optional setup file
  },
});
