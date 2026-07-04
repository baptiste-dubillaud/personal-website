"use client";

import Link from "next/link";

import styles from "@/components/common/ui/Card/Card.module.css";

/**
 * Shared "orange surface" primitive — the tinted, orange-bordered box repeated
 * across blog cards, contact rows and hobby blocks.
 *
 * Provides only the surface (border + tint + radius + hover). Each page keeps
 * its own layout class, composed via `className`.
 *
 * Rendering:
 *  - `internal` + `href` → Next.js <Link> (client-side nav, for in-site pages)
 *  - `href` (no `internal`) → plain <a> (add `external` for target=_blank)
 *  - otherwise → the element given by `as` (default <div>)
 *
 * Being a client component, it can own the <Link> so Server Components (the
 * blog list) can still request SPA navigation without crossing the
 * server→client component-prop boundary.
 */
export default function Card({
    as: Tag = "div",
    href,
    internal = false,
    external = false,
    interactive = false,
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.card, interactive && styles.interactive, className]
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
            <a href={href} className={classes} {...externalProps} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}
