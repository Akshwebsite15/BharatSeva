import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('/lucide-react/')) {
                return 'vendor-icons';
              }
              if (id.includes('/motion/')) {
                return 'vendor-motion';
              }
              if (
                id.includes('/react/') ||
                id.includes('/react-dom/') ||
                id.includes('/scheduler/')
              ) {
                return 'vendor-react';
              }
              return 'vendor-libs';
            }
            if (id.includes('src/data/coursesData')) {
              return 'data-courses';
            }
            if (id.includes('src/data/admissionsData')) {
              return 'data-admissions';
            }
            if (id.includes('src/data/collegesUniversitiesData')) {
              return 'data-colleges-universities';
            }
            if (id.includes('src/data/examHubData')) {
              return 'data-exam-hub';
            }
            if (id.includes('src/data/cmsInitialData')) {
              return 'data-cms-initial';
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
