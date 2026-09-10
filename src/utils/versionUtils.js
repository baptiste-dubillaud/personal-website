import fs from "fs";
import path from "path";

/**
 * `public/version.txt` is the release log — one line per release, appended at
 * release time, e.g.
 *
 *   2.1 - Updated NextJS + small fixes: 10/09/2026
 *
 * The last line is the current release. The footer shows the label, the sitemap
 * uses the date: it is the only real "last modified" signal the site has, and it
 * beats `new Date()`, which told crawlers every page changed today, every day.
 */

const FALLBACK_VERSION = "1.0";

function readLastReleaseLine() {
    try {
        const file = path.join(process.cwd(), "public", "version.txt");
        if (!fs.existsSync(file)) return null;

        const lines = fs
            .readFileSync(file, "utf8")
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

        return lines.length > 0 ? lines[lines.length - 1] : null;
    } catch {
        return null;
    }
}

/** Release label as shown in the footer (everything before the date). */
export function readVersion() {
    const line = readLastReleaseLine();
    if (!line) return FALLBACK_VERSION;

    const separator = line.lastIndexOf(":");
    return (separator === -1 ? line : line.slice(0, separator)).trim() || FALLBACK_VERSION;
}

/**
 * Release date as an ISO `YYYY-MM-DD` string, parsed from the `DD/MM/YYYY` tail
 * of the line. Falls back to today only if the file cannot be parsed at all.
 */
export function readVersionDate() {
    const line = readLastReleaseLine();
    const match = line?.match(/(\d{2})\/(\d{2})\/(\d{4})\s*$/);

    if (!match) return new Date().toISOString().split("T")[0];

    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
}
