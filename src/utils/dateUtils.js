export function getNbYears(date) {
    const currDate = new Date();
    const birthdayDate = new Date(date);

    const age = (currDate - birthdayDate) / (1000 * 60 * 60 * 24 * 365.25);

    return Math.floor(age);
}
