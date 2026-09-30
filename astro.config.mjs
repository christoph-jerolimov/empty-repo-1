import { defineConfig } from 'astro/config';

// Fully static site: every project gets its own prerendered page under /dwg/.
export default defineConfig({
  output: 'static',
});
