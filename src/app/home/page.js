"use client";

import styles from "@/app/page.module.css";

import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import MediumIcon from "@/components/common/icons/apps/MediumIcon";
import ProfileIcon from "@/components/common/icons/misc/ProfileIcon";
import FlagIcon from "@/components/common/icons/misc/FlagIcon";
import Locationicon from "@/components/common/icons/misc/LocationIcon";

import { getNbYears } from "@/utils/dateUtils";
import { LINKEDIN_PROFILE, MEDIUM_PROFILE, GITHUB_PROFILE } from "@/utils/linkUtils";

const NewTabLink = ({ children, link, alt }) => {
    return (
        <a href={link} target="_blank" alt={alt} className={styles.tab_link_container}>
            {children}
        </a>
    );
};

const MainPageButton = ({ action, text, icon }) => {
    return <div className={styles.main_button_container}>{text}</div>;
};

export default function Home() {
    return (
        <main>
            <div className={styles.presentation_full_screen_wrapper}>
                <div className={styles.presentation_container}>
                    {/* Profile pic */}
                    <div className={styles.presentation_picture_border_container}>
                        <div className={styles.presentation_picture_container}>{/* Insert picture here */}</div>
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
                                <span
                                    className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}
                                >
                                    Software
                                </span>
                                <span className={styles.presentation_data_role_text}>&</span>
                                <span
                                    className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}
                                >
                                    Data
                                </span>
                                <span className={styles.presentation_data_role_text}>Engineer</span>
                            </div>
                        </div>
                        <div className={styles.presentation_data_group_container}>
                            {/* Age / Nationality / Location */}
                            <div className={styles.presentation_data_specs_container}>
                                <div className={styles.presentation_data_spec_container}>
                                    <ProfileIcon size={20} />
                                    <span className={styles.presentation_data_specs_text}>
                                        {getNbYears("12-29-1998")} years old
                                    </span>
                                </div>
                                <div className={styles.presentation_data_spec_container}>
                                    <FlagIcon size={20} />
                                    <span className={styles.presentation_data_specs_text}>French</span>
                                </div>
                                <div className={styles.presentation_data_spec_container}>
                                    <Locationicon size={22} />
                                    <span className={styles.presentation_data_specs_text}>Esbjerg, Denmark</span>
                                </div>
                            </div>
                            {/* Profile links */}
                            <div className={styles.presentation_data_links_container}>
                                <NewTabLink link={LINKEDIN_PROFILE} alt="LinkedIn profile">
                                    <LinkedInIcon size={30} />
                                </NewTabLink>
                                <NewTabLink link={GITHUB_PROFILE} alt="Github profile">
                                    <GithubIcon size={30} />
                                </NewTabLink>
                                {/* <NewTabLink link={MEDIUM_PROFILE} alt="Medium profile">
                                    <MediumIcon size={30}/>
                                </NewTabLink> */}
                            </div>
                        </div>
                        {/* Description sentence */}
                        <div className={styles.presentation_data_sentence}>
                            After almost 2 years spent in Denmark working on multiple user-oriented projects as a
                            Tech-Lead and Software Engineer on data, software and UI parts, I&apos;m looking for a new
                            position as a Software and/or Data engineer starting from early 2025.
                        </div>
                    </div>
                </div>
                {/* Shortcut buttons */}
                <div className={styles.presentation_buttons_container}>
                    <MainPageButton text="Resume" />
                    {/* <MainPageButton text="Portfolio"/> */}
                    <MainPageButton text="Blog" />
                </div>
            </div>
        </main>
    );
}
