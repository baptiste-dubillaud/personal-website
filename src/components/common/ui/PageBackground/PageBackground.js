import styles from "@/components/common/ui/PageBackground/PageBackground.module.css";

/**
 * Page-level container that lays the blueprint grid canvas behind its content —
 * the single source of the site's masked engineering grid. Wrap a page's root
 * element with it and pass that element's own layout via `className`; direct
 * children automatically render above the grid.
 *
 * `as` picks the tag (default <div>; e.g. "main" for a page root).
 */
export default function PageBackground({ as: Tag = "div", className = "", children, ...rest }) {
    const classes = [styles.page_bg, className].filter(Boolean).join(" ");
    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}
