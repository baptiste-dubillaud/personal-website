"use client";

import Link from "next/link";

import styles from "@/components/common/ui/Button/Button.module.css";

/**
 * Shared button primitive for the whole site.
 *
 * Rendering:
 *  - `internal` + `href` → Next.js <Link> (client-side nav, in-site pages)
 *  - `href` (no `internal`) → plain <a> (add `external` for target=_blank,
 *    `download` for file downloads)
 *  - otherwise → <button> (use `onClick` for in-page actions)
 *
 * variant: "outline" (default) | "solid" | "ghost"
 * size:    "sm" | "md" (default)
 */
export default function Button({
    variant = "outline",
    size = "md",
    href,
    internal = false,
    external = false,
    download,
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(" ");

    if (href) {
        if (internal) {
            return (
                <Link href={href} className={classes} {...rest}>
                    {children}
                </Link>
            );
        }
        const externalProps = external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};
        return (
            <a href={href} className={classes} download={download} {...externalProps} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
