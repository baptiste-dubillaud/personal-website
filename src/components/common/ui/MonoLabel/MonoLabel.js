import styles from "@/components/common/ui/MonoLabel/MonoLabel.module.css";

/**
 * Monospace kicker label — e.g.  EXPERIENCE / 01  — for section headers, dates
 * and other technical metadata. The optional `num` renders after a "/" accent.
 */
export default function MonoLabel({ children, num, className = "" }) {
    const classes = [styles.mono_label, className].filter(Boolean).join(" ");
    return (
        <span className={classes}>
            {children}
            {num != null && <span className={styles.slash}> / {num}</span>}
        </span>
    );
}
