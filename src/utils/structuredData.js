/**
 * schema.org graph for the site.
 *
 * Split the way the blog splits its metadata: the *language-invariant* facts
 * (organisations, ISO date ranges, profile URLs) live here, and the translated
 * strings (job title, summary) are passed in by the caller from the message
 * files. The dates in those files are localised display labels ("SEPT. 2020",
 * "SEPT. 2020"), so they cannot be parsed back into the ISO dates schema.org
 * expects — hence the explicit table below. Anything that *is* language
 * invariant inside the messages (the tech stacks) is derived rather than
 * repeated, so it cannot drift.
 *
 * Every page emits the core Person; /resume emits the detailed one. Both carry
 * the same `@id`, so a consumer merges them into one entity instead of seeing
 * two different people with the same name.
 */

import {
    CONTACT_EMAIL,
    GITHUB_PROFILE,
    LINKEDIN_PROFILE,
    SITE_URL,
    STRAVA_PROFILE,
} from "@/utils/linkUtils";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const NAME = "Baptiste Dubillaud";

// Employment history, oldest last. `end` omitted means "still ongoing", which is
// exactly how schema.org reads a missing endDate.
const POSITIONS = [
    { role: "Freelance Tech-Lead & AI Software Engineer", org: "Self-employed", start: "2026-04" },
    { role: "Senior Software Engineer", org: "ThinkDeep AI", start: "2025-04", end: "2026-04" },
    { role: "Tech Lead & Full-Stack Engineer", org: "TotalEnergies Denmark", start: "2023-03", end: "2025-03" },
    { role: "Software Engineer", org: "Airbus Defense & Space", start: "2021-10", end: "2023-02" },
    { role: "Software Engineer", org: "TotalEnergies", start: "2020-09", end: "2021-09" },
];

const EDUCATION = [
    { name: "CY-Tech", start: "2018", end: "2021" },
    { name: "University of La Coruña", start: "2020", end: "2021" },
    { name: "Saint-Cricq High School", start: "2016", end: "2018" },
];

/**
 * Flatten every tech mentioned in the resume into a de-duplicated list.
 */
export function collectSkills(experiences = []) {
    const skills = new Map();

    const addStack = (stack = []) => {
        for (const category of stack) {
            for (const label of category || []) {
                for (const tech of String(label).split(",")) {
                    const trimmed = tech.trim();
                    const key = trimmed.toLowerCase();
                    if (trimmed && !skills.has(key)) skills.set(key, trimmed);
                }
            }
        }
    };

    for (const experience of experiences) {
        addStack(experience.stack);
        for (const client of experience.clients || []) addStack(client.stack);
    }

    return [...skills.values()];
}

/**
 * The Person node. `history` is optional: pages other than the resume emit the
 * core identity only, keeping their JSON-LD small, while /resume adds the
 * employment and education detail under the same `@id`.
 */
export function buildPerson({ jobTitle, description, history }) {
    const person = {
        "@type": "Person",
        "@id": PERSON_ID,
        name: NAME,
        givenName: "Baptiste",
        familyName: "Dubillaud",
        url: SITE_URL,
        image: `${SITE_URL}/images/profile.png`,
        jobTitle,
        description,
        email: `mailto:${CONTACT_EMAIL}`,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Pau",
            addressRegion: "Nouvelle-Aquitaine",
            addressCountry: "FR",
        },
        nationality: { "@type": "Country", name: "France" },
        knowsLanguage: [
            { "@type": "Language", name: "French", alternateName: "fr" },
            { "@type": "Language", name: "English", alternateName: "en" },
        ],
        sameAs: [LINKEDIN_PROFILE, GITHUB_PROFILE, STRAVA_PROFILE],
    };

    if (!history) return person;

    const { skills = [] } = history;

    return {
        ...person,
        ...(skills.length > 0 && { knowsAbout: skills }),
        hasOccupation: {
            "@type": "Occupation",
            name: jobTitle,
            occupationLocation: { "@type": "City", name: "Pau, France" },
            ...(skills.length > 0 && { skills: skills.join(", ") }),
        },
        // OrganizationRole is the schema.org way to date an employment
        // relationship; a plain Organization list would read as "works at all
        // five of these today".
        worksFor: POSITIONS.map((position) => ({
            "@type": "OrganizationRole",
            roleName: position.role,
            startDate: position.start,
            ...(position.end && { endDate: position.end }),
            worksFor: { "@type": "Organization", name: position.org },
        })),
        alumniOf: EDUCATION.map((school) => ({
            "@type": "EducationalOrganization",
            name: school.name,
        })),
    };
}

export function buildWebSite(locale) {
    return {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: NAME,
        inLanguage: locale,
        publisher: { "@id": PERSON_ID },
    };
}

/** Wrap nodes into the single `@graph` document a page embeds. */
export function toJsonLd(nodes) {
    return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
