"use client";

import styles from "@/app/page.module.css";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { motion } from "framer-motion";

import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import ProfileIcon from "@/components/common/icons/misc/ProfileIcon";
import FlagIcon from "@/components/common/icons/misc/FlagIcon";
import Locationicon from "@/components/common/icons/misc/LocationIcon";

import { getNbYears } from "@/utils/dateUtils";
import { LINKEDIN_PROFILE, GITHUB_PROFILE } from "@/utils/linkUtils";
import NavigationButton from "@/components/common/buttons/navigation/NavigationButton";

const MainPageButton = ({ goTo, text }) => {
    const router = useRouter();

    const handleClick = () => {
        if (goTo) {
            router.push(`/${goTo}`);
        }
    };

    return (
        <div className={styles.main_button_container} onClick={handleClick}>
            {text}
        </div>
    );
};

export default function Home() {
    const t = useTranslations("pages.home");
    const commont = useTranslations("common");
    const currentLocale = useLocale();

    return (
        <main>
            <div className={styles.presentation_full_screen_wrapper}>
                <motion.div
                    className={styles.presentation_container}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                >
                    {/* Profile pic */}
                    <motion.div
                        className={styles.presentation_picture_border_container}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                    >
                        <motion.div
                            className={styles.presentation_picture_container}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.75, duration: 0.5 }}
                        >
                            <Image
                                src="/images/profile.jpg"
                                alt="Baptiste Dubillaud profile picture"
                                width={200}
                                height={200}
                                placeholder="blur"
                                blurDataURL="/images/profile-blur.jpg"
                                className={styles.presentation_picture}
                            />
                        </motion.div>
                    </motion.div>
                    <div className={styles.presentation_data_container}>
                        <div className={styles.presentation_data_group_container}>
                            {/* First and Last names */}
                            <div className={styles.presentation_data_name_container}>
                                <span
                                    className={`${styles.presentation_data_name_text} ${styles.presentation_data_firstname}`}
                                >
                                    {"Baptiste".split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            animate={{ y: [10, 0], opacity: [0, 1] }}
                                            transition={{ delay: 1 + index * 0.075, duration: 0 }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                                <span className={styles.presentation_data_name_text}>
                                    {"Dubillaud".split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            animate={{ y: [10, 0], opacity: [0, 1] }}
                                            transition={{ delay: 1.6 + index * 0.075, duration: 0 }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            </div>
                            {/* Position def */}
                            <motion.div
                                className={styles.presentation_data_role_container}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 2.4 }}
                            >
                                {currentLocale === "fr" ? (
                                    <>
                                        <span className={styles.presentation_data_role_text}>
                                            {t("workTitle.engineer")}
                                        </span>
                                        <span
                                            className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}
                                        >
                                            {t("workTitle.soft")}
                                        </span>
                                        <span className={styles.presentation_data_role_text}>&</span>
                                        <span
                                            className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}
                                        >
                                            {t("workTitle.data")}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}
                                        >
                                            {t("workTitle.soft")}
                                        </span>
                                        <span className={styles.presentation_data_role_text}>&</span>
                                        <span
                                            className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}
                                        >
                                            {t("workTitle.data")}
                                        </span>
                                        <span className={styles.presentation_data_role_text}>
                                            {t("workTitle.engineer")}
                                        </span>
                                    </>
                                )}
                            </motion.div>
                        </div>
                        <div className={styles.presentation_data_group_container}>
                            {/* Age / Nationality / Location */}
                            <motion.div
                                className={styles.presentation_data_specs_container}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 2.8 }}
                            >
                                <div className={styles.presentation_data_spec_container}>
                                    <ProfileIcon size={20} />
                                    <span className={styles.presentation_data_specs_text}>
                                        {getNbYears("12-29-1998")} {t("age")}
                                    </span>
                                </div>
                                <div className={styles.presentation_data_spec_container}>
                                    <FlagIcon size={20} />
                                    <span className={styles.presentation_data_specs_text}>{t("nationality")}</span>
                                </div>
                                <div className={styles.presentation_data_spec_container}>
                                    <Locationicon size={22} />
                                    <span className={styles.presentation_data_specs_text}>Pau, France</span>
                                </div>
                            </motion.div>
                            {/* Profile links */}
                            <motion.div
                                className={styles.presentation_data_links_container}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 3.2 }}
                            >
                                <NavigationButton
                                    link={`${LINKEDIN_PROFILE}?locale=${commont("linkedin_lang")}`}
                                    alt="LinkedIn profile"
                                >
                                    <LinkedInIcon size={30} />
                                </NavigationButton>
                                <NavigationButton link={GITHUB_PROFILE} alt="Github profile">
                                    <GithubIcon size={30} />
                                </NavigationButton>
                                {/* <NavigationButton link={MEDIUM_PROFILE} alt="Medium profile">
                                    <MediumIcon size={30}/>
                                </NavigationButton> */}
                            </motion.div>
                        </div>
                        {/* Description sentence */}
                        <motion.div
                            className={styles.presentation_data_sentence}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 3.6 }}
                        >
                            <p>
                                {getNbYears("09-01-2020")} {t("prensentation.paragraph1")}
                            </p>
                            <p>{t("prensentation.paragraph2")}</p>
                        </motion.div>
                    </div>
                </motion.div>
                {/* Shortcut buttons */}
                <motion.div
                    className={styles.presentation_buttons_container}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 4 }}
                >
                    <MainPageButton text={t("resume_button")} goTo="resume" />
                    {/* <MainPageButton text="Portfolio" goTo="portfolio"/> */}
                    {/* <MainPageButton text="Blog" goTo="blog"  /> */}
                </motion.div>
            </div>
        </main>
    );
}
