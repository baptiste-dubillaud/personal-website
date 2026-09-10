// Canonical origin of the deployed site. Metadata, the sitemap and robots.txt
// all resolve against this rather than repeating the literal.
export const SITE_URL = "https://www.dubillaudb.fr";
// Bare domain, for places that display it as text rather than link to it.
export const SITE_DOMAIN = new URL(SITE_URL).host.replace(/^www\./, "");

export const CONTACT_EMAIL = "contact@dubillaudb.fr";

export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/baptiste-dubillaud/";
export const GITHUB_PROFILE = "https://github.com/baptiste-dubillaud";
export const MEDIUM_PROFILE = "https://medium.com/@baptiste.dubillaud";
export const STRAVA_PROFILE = "https://www.strava.com/athletes/10097604";

export const BLOG_FOLDER_PATH = "public/blog/";

// The PDF resume, one file per locale, in `public/resume/`. Both the resume page
// (download link) and the sitemap (which advertises them to crawlers) resolve
// the name through here, so a rename cannot leave one of them pointing at a 404.
export const resumePdfFile = (locale) => `resume_dubillaud_baptiste_freelance_${locale}.pdf`;
export const resumePdfPath = (locale) => `/resume/${resumePdfFile(locale)}`;
