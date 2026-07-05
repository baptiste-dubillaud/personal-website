export default function CheckIcon({ size, color }) {
    const sz = size || 25;
    const cl = color || "currentColor";

    return (
        <svg
            width={sz}
            height={sz}
            viewBox="0 0 24 24"
            fill="none"
            stroke={cl}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
