// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://soulndahole.com', // IMPORTANTE: Sostituisci con il tuo dominio definitivo!
  integrations: [tailwind(), react(), sitemap()],
  vite: {
    envPrefix: ['CLOUDINARY_']
  }
});