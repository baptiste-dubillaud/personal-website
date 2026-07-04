import styles from "@/components/common/ui/Prompt/Prompt.module.css";

/**
 * Terminal-style command line — a mono chip like  > whoami▮  with a blinking
 * cursor. A small "dev" flourish for kickers, tech details and the nav brand.
 *
 * sign:   the prompt sign ("$" default, or ">")
 * cursor: show the blinking cursor (default true)
 * size:   "sm" (default) | "md" | "lg"
 *
 * Text colour is inherited, so the prompt reads on both light pages and the
 * dark nav; the sign & cursor stay orange.
 */
export default function Prompt({ sign = "$", cursor = true, size = "sm", className = "", children, ...rest }) {
    const classes = [styles.prompt, styles[`size_${size}`], className].filter(Boolean).join(" ");
    return (
        <span className={classes} {...rest}>
            <span className={styles.sign}>{sign}</span>
            {children}
            {cursor && <span className={styles.cursor} />}
        </span>
    );
}
