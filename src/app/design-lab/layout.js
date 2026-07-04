// The mono font is now loaded globally in the root layout; this layout only
// carries the design-system reference metadata (kept out of search indexes).
export const metadata = {
    title: "Design System",
    robots: { index: false, follow: false },
};

export default function DesignLabLayout({ children }) {
    return children;
}
