"use client";

import styles from "@/app/resume/page.module.css";

import { useEffect, useRef, useState } from "react";

import { getNbYears } from "@/utils/dateUtils";
import SportIcon from "@/components/common/icons/misc/SportIcon";
import BookShelfIcon from "@/components/common/icons/misc/BookIcon";
import VideoGame from "@/components/common/icons/misc/VideoGame";
import NavigationButton from "@/components/common/buttons/navigation/NavigationButton";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import { LINKEDIN_PROFILE, MEDIUM_PROFILE, GITHUB_PROFILE, STRAVA_PROFILE } from "@/utils/linkUtils";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import StravaIcon from "@/components/common/icons/apps/StravaIcon";

// Common renderer for description objects (paragraph | list)
function renderDescriptionBlock(desc, key) {
    if (desc.type === "paragraph") {
        return (
            <p
                key={key}
                dangerouslySetInnerHTML={{
                    __html: desc.content.replace(/<bold>(.*?)<\/bold>/g, "<b>$1</b>"),
                }}
            />
        );
    }
    if (desc.type === "list") {
        return (
            <ul key={key}>
                {desc.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: item.content.replace(/<bold>(.*?)<\/bold>/g, "<b>$1</b>"),
                            }}
                        />
                        {item.subitems && item.subitems.length > 0 && (
                            <ul>
                                {item.subitems.map((sub, subIndex) => (
                                    <li
                                        key={subIndex}
                                        dangerouslySetInnerHTML={{
                                            __html: sub.replace(/<bold>(.*?)<\/bold>/g, "<b>$1</b>"),
                                        }}
                                    />
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    }
    return null;
}

const TWO_COLUMNS_BREAKPOINT = 1200;
const TWO_COLUMNS_PRESENTATION_WIDTH = "39%";
const TWO_COLUMNS_CONTENT_WIDTH = "59%";

const PresentationComponent = ({ isTwoColumnSetup, currentPart, parts, translation }) => {
    const linkedInLocale = useTranslations("common")("linkedin_lang");

    function scrollToComponent(index, ref) {
        if (ref.current) {
            const elementTop = ref.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementTop - (index === 0 ? 175 : 80);

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    }

    return (
        <div className={styles.presentation_container}>
            {/* Presentation data */}
            <div className={styles.presentation_name}>Baptiste Dubillaud</div>
            <div className={styles.presentation_job}>{translation("prensentation.title")}</div>
            <div className={styles.presentation_desc}>{translation("prensentation.intro")}</div>

            <div className={styles.presentation_buttons_container}>
                <NavigationButton link={`${LINKEDIN_PROFILE}?locale=${linkedInLocale}`} alt="LinkedIn profile">
                    <LinkedInIcon size={30} />
                </NavigationButton>
                <NavigationButton link={GITHUB_PROFILE} alt="Github profile">
                    <GithubIcon size={30} />
                </NavigationButton>
            </div>

            {/* Menu / Showed only if enough space (isTwoColumnSetup = false) */}
            {isTwoColumnSetup && (
                <div className={styles.presentation_menu}>
                    {parts.map((part, index) => (
                        <div
                            key={index}
                            className={styles.presentation_menu_item}
                            style={
                                currentPart === part.name
                                    ? {
                                          color: "var(--color-orange)",
                                          fontSize: "1.35em",
                                          paddingTop: index === 0 ? 0 : 10,
                                          paddingBottom: index === parts.length - 1 ? 0 : 10,
                                      }
                                    : {
                                          paddingTop: index === 0 ? 0 : 10,
                                          paddingBottom: index === parts.length - 1 ? 0 : 10,
                                      }
                            }
                            onClick={() => scrollToComponent(index, part.ref)}
                        >
                            {part.display}
                        </div>
                    ))}
                    <div
                        className={styles.presentation_menu_elevator}
                        style={{ top: parts.map((key, id) => key.name).indexOf(currentPart) * 45 - 5 }}
                    />
                </div>
            )}
        </div>
    );
};

const PartComponent = ({ isTwoColumnSetup, title, reference, contentComponent }) => {
    return (
        <div ref={reference} className={styles.part_container}>
            {!isTwoColumnSetup && <div className={styles.part_title}>{title}</div>}
            <div className={styles.part_content}>{contentComponent}</div>
        </div>
    );
};

const AboutComponent = ({ isTwoColumnSetup, aboutRef, translation }) => {
    const age = getNbYears("12-29-1998");
    const experience = getNbYears("09-01-2020");

    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            title={translation("menu.about")}
            reference={aboutRef}
            contentComponent={
                <>
                    {translation.raw("about").map((_, index) => (
                        <p key={index}>
                            {translation.rich(`about.${index}`, {
                                age,
                                experience,
                                bold: (chunks) => <b>{chunks}</b>,
                            })}
                        </p>
                    ))}
                </>
            }
        />
    );
};

const TimeLineComponent = ({
    onRight = false,
    title,
    entity,
    location,
    dateFrom,
    dateTo,
    DescriptionComponent,
    techStack = [[]],
}) => {
    return (
        <div
            className={`${styles.timeline_item_container} ${
                onRight ? styles.timeline_item_container_right : styles.timeline_item_container_left
            }`}
        >
            <div
                className={`${styles.timeline_item_dot_decoration} ${
                    onRight ? styles.timeline_item_dot_decoration_right : styles.timeline_item_dot_decoration_left
                }`}
            />
            <div
                className={
                    onRight
                        ? `${styles.timeline_item_data_container} ${styles.timeline_item_data_container_right}`
                        : styles.timeline_item_data_container
                }
            >
                <div className={styles.timeline_item_dates_container}>
                    {dateFrom} - {dateTo}
                </div>
                <div
                    className={
                        onRight
                            ? `${styles.timeline_item_title_container} ${styles.timeline_item_title_container_right}`
                            : styles.timeline_item_title_container
                    }
                >
                    <div className={styles.timeline_item_title}>{title}</div>
                    <div className={styles.timeline_item_entity}>{entity}</div>
                </div>
                <div className={styles.timeline_item_location}>{location}</div>
                <div className={styles.timeline_item_description}>{DescriptionComponent}</div>
                {techStack.length > 0 && (
                    <div
                        className={styles.timeline_item_tech_stack}
                        style={onRight ? { justifyContent: "flex-end" } : {}}
                    >
                        {techStack.map((item, index) => (
                            <div key={index} className={styles.timeline_item_tech_stack_item_container}>
                                {item &&
                                    item.length > 0 &&
                                    item.map((tech, techIndex) => (
                                        <span key={techIndex} className={styles.timeline_item_tech_stack_item}>
                                            {tech}
                                        </span>
                                    ))}
                                {index < techStack.length - 1 && " // "}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ExperiencesComponent = ({ isTwoColumnSetup, experienceRef, translation }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={experienceRef}
            title={translation("menu.experience")}
            contentComponent={
                <div className={styles.timeline_items_container}>
                    {translation.raw("experiences").map((experience, expIndex) => (
                        <TimeLineComponent
                            key={expIndex}
                            dateFrom={experience.start_date}
                            dateTo={experience.end_date}
                            title={experience.title}
                            entity={experience.company}
                            location={experience.location}
                            DescriptionComponent={
                                <>
                                    {experience.descriptions.map((desc, descIndex) =>
                                        renderDescriptionBlock(desc, `${expIndex}-exp-${descIndex}`)
                                    )}
                                </>
                            }
                            techStack={experience.stack || [[]]}
                        />
                    ))}
                </div>
            }
        />
    );
};

const EducationComponent = ({ isTwoColumnSetup, educationRef, translation }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={educationRef}
            title={translation("menu.education")}
            contentComponent={
                <div className={styles.timeline_items_container}>
                    {translation.raw("education").map((edu, eduIndex) => (
                        <TimeLineComponent
                            key={eduIndex}
                            dateFrom={edu.start_date}
                            dateTo={edu.end_date}
                            title={edu.title}
                            entity={edu.company}
                            location={edu.location}
                            onRight={true}
                            DescriptionComponent={
                                <>
                                    {edu.descriptions.map((desc, descIndex) =>
                                        renderDescriptionBlock(desc, `${eduIndex}-edu-${descIndex}`)
                                    )}
                                </>
                            }
                            techStack={edu.stack || [[]]}
                        />
                    ))}
                </div>
            }
        />
    );
};

const HobbiesComponent = ({ isTwoColumnSetup, hobbiesRef, translation }) => {
    const HobbyComponent = ({ logo, title, DescriptionComponent, onRight = false }) => {
        return (
            <div className={styles.hobby_container}>
                {/* Decorations */}
                <div className={styles.hobby_decoration_top_right} />
                <div className={styles.hobby_decoration_top_right_1} />
                <div className={styles.hobby_decoration_top_right_2} />
                <div className={styles.hobby_decoration_bottom_left} />
                <div className={styles.hobby_decoration_bottom_left_1} />
                <div className={styles.hobby_decoration_bottom_left_2} />
                {/* Title */}
                <div className={styles.hobby_title_container}>
                    {!onRight && <div className={styles.hobby_logo_container}>{logo}</div>}
                    <div className={styles.hobby_title} style={{ justifyContent: onRight ? "flex-end" : "flex-start" }}>
                        {title}
                    </div>
                    {onRight && <div className={styles.hobby_logo_container}>{logo}</div>}
                </div>
                <div
                    className={styles.hobby_title_separator_container}
                    style={{ justifyContent: onRight ? "flex-end" : "flex-start" }}
                >
                    <div className={styles.hobby_title_separator} style={onRight ? { rotate: "180deg" } : {}} />
                </div>
                {/* Description */}
                <div className={styles.hobby_description}>{DescriptionComponent}</div>
            </div>
        );
    };

    function pickIcon(title) {
        const t = title.toLowerCase();
        if (t.includes("sport")) return <SportIcon size={40} secondaryColor={"rgb(255, 68, 0)"} />;
        if (t.includes("lecture") || t.includes("reading"))
            return <BookShelfIcon size={40} secondaryColor={"rgb(255, 68, 0)"} />;
        if (t.includes("video") || t.includes("jeux"))
            return <VideoGame size={40} secondaryColor={"rgb(255, 68, 0)"} />;
        return null;
    }

    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={hobbiesRef}
            title={translation("menu.hobbies")}
            contentComponent={
                <div className={styles.hobbies_container}>
                    {translation.raw("hobbies").map((hobby, hobbyIndex) => (
                        <HobbyComponent
                            key={hobbyIndex}
                            title={hobby.title}
                            logo={pickIcon(hobby.title)}
                            onRight={hobbyIndex % 2 === 1}
                            DescriptionComponent={
                                <>
                                    {hobby.descriptions.map((desc, descIndex) => (
                                        <>
                                            {renderDescriptionBlock(desc, `${hobbyIndex}-hob-${descIndex}`)}
                                            {hobbyIndex === 0 && descIndex === 0 && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        textAlign: "center",
                                                        gap: 10,
                                                        marginBottom: 10,
                                                        marginTop: 10,
                                                    }}
                                                    className={styles.strava_profile_container}
                                                >
                                                    <a
                                                        className={styles.strava_profile_link}
                                                        href={STRAVA_PROFILE}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <div className={styles.strava_profile_text}>Strava</div>
                                                        <StravaIcon size={27} />
                                                    </a>
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </>
                            }
                        />
                    ))}
                </div>
            }
        />
    );
};

export default function Resume() {
    const t = useTranslations("pages.resume");

    const [isTwoColumnSetup, setIsTwoColumnSetup] = useState(false);

    const [currentPart, setCurrentPart] = useState("About");

    const aboutRef = useRef();
    const experienceRef = useRef();
    const educationRef = useRef();
    const hobbiesRef = useRef();

    const PARTS = [
        { name: "About", display: t("menu.about"), ref: aboutRef },
        { name: "Experience", display: t("menu.experience"), ref: experienceRef },
        { name: "Education", display: t("menu.education"), ref: educationRef },
        { name: "Hobbies", display: t("menu.hobbies"), ref: hobbiesRef },
    ];

    function handleWindowSizeChange() {
        if (window.innerWidth > TWO_COLUMNS_BREAKPOINT) {
            setIsTwoColumnSetup(true);
        } else {
            setIsTwoColumnSetup(false);
        }
    }

    function onScroll() {
        const aboutHeight = aboutRef.current.getBoundingClientRect().height;
        const experienceHeight = experienceRef.current.getBoundingClientRect().height;
        const educationHeight = educationRef.current.getBoundingClientRect().height;
        const hobbiesHeight = hobbiesRef.current.getBoundingClientRect().height;

        const totalHeight = aboutHeight + experienceHeight + educationHeight + hobbiesHeight;
        const scrollPercentage = (window.scrollY / (totalHeight - window.innerHeight / 2)) * 100;

        if (scrollPercentage < (aboutHeight / totalHeight) * 100) {
            setCurrentPart("About");
        } else if (scrollPercentage < ((aboutHeight + experienceHeight) / totalHeight) * 100) {
            setCurrentPart("Experience");
        } else if (scrollPercentage < ((aboutHeight + experienceHeight + educationHeight) / totalHeight) * 100) {
            setCurrentPart("Education");
        } else {
            setCurrentPart("Hobbies");
        }
    }

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener("resize", handleWindowSizeChange);
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className={styles.resume_container}>
            <div className={styles.content_container}>
                <div style={{ width: isTwoColumnSetup ? TWO_COLUMNS_PRESENTATION_WIDTH : "100%" }}>
                    <PresentationComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        parts={PARTS}
                        currentPart={currentPart}
                        translation={t}
                    />
                </div>
                <div
                    className={styles.right_component}
                    style={{ width: isTwoColumnSetup ? TWO_COLUMNS_CONTENT_WIDTH : "100%" }}
                >
                    <AboutComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        aboutRef={aboutRef}
                        setCurrentComponent={setCurrentPart}
                        translation={t}
                    />
                    <ExperiencesComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        experienceRef={experienceRef}
                        setCurrentComponent={setCurrentPart}
                        translation={t}
                    />
                    <EducationComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        educationRef={educationRef}
                        setCurrentComponent={setCurrentPart}
                        translation={t}
                    />
                    <HobbiesComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        hobbiesRef={hobbiesRef}
                        setCurrentComponent={setCurrentPart}
                        translation={t}
                    />
                </div>
            </div>
        </div>
    );
}
