// Shared Framer Motion variants & timing, reused across animated pages
// (home, resume, contact). Keep page-level animations consistent from here.

export const STAGGER_CHILDREN = 0.12;

// Parent container: reveals its children one after another.
export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER_CHILDREN } },
};

// Child item: fade in while sliding up. Used for on-mount reveals (contact).
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Child item: fade in while sliding in from the left. Used on the resume sections.
export const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
