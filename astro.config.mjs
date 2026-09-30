import { defineConfig } from 'astro/config';

// On GitHub Actions, derive the Pages URL from the repository name so a
// project site (owner.github.io/repo) gets the right base path. Locally the
// site is served from `/`.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo === `${owner}.github.io`;

// Fully static site: every project gets its own prerendered page under /dwg/.
export default defineConfig({
  output: 'static',
  site: owner ? `https://${owner}.github.io` : undefined,
  base: owner && !isUserSite ? `/${repo}` : undefined,
});
