export default function HomeIcon({ size, color }) {
    const sz = size || 25;
    const cl = color || "black";

    return (
        <svg fill={cl} width={sz} height={sz} viewBox="0 0 24 24">
            <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3z" />
        </svg>
    );
}
