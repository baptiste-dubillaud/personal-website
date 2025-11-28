function parseToDate(date) {
    if (date instanceof Date) return date;
    if (typeof date === "number") return new Date(date);
    if (typeof date !== "string") return new Date(NaN);
    const s = date.trim();
    if (s.includes("T") || s.endsWith("Z") || s.includes("+")) {
        return new Date(s);
    }
    const parts = s.split(/[-\/_\.]/);
    if (parts.length === 3) {
        let year, month, day;
        if (parts[0].length === 4) {
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            day = parseInt(parts[2], 10);
        } else {
            month = parseInt(parts[0], 10);
            day = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
        }
        if ([year, month, day].some((n) => Number.isNaN(n))) return new Date(NaN);
        return new Date(year, month - 1, day);
    }
    return new Date(s);
}

function getNbYears(date) {
    const currDate = new Date();
    const birthdayDate = parseToDate(date);
    if (Number.isNaN(birthdayDate.getTime())) return NaN;
    const age = (currDate - birthdayDate) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(age);
}

const tests = [
    "12-29-1998",
    "1998-12-29",
    "09-01-2020",
    "2020-09-01",
    "1998/12/29",
    "1998.12.29",
    "1998-12-29T00:00:00Z",
    new Date(1998, 11, 29),
    915148800000, // timestamp for 1999-01-01-ish
];

for (const t of tests) {
    console.log(String(t).padEnd(30), "->", getNbYears(t));
}
