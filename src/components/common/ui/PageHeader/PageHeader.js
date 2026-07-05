import styles from "@/components/common/ui/PageHeader/PageHeader.module.css";

/**
 * Standard centered page header (title + optional subtitle) for index pages
 * (e.g. blog) so headings stay identical across the site.
 */
export default function PageHeader({ title, subtitle, className = "" }) {
    const classes = [styles.header, className].filter(Boolean).join(" ");
    return (
        <header className={classes}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
    );
}
