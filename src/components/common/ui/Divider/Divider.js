import styles from "@/components/common/ui/Divider/Divider.module.css";

/**
 * Thin horizontal rule with a symmetric orange gradient that fades out at both
 * ends — a soft section separator.
 */
export default function Divider({ className = "", ...rest }) {
    const classes = [styles.divider, className].filter(Boolean).join(" ");
    return <hr className={classes} {...rest} />;
}
