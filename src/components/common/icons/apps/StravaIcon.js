export default function StravaIcon({ size, fillColor, strokeColorTop, strokeColorBottom }) {
    const sz = size || 25;
    const fill = fillColor || "none";
    const strokeTop = strokeColorTop || "#fff";
    const strokeBottom = strokeColorBottom || "#fda580";

    return (
        <svg aria-label="Strava" width={sz} height={sz} viewBox="0 0 512 512">
            <rect width="100%" height="100%" fill={fill} />
            <path fill={strokeTop} d="M120 288L232 56l112 232h-72l-40-96-40 96z" />
            <path fill={strokeBottom} d="M280 288l32 72 32-72h48l-80 168-80-168z" />
        </svg>
    );
}
