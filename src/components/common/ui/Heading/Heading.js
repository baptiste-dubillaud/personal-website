import styles from "@/components/common/ui/Heading/Heading.module.css";

/**
 * Display heading with two-tone support: the base text is dark, and any part
 * wrapped in <Heading.Accent> renders in orange with a soft glow.
 *
 * Typography size stays with the consumer (via `className`) since headings vary
 * per page; Heading only owns the colour/weight/accent treatment.
 *
 *   <Heading as="h1" className={styles.name}>
 *     <Heading.Accent>Baptiste</Heading.Accent> Dubillaud
 *   </Heading>
 */
export default function Heading({ as: Tag = "h2", className = "", children, ...rest }) {
    const classes = [styles.heading, className].filter(Boolean).join(" ");
    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}

function Accent({ className = "", children, ...rest }) {
    const classes = [styles.accent, className].filter(Boolean).join(" ");
    return (
        <span className={classes} {...rest}>
            {children}
        </span>
    );
}

Heading.Accent = Accent;
