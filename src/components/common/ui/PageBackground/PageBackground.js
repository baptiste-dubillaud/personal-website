import styles from "@/components/common/ui/PageBackground/PageBackground.module.css";

/**
 * Page-level container that lays the blueprint grid canvas behind its content —
 * the single source of the site's masked engineering grid. Wrap a page's root
 * element with it and pass that element's own layout via `className`; direct
 * children automatically render above the grid.
 *
 * `as` picks the tag (default <div>; e.g. "main" for a page root).
 */
/* Faint mono annotations spaced along the diagonal axis. `at` is the position
   (%) along the line; each label is counter-rotated so it stays upright. */
const AXIS_LABELS = [
    { text: "GenAI", at: "18%" },
    { text: "Data", at: "28%" },
    { text: "Tech-Lead", at: "38%" },
    { text: "PoC", at: "48%" },
    { text: "Logiciel", at: "58%" },
];

export default function PageBackground({ as: Tag = "div", className = "", children, ...rest }) {
    const classes = [styles.page_bg, className].filter(Boolean).join(" ");
    return (
        <Tag className={classes} {...rest}>
            {/* Blueprint drafting marks scattered around the viewport (arc off the
                bottom-left corner + a concentric ring, a labelled diagonal axis, a
                target crosshair, a small node ring). Behind the content,
                non-interactive, fixed like the grid. */}
            <div className={styles.page_deco} aria-hidden="true">
                <span className={styles.deco_circle} />
                <span className={styles.deco_ring} />
                <div className={styles.deco_axis}>
                    <span className={styles.deco_axis_line} />
                    {AXIS_LABELS.map(({ text, at }) => (
                        <span key={text} className={styles.deco_axis_label} style={{ left: at }}>
                            {text}
                        </span>
                    ))}
                </div>
                <span className={styles.deco_crosshair} />
                <span className={styles.deco_node} />
            </div>
            {children}
        </Tag>
    );
}
