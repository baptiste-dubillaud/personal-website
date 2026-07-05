import styles from "@/components/common/ui/Divider/Divider.module.css";

/**
 * Thin horizontal rule with a symmetric orange gradient that fades out at both
 * ends — a soft section separator.
 *
 * subtle: fainter gradient — a minor, in-component separator that shouldn't
 *         compete with the stronger dividers used between major sections.
 */
export default function Divider({ subtle = false, className = "", ...rest }) {
    const classes = [styles.divider, subtle && styles.subtle, className].filter(Boolean).join(" ");
    return <hr className={classes} {...rest} />;
}
