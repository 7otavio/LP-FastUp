import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath, URL } from 'node:url';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://sejafastup.com.br',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [react()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  },
});
