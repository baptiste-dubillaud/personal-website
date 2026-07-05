import styles from "@/components/common/ui/Tag/Tag.module.css";

/**
 * Small tinted chip used for tech-stack / technology labels
 * (e.g. the resume timeline tech items).
 */
export default function Tag({ className = "", children, ...rest }) {
    const classes = [styles.tag, className].filter(Boolean).join(" ");
    return (
        <span className={classes} {...rest}>
            {children}
        </span>
    );
}
