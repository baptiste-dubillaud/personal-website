import { getLocale, getTranslations } from "next-intl/server";

import { LOCALES } from "@/i18n/locales";
import { BLOG_ENABLED } from "@/utils/featureFlags";
import {
    CONTACT_EMAIL,
    GITHUB_PROFILE,
    LINKEDIN_PROFILE,
    resumePdfPath,
    SITE_URL,
} from "@/utils/linkUtils";
import { collectSkills } from "@/utils/structuredData";
import { readVersionDate } from "@/utils/versionUtils";

/**
 * `/llms.txt` — the plain-text summary an LLM fetcher reads instead of rendering
 * the site.
 *
 * A route rather than a file in `public/`, for the same reason `sitemap.js` and
 * `robots.js` are routes: everything here already exists in the message files,
 * and a hand-maintained copy would drift the moment an experience is added. The
 * only literals below are the section headings.
 *
 * The *content* follows the served locale like every other route — the site
 * resolves the language from the cookie / `Accept-Language`, and there is no
 * locale prefix to give each language its own address. In practice a crawler
 * sends no `Accept-Language` and gets `DEFAULT_LOCALE`.
 *
 * The *scaffolding* (headings, field labels) stays English in both, on purpose:
 * it is the part a machine keys off, and the llms.txt convention is written in
 * English. Translating it would only make the file harder to parse without
 * telling a reader anything the content does not already say.
 */

/** Message strings carry `<bold>` markup for RichText; plain text wants none. */
const stripMarkup = (text) => String(text).replace(/<\/?bold>/g, "");

const dateRange = (start, end) => (end ? `${start} – ${end}` : start);

/** First paragraph of a `descriptions` array, as one line. */
function firstParagraph(descriptions = []) {
    const paragraph = descriptions.find((block) => block?.type === "paragraph");
    return paragraph ? stripMarkup(paragraph.content) : null;
}

function experienceLines(experiences) {
    const lines = [];

    for (const experience of experiences) {
        const where = [experience.company, experience.location].filter(Boolean).join(", ");
        lines.push(
            `- **${experience.title}** — ${where} (${dateRange(experience.start_date, experience.end_date)})`
        );

        const summary = firstParagraph(experience.descriptions);
        if (summary) lines.push(`  ${summary}`);

        // Sub-missions of one continuous role (the freelance entry): they are the
        // actual engagements, so they matter more than the parent's summary.
        for (const client of experience.clients || []) {
            const role = [client.name, client.role].filter(Boolean).join(" — ");
            lines.push(`  - ${role} (${dateRange(client.start_date, client.end_date)})`);

            const clientSummary = firstParagraph(client.descriptions);
            if (clientSummary) lines.push(`    ${clientSummary}`);
        }
    }

    return lines;
}

function educationLines(education) {
    return education.map((entry) => {
        const where = [entry.company, entry.location].filter(Boolean).join(", ");
        return `- **${entry.title}** — ${where} (${dateRange(entry.start_date, entry.end_date)})`;
    });
}

export async function GET() {
    const locale = await getLocale();
    const [site, nav, resume, contact] = await Promise.all([
        getTranslations("metadata"),
        getTranslations("navigation"),
        getTranslations("pages.resume"),
        getTranslations("pages.contact"),
    ]);

    const experiences = resume.raw("experiences");
    const education = resume.raw("education");
    const skills = collectSkills(experiences);
    const languages = Object.keys(LOCALES).join(", ");

    const body = [
        "# Baptiste Dubillaud",
        "",
        `> ${site("description")}`,
        "",
        resume("prensentation.intro"),
        "",
        `- Role: ${resume("prensentation.title")}`,
        `- Location: Pau, France`,
        `- Email: ${CONTACT_EMAIL}`,
        `- Site languages: ${languages} (served from the \`NEXT_LOCALE\` cookie or \`Accept-Language\`; the URLs below are the same in both)`,
        `- Last updated: ${readVersionDate()}`,
        "",
        "## Pages",
        "",
        `- [${nav("home")}](${SITE_URL}/): profile, role and links.`,
        `- [${nav("resume")}](${SITE_URL}/resume): full experience, education and interests.`,
        `- [${nav("contact")}](${SITE_URL}/contact): ${contact("subtitle")}`,
        ...(BLOG_ENABLED ? [`- [${nav("blog")}](${SITE_URL}/blog): articles.`] : []),
        "",
        "## CV (PDF)",
        "",
        ...Object.keys(LOCALES).map(
            (code) => `- [${LOCALES[code].label}](${SITE_URL}${resumePdfPath(code)}): text-extractable PDF resume.`
        ),
        "",
        "## Experience",
        "",
        ...experienceLines(experiences),
        "",
        "## Education",
        "",
        ...educationLines(education),
        "",
        "## Skills",
        "",
        skills.join(", "),
        "",
        "## Profiles",
        "",
        `- [LinkedIn](${LINKEDIN_PROFILE})`,
        `- [GitHub](${GITHUB_PROFILE})`,
        "",
    ].join("\n");

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Language": locale,
        },
    });
}
