"use client";

import styles from "@/app/page.module.css";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

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
    const linkedInLocale = t("linkedin_lang");
    const currentLocale = useLocale();

    return (
        <main>
            <div className={styles.presentation_full_screen_wrapper}>
                <div className={styles.presentation_container}>
                    {/* Profile pic */}
                    <div className={styles.presentation_picture_border_container}>
                        <div className={styles.presentation_picture_container}>
                            <Image
                                src="/images/profile.jpg"
                                alt="Baptiste Dubillaud profile picture"
                                width={200}
                                height={200}
                                placeholder="blur"
                                blurDataURL="/images/profile-blur.jpg"
                                className={styles.presentation_picture}
                            />
                        </div>
                    </div>
                    <div className={styles.presentation_data_container}>
                        <div className={styles.presentation_data_group_container}>
                            {/* First and Last names */}
                            <div className={styles.presentation_data_name_container}>
                                <span
                                    className={`${styles.presentation_data_name_text} ${styles.presentation_data_firstname}`}
                                >
                                    Baptiste
                                </span>
                                <span className={styles.presentation_data_name_text}>Dubillaud</span>
                            </div>
                            {/* Position def */}
                            <div className={styles.presentation_data_role_container}>
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
                            </div>
                        </div>
                        <div className={styles.presentation_data_group_container}>
                            {/* Age / Nationality / Location */}
                            <div className={styles.presentation_data_specs_container}>
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
                            </div>
                            {/* Profile links */}
                            <div className={styles.presentation_data_links_container}>
                                <NavigationButton
                                    link={`${LINKEDIN_PROFILE}?locale=${linkedInLocale}`}
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
                            </div>
                        </div>
                        {/* Description sentence */}
                        <div className={styles.presentation_data_sentence}>
                            <p>5 {t("prensentation.paragraph1")}</p>
                            <p>{t("prensentation.paragraph2")}</p>
                        </div>
                    </div>
                </div>
                {/* Shortcut buttons */}
                <div className={styles.presentation_buttons_container}>
                    <MainPageButton text={t("resume_button")} goTo="resume" />
                    {/* <MainPageButton text="Portfolio" goTo="portfolio"/> */}
                    {/* <MainPageButton text="Blog" goTo="blog"  /> */}
                </div>
            </div>
        </main>
    );
}
