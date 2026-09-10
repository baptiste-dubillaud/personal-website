"use client";

import styles from "@/app/page.module.css";

import { Fragment, useSyncExternalStore } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "motion/react";

import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import ProfileIcon from "@/components/common/icons/misc/ProfileIcon";
import FlagIcon from "@/components/common/icons/misc/FlagIcon";
import Locationicon from "@/components/common/icons/misc/LocationIcon";

import { getNbYears } from "@/utils/dateUtils";
import { LINKEDIN_PROFILE, GITHUB_PROFILE } from "@/utils/linkUtils";
import NavigationButton from "@/components/common/ui/NavigationButton/NavigationButton";
import Button from "@/components/common/ui/Button/Button";
import PageBackground from "@/components/common/ui/PageBackground/PageBackground";
import Heading from "@/components/common/ui/Heading/Heading";

// A real <Link>, not a button calling router.push: these two are the only paths
// from the home page into the rest of the site, and a crawler cannot follow an
// onClick handler.
const MainPageButton = ({ goTo, text, type = "outline" }) => (
    <Button variant={type} internal href={`/${goTo}`} size="md">
        {text}
    </Button>
);

const subscribeToNothing = () => () => {};
const getIsHydrated = () => true;
const getIsHydratedOnServer = () => false;

/**
 * The name reveals one character at a time, which needs one <span> per letter.
 * That markup is fine in a browser and unreadable everywhere else: a text
 * extractor joins the spans and reads "B a p t i s t e" — garbling the single
 * most important string on the site for crawlers and LLM fetchers.
 *
 * So the server renders the name as plain text, which is what they get, and the
 * client swaps in the animated letters once hydrated. `useSyncExternalStore` is
 * how the rest of the codebase resolves client-only values (see NavigationBar)
 * — an effect writing state would cost this component its auto-memoisation.
 */
const AnimatedName = ({ text, delay }) => {
    const isHydrated = useSyncExternalStore(subscribeToNothing, getIsHydrated, getIsHydratedOnServer);

    if (!isHydrated) return text;

    return text.split("").map((char, index) => (
        <motion.span
            key={index}
            animate={{ y: [10, 0], opacity: [0, 1] }}
            transition={{ delay: delay + index * 0.075, duration: 0 }}
        >
            {char}
        </motion.span>
    ));
};

// The work title is the same three labels in both languages, but not in the same
// order ("Freelance Tech-Lead & …" in French), so the sequence is part of the
// translation and lives in the message files next to the labels.
const WORK_TITLE_SEPARATOR = "&";
const HIGHLIGHTED_WORK_TITLE_PARTS = ["soft", "data"];

export default function Home() {
    const t = useTranslations("pages.home");
    const commont = useTranslations("common");

    return (
        <main>
            <PageBackground className={styles.presentation_full_screen_wrapper}>
                <motion.div
                    className={styles.presentation_container}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                >
                    {/* Profile pic */}
                    <motion.div
                        className={styles.presentation_picture_border_container}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.div
                            className={styles.presentation_picture_container}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.4 }}
                        >
                            <Image
                                src="/images/profile.png"
                                alt="Baptiste Dubillaud profile picture"
                                width={200}
                                height={200}
                                className={styles.presentation_picture}
                            />
                        </motion.div>
                    </motion.div>
                    <div className={styles.presentation_data_container}>
                        <div className={styles.presentation_data_group_container}>
                            {/* First and Last names */}
                            <Heading as="h1" className={styles.presentation_data_name_container}>
                                <Heading.Accent className={styles.presentation_data_name_text}>
                                    <AnimatedName text="Baptiste" delay={0.6} />
                                </Heading.Accent>
                                {/* Whitespace-only text between flex items is not
                                    rendered, so this costs nothing visually and
                                    keeps "Baptiste Dubillaud" one readable string
                                    for extractors that join adjacent nodes. */}{" "}
                                <span className={styles.presentation_data_name_text}>
                                    <AnimatedName text="Dubillaud" delay={1.25} />
                                </span>
                            </Heading>
                            {/* Position def */}
                            <motion.h2
                                className={styles.presentation_data_role_container}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 1.95 }}
                            >
                                {t.raw("workTitle.order").map((part, index) => (
                                    // Same reason as the space between the two
                                    // names above: the container is a flex row
                                    // with a `gap`, so whitespace-only text
                                    // nodes cost nothing visually, and without
                                    // them an extractor joining the spans reads
                                    // "Tech-Lead&AI Software EngineerFreelance".
                                    <Fragment key={index}>
                                        {index > 0 && " "}
                                        {part === WORK_TITLE_SEPARATOR ? (
                                            <span className={styles.presentation_data_role_text}>
                                                {WORK_TITLE_SEPARATOR}
                                            </span>
                                        ) : (
                                            <span
                                                className={[
                                                    styles.presentation_data_role_text,
                                                    HIGHLIGHTED_WORK_TITLE_PARTS.includes(part) &&
                                                        styles.presentation_data_firstname,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                            >
                                                {t(`workTitle.${part}`)}
                                            </span>
                                        )}
                                    </Fragment>
                                ))}
                            </motion.h2>
                        </div>
                        <div className={styles.presentation_data_group_container}>
                            {/* Age / Nationality / Location */}
                            <motion.div
                                className={styles.presentation_data_specs_container}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 2.25 }}
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
                                transition={{ duration: 2, delay: 2.5 }}
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
                            transition={{ duration: 2, delay: 2.75 }}
                        >
                            <p>
                                {getNbYears("09-01-2020")} {t("prensentation.paragraph1")}
                            </p>
                            <p>{t("prensentation.paragraph2")}</p>
                        </motion.div>
                        {/* Shortcut buttons — action row inside the card */}
                        <motion.div
                            className={styles.presentation_buttons_container}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 3.0 }}
                        >
                            <MainPageButton text={t("resume_button")} goTo="resume" type="solid" />
                            <MainPageButton text={t("contact_button")} goTo="contact" />
                        </motion.div>
                    </div>
                </motion.div>
            </PageBackground>
        </main>
    );
}
