"use client";

import styles from "@/app/contact/page.module.css";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { staggerContainer as containerVariants, fadeInUp as itemVariants } from "@/utils/animations";

import EmailIcon from "@/components/common/icons/misc/EmailIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import CopyIcon from "@/components/common/icons/misc/CopyIcon";
import CheckIcon from "@/components/common/icons/misc/CheckIcon";

import { LINKEDIN_PROFILE, GITHUB_PROFILE, CONTACT_EMAIL as EMAIL } from "@/utils/linkUtils";
import { COLORS } from "@/utils/colorUtils";
import PageBackground from "@/components/common/ui/PageBackground/PageBackground";
import Heading from "@/components/common/ui/Heading/Heading";
import Prompt from "@/components/common/ui/Prompt/Prompt";
import Divider from "@/components/common/ui/Divider/Divider";


const CONTACT_LINKS = [
    {
        href: `mailto:${EMAIL}`,
        icon: (color) => <EmailIcon size={26} color={color} />,
        labelKey: "email_label",
        value: EMAIL,
        external: false,
        copyable: true,
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
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable — no-op */
        }
    };

    return (
        <PageBackground as="main" className={styles.contact_wrapper}>
            <motion.div
                className={styles.contact_content}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className={styles.contact_header} variants={itemVariants}>
                    <Heading as="h1" className={styles.contact_title}>
                        <Heading.Accent>{t("title")}</Heading.Accent>
                    </Heading>
                    <p className={styles.contact_subtitle}>{t("subtitle")}</p>
                    <Prompt sign=">" className={styles.contact_kicker}>
                        {t("availability")}
                    </Prompt>
                </motion.div>

                {/* Separator between the textual header and the contact rows */}
                <motion.div className={styles.contact_divider} variants={itemVariants}>
                    <Divider />
                </motion.div>

                {/* Contact links */}
                <div className={styles.contact_links}>
                    {CONTACT_LINKS.map(({ href, icon, labelKey, value, external, copyable }, index) => {
                        const isCopied = copyable && copied;
                        const rowInner = (
                            <>
                                <div className={styles.contact_row_icon}>{icon(COLORS.white)}</div>
                                <div className={styles.contact_row_text}>
                                    <span className={styles.contact_row_label}>
                                        <span className={styles.contact_row_num}>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className={styles.contact_row_sep}>/</span>
                                        {t(labelKey)}
                                    </span>
                                    <span className={styles.contact_row_value}>
                                        {isCopied ? t("copied") : value}
                                    </span>
                                </div>
                                <span
                                    className={`${styles.contact_row_arrow} ${
                                        isCopied ? styles.contact_row_arrow_done : ""
                                    }`}
                                >
                                    {copyable ? (
                                        isCopied ? (
                                            <CheckIcon size={18} />
                                        ) : (
                                            <CopyIcon size={18} />
                                        )
                                    ) : (
                                        "→"
                                    )}
                                </span>
                            </>
                        );

                        if (copyable) {
                            return (
                                <motion.button
                                    key={labelKey}
                                    type="button"
                                    onClick={handleCopy}
                                    className={styles.contact_row}
                                    variants={itemVariants}
                                >
                                    {rowInner}
                                </motion.button>
                            );
                        }

                        return (
                            <motion.a
                                key={labelKey}
                                href={href}
                                className={styles.contact_row}
                                variants={itemVariants}
                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                {rowInner}
                            </motion.a>
                        );
                    })}
                </div>
            </motion.div>
        </PageBackground>
    );
}
