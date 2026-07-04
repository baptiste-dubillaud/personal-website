import styles from "@/components/common/ui/Badge/Badge.module.css";

/**
 * Status pill — a small uppercase label, optionally preceded by a status dot.
 *
 * tone:    "orange" (default) | "muted"      — the pill colour
 * dot:     boolean                            — show a status dot
 * dotTone: "orange" (default) | "success"     — the dot colour
 * pulse:   boolean                            — animate the dot's ring
 */
export default function Badge({
    tone = "orange",
    dot = false,
    dotTone = "orange",
    pulse = false,
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.badge, styles[`tone_${tone}`], className]
        .filter(Boolean)
        .join(" ");

    const dotClasses = [
        styles.dot,
        dotTone === "success" && styles.dot_success,
        pulse && styles.dot_pulse,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes} {...rest}>
            {dot && <span className={dotClasses} />}
            {children}
        </span>
    );
}
