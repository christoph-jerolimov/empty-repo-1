// Prefixes a site-absolute path with Astro's configured base, so links keep
// working when the site is served from a sub-path (e.g. GitHub project pages).
export function url(path: string): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
