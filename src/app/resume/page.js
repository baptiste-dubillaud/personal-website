"use client";

import styles from "@/app/resume/page.module.css";

import { useEffect, useRef, useState } from "react";

import { getNbYears } from "@/utils/dateUtils";
import { STRAVA_PROFILE } from "@/utils/linkUtils";
import SportIcon from "@/components/common/icons/misc/SportIcon";
import BookShelfIcon from "@/components/common/icons/misc/BookIcon";
import VideoGame from "@/components/common/icons/misc/VideoGame";
import StravaIcon from "@/components/common/icons/apps/StravaIcon";
import NavigationButton from "@/components/common/buttons/navigation/NavigationButton";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";
import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import { LINKEDIN_PROFILE, MEDIUM_PROFILE, GITHUB_PROFILE } from "@/utils/linkUtils";
import { useTranslations, useLocale } from "next-intl";

const TWO_COLUMNS_BREAKPOINT = 1200;
const TWO_COLUMNS_PRESENTATION_WIDTH = "39%";
const TWO_COLUMNS_CONTENT_WIDTH = "59%";

const PresentationComponent = ({ isTwoColumnSetup, currentPart, parts, translation }) => {
    const locale = useLocale();

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
                <NavigationButton link={`${LINKEDIN_PROFILE}?locale=${locale}`} alt="LinkedIn profile">
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
                    {translation.raw("about.paragraphs").map((paragraph, index) => {
                        return (
                            <p key={index}>
                                {translation.rich(`about.paragraphs.${index}`, {
                                    age,
                                    experience,
                                    bold: (chunks) => <b>{chunks}</b>,
                                })}
                            </p>
                        );
                    })}
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
                    <TimeLineComponent
                        dateFrom={"APR. 2025"}
                        dateTo={"PRESENT"}
                        title={"Senior Software Engineer"}
                        entity={"ThinkDeep AI"}
                        location={"Bordeaux, France"}
                        DescriptionComponent={
                            <>
                                <p>
                                    I am currently working as a <b>Senior Software Engineer</b> at <b>ThinkDeep AI</b>,
                                    a startup specialized in developing <b>AI-powered software solutions</b>.
                                </p>

                                <ul>
                                    <li>
                                        <b>DeepBrain :</b> platform extracting the knowledge from documents & data using
                                        online and on-premise LLM.
                                        <ul>
                                            <li>
                                                Designed and implemented a group feature, integrated with{" "}
                                                <b>Azure Entra ID</b>, enabling secure knowledge and assistants sharing.
                                            </li>
                                            <li>
                                                Added <b>LLM tools</b> and <b>MCP servers</b>.
                                            </li>
                                            <li>
                                                Improved the user experience with new UI components and better
                                                performance.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>AI Assistant :</b> working for <b>DGFiP</b> (French tax administration) to
                                        build an AI platform for public agents.
                                        <ul>
                                            <li>Development of administration features (users, prompts, alerts).</li>
                                            <li>
                                                Improved overall project code quality by refactoring and formalization
                                                of practices.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                                <p>
                                    I also mentor and help younger developers with best practices and technical
                                    guidance.
                                </p>

                                <p>
                                    Exhibitor at <b>NVIDIA GTC Europe</b> in Paris.
                                </p>
                            </>
                        }
                        techStack={[
                            ["React", "Next.js", "Vue.js"],
                            ["Python", "FastAPI", "SQLAlchemy"],
                            ["PostgreSQL", "pg-vector"],
                            ["Docker", "Alembic", "Poetry"],
                            ["Azure Entra ID"],
                        ]}
                    />
                    <TimeLineComponent
                        dateFrom={"MAR. 2023"}
                        dateTo={"MAR. 2025"}
                        title={"Tech Lead & Full-Stack Engineer"}
                        entity={"TotalEnergies Denmark"}
                        location={"Esbjerg, Denmark"}
                        DescriptionComponent={
                            <>
                                <p>
                                    I worked as a <b>Tech-Lead</b> and <b>Software Engineer</b> at TotalEnergies
                                    Denmark, for the <b>Digital Laboratory (DLAB)</b> team, creating{" "}
                                    <b>PoC softwares</b> for the Production, HSE, Logistics, and C&P departments.{" "}
                                </p>
                                <p>
                                    I structured the development environment to accompany the growth of the team (5
                                    Data-Scientists, 2 Software Engineers). I managed Azure resources and Windows
                                    servers.
                                </p>
                                <p>
                                    I designed and developed applications involving <b>Generative AI</b>, complexe user
                                    interactions (chat, searches, animations), <b>data processing</b>,{" "}
                                    <b>health and usage monitoring</b>, and <b>SAP</b> data integration.
                                </p>
                                <p>
                                    <b>
                                        Two Applications in the Top 10 of the TotalEnergies &quot;E&P Best
                                        Innovators&quot; awards.
                                    </b>
                                </p>
                            </>
                        }
                        techStack={[
                            ["React", "Next.js"],
                            ["Python", "FastAPI", "Pandas", "Numpy"],
                            ["PostgreSQL"],
                            ["SAP", "PI-Vision"],
                            ["Windows Server", "Azure"],
                        ]}
                    />
                    <TimeLineComponent
                        dateFrom={"OCT. 2021"}
                        dateTo={"FEB. 2023"}
                        title={"Software Engineer"}
                        entity={"Airbus Defense & Space"}
                        location={"Toulouse, France"}
                        DescriptionComponent={
                            <>
                                <p>
                                    On behalf of <b>Viveris Technologies</b>, I was part of a team of <b>5 engineers</b>{" "}
                                    in charge of the development of a software managing{" "}
                                    <b>ground and satellite communications</b>, including <b>encryption</b> and{" "}
                                    <b>decryption</b>.
                                </p>
                                <p>
                                    I developed new features and sub-applications for this project, including a{" "}
                                    <b>new testing framework</b> for unit and integration testing, adhering to strict
                                    quality requirements and code coverage standards.
                                </p>
                            </>
                        }
                        techStack={[
                            ["Java", "JavaFX", "Swing", "Netty"],
                            ["Python", "Squish"],
                            ["C++", "Qt"],
                            ["RedHat", "SNMP"],
                            ["Redmine", "Jenkins", "SonarQube"],
                        ]}
                    />
                    <TimeLineComponent
                        dateFrom={"SEPT. 2020"}
                        dateTo={"SEPT. 2021"}
                        title={"Software Engineer"}
                        entity={"TotalEnergies"}
                        location={"Pau, France"}
                        DescriptionComponent={
                            <>
                                <p>
                                    Member of the AVO <b>geophysicist team</b>, I worked on a new set of{" "}
                                    <b>computation algorithms</b> and <b>visualization tools</b> for the SISMAGE-CIG
                                    geophysics platform owned by TotalEnergies.
                                </p>
                                <p>
                                    I also managed <b>3 interns</b> to develop a web application containing small
                                    geophysics tools.
                                </p>
                            </>
                        }
                        techStack={[
                            ["Java", "JavaFX", "Swing/AWT"],
                            ["C++", "C", "Fortran"],
                            ["Angular", "NodeJS"],
                            ["Gerrit", "SonarQube", "Jenkins"],
                        ]}
                    />
                    {/* <TimeLineComponent
                        dateFrom={"MAY 2019"}
                        dateTo={"AUG. 2019"}
                        title={"Software Developer Internship"}
                        entity={"TotalEnergies"}
                        location={"Pau, France"}
                        DescriptionComponent={
                            <>
                                <p>
                                    <b>Design</b> and <b>development</b> from scratch of a well water injection
                                    simulation software. This software had to wrap a Fortran simulation engine and
                                    allows for different kinds of simulations, data visualization, and data export.
                                </p>
                                <p>
                                    The difficulty was to make the architecture open for multiple simulations
                                    (thousands) for statistical analysis, but still allowing unit conversion of input
                                    and output data as well as visualization.
                                </p>
                                <p>
                                    More than <b>140 parameters per simulation</b> to handle, so{" "}
                                    <b>I fell in love with Design Patterns</b>.
                                </p>
                            </>
                        }
                        techStack={[
                            ["Java", "JavaFX", "ControlFX"], 
                            ["Python", "Fortran"], 
                            ["Bash", "VBA"]
                        ]}
                    /> */}
                    {/* <TimeLineComponent
                        dateFrom={"MAY 2018"}
                        dateTo={"AUG. 2018"}
                        title={"Software Developer Internship"}
                        entity={"TotalEnergies"}
                        location={"Pau, France"}
                        DescriptionComponent={
                            <p>
                                Development of <b>vizualisation tools</b> on SISMAGE-CIG, the geophysics platform of
                                TotalEnergies on behalf of the <b>geophysics AVO</b> team.
                            </p>
                        }
                        techStack={[["Java", "Swing/AWT", "Git", "Gerrit"]]}
                    /> */}
                    {/* <TimeLineComponent
                        dateFrom={"JUN. 2018"}
                        dateTo={"AUG. 2019"}
                        title={"Salesman - Student Position"}
                        entity={"Conforama"}
                        location={"Pau, France"}
                        DescriptionComponent={
                            <p>
                                Seller of household appliances and furniture during the summer holidays and every
                                thursday afternoon saturdays during the school year.
                            </p>
                        }
                    /> */}
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
                    <TimeLineComponent
                        title="Master degree in Computer Science"
                        entity="CY-Tech"
                        location="Pau, France"
                        dateFrom="2018"
                        dateTo="2021"
                        onRight={true}
                        DescriptionComponent={
                            <>
                                <p>
                                    I learned the basics of programming with <b>C</b>, <b>C++</b>, <b>Java</b>, and Web,
                                    but most of all <b>software engineering principles</b>. specialization in{" "}
                                    <b>Big Data frameworks</b> through Big Data Analytics classes on last year.
                                </p>
                            </>
                        }
                        techStack={[
                            ["Java", "Spark"],
                            ["Python", "Pandas", "NumPy", "OpenCV"],
                            ["C", "C++", "Fortran"],
                            ["HTML", "CSS", "JS", "React-Native"],
                        ]}
                    />
                    <TimeLineComponent
                        title="One year course in HPC and Data Processing"
                        entity="Univerty of La Coroña"
                        location="La Coroña, Spain"
                        dateFrom="2020"
                        dateTo="2021"
                        onRight={true}
                        DescriptionComponent={
                            <>
                                <p>
                                    Learned the basics of <b>HPC architectures</b>, <b>CPU/GPU programming</b>, and
                                    <b>large parallel data processing</b>.
                                </p>
                                <p>
                                    Final Project: Development and <b>optimization</b> of an algorithm to filter data
                                    cubes from <b>seismic imaging</b> on Pangea II HPC at TotalEnergies.
                                </p>
                            </>
                        }
                        techStack={[
                            ["CUDA", "MPI", "OpenMP", "OpenCV"],
                            ["C", "C++", "Fortran"],
                        ]}
                    />
                    <TimeLineComponent
                        title="Preparatory class for engineering schools"
                        entity="Saint-Cricq High School"
                        location="Pau, France"
                        dateFrom="2016"
                        dateTo="2018"
                        onRight={true}
                        DescriptionComponent={
                            <p>
                                <b>2</b> years of intensive course in <b>mathematics</b>, <b>physics</b>,{" "}
                                <b>chemistry</b>, and <b>engineering sciences</b> to prepare for the entrance exams of
                                engineering schools.
                            </p>
                        }
                    />
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

    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={hobbiesRef}
            title={translation("menu.hobbies")}
            contentComponent={
                <div className={styles.hobbies_container}>
                    <HobbyComponent
                        title={"Sport"}
                        logo={<SportIcon size={40} secondaryColor={"rgb(255, 68, 0)"} />}
                        DescriptionComponent={
                            <>
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
                                <div>
                                    I spend a lot of time doing sports. I&lsquo;m currently training for triathlon after
                                    having completed my second marathon in Biarritz in May 2025 and my first triathlon
                                    in June 2025. I also like from time to time to play padel, or hike.
                                </div>
                                <div className={styles.hobby_description_95}>
                                    <h4>PR</h4> Marathon: 3h 44m w/ 500 mD+, Half-Marathon: 1h 42m, Triathlon (S): 1h
                                    38m
                                </div>
                                <div className={styles.hobby_description_95}>
                                    <h4>2025 - France, Belgium</h4>
                                    <ul>
                                        <li>
                                            <h4>Marathon :</h4> Biarritz - 500 mD+ - 3h44
                                        </li>
                                        <li>
                                            <h4>Half-Marathon :</h4> Nay, Brussels
                                        </li>
                                        <li>
                                            <h4>Triathlon :</h4> Pau (S) - 1h38
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.hobby_description_95}>
                                    <h4>2024 - Denmark, France</h4>
                                    <ul>
                                        <li>
                                            <h4>Trails :</h4> Fur Ultra (25 kms/ 600mD+), Climb of Aubisque (18kms/
                                            1200mD+)
                                        </li>
                                        <li>
                                            <h4>Marathon :</h4> Copenhaguen - 3h53
                                        </li>
                                        <li>
                                            <h4>Half-Marathon :</h4> Esbjerg, Fanø
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.hobby_description_95}>
                                    <h4>2023 - Denmark, France</h4>
                                    <ul>
                                        <li>
                                            <h4>Trails :</h4> Climb of Aubisque (18kms/ 1200mD+)
                                        </li>
                                        <li>
                                            <h4>Half-Marathon :</h4> Esbjerg, Odense
                                        </li>
                                        <li>
                                            <h4>Others :</h4> West Coast Run (10kms), Color Fun Esbjerg (5kms)
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.hobby_description_95} style={{ marginBottom: 10 }}>
                                    And many mores before...
                                </div>
                            </>
                        }
                    />
                    <HobbyComponent
                        title={"Reading"}
                        logo={<BookShelfIcon size={40} secondaryColor={"rgb(255, 68, 0)"} />}
                        onRight={true}
                        DescriptionComponent={
                            <>
                                <p>
                                    I love to read books even if I don&apos;t read as much as I would like. From &apos;
                                    <b>A song of ice and fire</b>&apos;, to &apos;<b>The Grand Chessboard</b>&apos;, I
                                    read fictions or articles and books on a large variety of topics.
                                </p>
                                <p>
                                    One of my favorite book is <b>Why we sleep?</b> by <b>Matthew Walker</b>, an amazing
                                    book to understand why we sleep and how it works.
                                </p>
                            </>
                        }
                    />
                    <HobbyComponent
                        title={"Video Games"}
                        logo={<VideoGame size={40} secondaryColor={"rgb(255, 68, 0)"} />}
                        DescriptionComponent={
                            <>
                                <p>
                                    I started to be interested in IT thanks to competitive online video games (Counter
                                    Strike). I still play, less than before, to singleplayer games.
                                </p>
                                <p>
                                    My favorite video games: <b>Urban Terror</b>, <b>Battlefield 3</b>,{" "}
                                    <b>Cyberpunk 2077</b>, <b>Age of Empires II</b>, <b>Mass Effect</b>.
                                </p>
                            </>
                        }
                    />
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
