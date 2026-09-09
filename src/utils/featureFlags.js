/**
 * Site-wide feature flags.
 *
 * The blog ships with the codebase but is held back from the 2.1 release: the
 * navigation entry is hidden, `/blog` and `/blog/<slug>` answer 404, and no blog
 * URL is advertised in the sitemap. Flipping this back to `true` restores all
 * three — nothing else has to change, and `public/blog/` is left untouched.
 */
export const BLOG_ENABLED = false;
