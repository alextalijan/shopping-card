import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows using test functions (describe, it, expect) without importing
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js', // Or './tests/setup.ts' for TypeScript
  },
});
