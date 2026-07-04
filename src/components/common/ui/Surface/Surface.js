"use client";

import Link from "next/link";

import styles from "@/components/common/ui/Surface/Surface.module.css";

/**
 * The container primitive of the design system — one opaque, orange-tinted panel
 * that sits ON the blueprint grid (never lets it bleed through). Replaces the old
 * Card: it keeps Card's link rendering and adds design-system variants.
 *
 * variant: "plain" (default, orange border) | "glow" (halo, lifts on hover)
 * interactive: adds pointer + lift on hover (plain)
 * corners: draws orange corner "ticks" framing the surface
 *
 * Rendering (same as the former Card):
 *  - `internal` + `href` → Next.js <Link>
 *  - `href` (no `internal`) → plain <a> (add `external` for target=_blank)
 *  - otherwise → the element given by `as` (default <div>)
 */
const CornerTicks = () => (
    <>
        <span className={`${styles.corner} ${styles.corner_tl}`} />
        <span className={`${styles.corner} ${styles.corner_tr}`} />
        <span className={`${styles.corner} ${styles.corner_bl}`} />
        <span className={`${styles.corner} ${styles.corner_br}`} />
    </>
);

export default function Surface({
    as: Tag = "div",
    variant = "plain",
    interactive = false,
    corners = false,
    href,
    internal = false,
    external = false,
    className = "",
    children,
    ...rest
}) {
    const classes = [
        styles.surface,
        styles[variant],
        interactive && styles.interactive,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const inner = (
        <>
            {corners && <CornerTicks />}
            {children}
        </>
    );

    if (href) {
        if (internal) {
            return (
                <Link href={href} className={classes} {...rest}>
                    {inner}
                </Link>
            );
        }
        const externalProps = external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};
        return (
            <a href={href} className={classes} {...externalProps} {...rest}>
                {inner}
            </a>
        );
    }

    return (
        <Tag className={classes} {...rest}>
            {inner}
        </Tag>
    );
}
