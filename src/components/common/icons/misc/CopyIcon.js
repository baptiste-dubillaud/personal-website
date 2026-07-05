export default function CopyIcon({ size, color }) {
    const sz = size || 25;
    const cl = color || "currentColor";

    return (
        <svg
            width={sz}
            height={sz}
            viewBox="0 0 24 24"
            fill="none"
            stroke={cl}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}
