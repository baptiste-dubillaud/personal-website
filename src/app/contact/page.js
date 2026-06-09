"use client";

import styles from "@/app/contact/page.module.css";

import { useTranslations } from "next-intl";

import EmailIcon from "@/components/common/icons/misc/EmailIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import GithubIcon from "@/components/common/icons/apps/GithubIcon";

import { LINKEDIN_PROFILE, GITHUB_PROFILE } from "@/utils/linkUtils";
import { COLORS } from "@/utils/colorUtils";

const EMAIL = "contact@dubillaudb.fr";

const CONTACT_LINKS = [
    {
        href: `mailto:${EMAIL}`,
        icon: (color) => <EmailIcon size={26} color={color} />,
        labelKey: "email_label",
        value: EMAIL,
        external: false,
    },
    {
        href: LINKEDIN_PROFILE,
        icon: (color) => <LinkedInIcon size={26} color={color} />,
        labelKey: "linkedin_label",
        value: "baptiste-dubillaud",
        external: true,
    },
    {
        href: GITHUB_PROFILE,
        icon: (color) => <GithubIcon size={26} color={color} />,
        labelKey: "github_label",
        value: "baptiste-dubillaud",
        external: true,
    },
];

export default function ContactPage() {
    const t = useTranslations("pages.contact");

    return (
        <main>
            <div className={styles.contact_wrapper}>
                <div className={styles.contact_content}>

                    {/* Header */}
                    <div className={styles.contact_header}>
                        <h1 className={styles.contact_title}>{t("title")}</h1>
                        <div className={styles.availability_badge}>
                            <span className={styles.availability_dot} />
                            {t("availability")}
                        </div>
                        <p className={styles.contact_subtitle}>{t("subtitle")}</p>
                    </div>

                    {/* Contact links */}
                    <div className={styles.contact_links}>
                        {CONTACT_LINKS.map(({ href, icon, labelKey, value, external }) => (
                            <a
                                key={labelKey}
                                href={href}
                                className={styles.contact_row}
                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                <div className={styles.contact_row_icon}>
                                    {icon(COLORS.white)}
                                </div>
                                <div className={styles.contact_row_text}>
                                    <span className={styles.contact_row_label}>{t(labelKey)}</span>
                                    <span className={styles.contact_row_value}>{value}</span>
                                </div>
                                <span className={styles.contact_row_arrow}>→</span>
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}
