"use client";

import styles from "@/app/page.module.css";

import Image from "next/image";
import { useRouter } from "next/navigation";

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

const MainPageButton = ({ goTo, text }) => {

    const router = useRouter();

    const handleClick = () => {
        if (goTo) {
            router.push(`/${goTo}`);
        }
    };

    return <div className={styles.main_button_container} onClick={handleClick}>{text}</div>;
};

export default function Home() {
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
                                    <span className={styles.presentation_data_specs_text}>Paris, Bordeaux, Pau</span>
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
                            <p>
                                5 years of experience in software and data engineering, with a passion for building
                                innovative solutions and a strong foundation in computer science. Always eager to learn and explore new technologies, I am currently focused on
                                expanding my expertise in data engineering and cloud computing.
                            </p>
                            <p>
                                Don&apos;t hesitate to contact me if you want to discuss about a project, a collaboration or just to say hi!
                            </p>
                        </div>
                    </div>
                </div>
                {/* Shortcut buttons */}
                <div className={styles.presentation_buttons_container}>
                    <MainPageButton text="Resume" goTo="resume" />
                    {/* <MainPageButton text="Portfolio"/> goTo="portfolio"  */}
                    {/* <MainPageButton text="Blog" goTo="blog"  /> */}
                </div>
            </div>
        </main>
    );
}
