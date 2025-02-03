import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    base: './',
    outDir: 'dist', // Ensures files are placed in dist/
    minify: false,  // Prevents over-optimization
    rollupOptions: {
      treeshake: false,  // Ensures elements are not removed
    }
  }
});