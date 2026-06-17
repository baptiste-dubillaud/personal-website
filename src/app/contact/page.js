"use client";

import styles from "@/app/contact/page.module.css";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import EmailIcon from "@/components/common/icons/misc/EmailIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import GithubIcon from "@/components/common/icons/apps/GithubIcon";

import { LINKEDIN_PROFILE, GITHUB_PROFILE } from "@/utils/linkUtils";
import { COLORS } from "@/utils/colorUtils";

const EMAIL = "contact@dubillaudb.fr";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
                <motion.div
                    className={styles.contact_content}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Header */}
                    <motion.div className={styles.contact_header} variants={itemVariants}>
                        <h1 className={styles.contact_title}>{t("title")}</h1>
                        <div className={styles.availability_badge}>
                            <span className={styles.availability_dot} />
                            {t("availability")}
                        </div>
                        <p className={styles.contact_subtitle}>{t("subtitle")}</p>
                    </motion.div>

                    {/* Contact links */}
                    <div className={styles.contact_links}>
                        {CONTACT_LINKS.map(({ href, icon, labelKey, value, external }) => (
                            <motion.a
                                key={labelKey}
                                href={href}
                                className={styles.contact_row}
                                variants={itemVariants}
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
                            </motion.a>
                        ))}
                    </div>

                </motion.div>
            </div>
        </main>
    );
}
