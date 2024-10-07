"use client";

import styles from "@/app/resume/page.module.css";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { getNbYears } from "@/utils/dateUtils";
import SportIcon from "@/components/common/icons/misc/SportIcon";
import BookShelfIcon from "@/components/common/icons/misc/BookIcon";
import VideoGame from "@/components/common/icons/misc/VideoGame";

const TWO_COLUMNS_BREAKPOINT = 1200;
const TWO_COLUMNS_PRESENTATION_WIDTH = "39%";
const TWO_COLUMNS_CONTENT_WIDTH = "59%";

const PARTS = ["About", "Experience", "Education", "Hobbies"];

const PresentationComponent = ({ isTwoColumnSetup, currentPart, parts }) => {
    function scrollToComponent(index, ref) {
        if (ref.current) {
            const elementTop = ref.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementTop - (index === 0 ? 170 : 80);

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
            <div className={styles.presentation_job}>Software Engineer</div>
            <div className={styles.presentation_desc}>
                I build reliable data and user-oriented industrial softwares.
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
                                      }
                                    : {}
                            }
                            onClick={() => scrollToComponent(index, part.ref)}
                        >
                            {part.name}
                        </div>
                    ))}
                    <div
                        className={styles.presentation_menu_elevator}
                        style={{ top: PARTS.indexOf(currentPart) * 45 - 5 }}
                    />
                </div>
            )}
        </div>
    );
};

const PartComponent = ({ isTwoColumnSetup, title, reference, setCurrentComponent, contentComponent }) => {
    function onScroll() {
        if (reference.current) {
            const rect = reference.current.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.4) {
                console.log("In view", title);
                setCurrentComponent(title);
            }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div ref={reference} className={styles.part_container}>
            {!isTwoColumnSetup && <div className={styles.part_title}>{title}</div>}
            <div className={styles.part_content}>{contentComponent}</div>
        </div>
    );
};

const AboutComponent = ({ isTwoColumnSetup, aboutRef, setCurrentComponent }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            title="About"
            reference={aboutRef}
            setCurrentComponent={setCurrentComponent}
            contentComponent={
                <>
                    <p>
                        I&apos;m a {getNbYears("12-29-1998")} years old software engineer with more than{" "}
                        <b>{getNbYears("09-01-2020")} years of experience</b> in the field. Like many boys in my
                        generation, I got my first interest in IT thanks to video games and the first forums/IRC
                        channels about various topics I used to visit. From my first Minecraft server hosted on my
                        parents&apos; computer to my first script to automate a boring task, I&apos;ve always been
                        passionate about technology, especially IT.
                    </p>
                    <p>
                        I started my journey into programming in high entity with <b>EasyPIC</b> motherboard and
                        <b>Raspberry PI Uno</b>. Thanks to my teachers, I discovered the basics of programming and
                        electronics, which pushed me to enter engineering studies. There I learned the basics of
                        programming with <b>C</b>, <b>C++</b>, <b>Java</b>, and <b>Web</b>, but most of all{" "}
                        <b>software engineering principles</b> and how to work in a team. I finished my studies with a
                        specialization in <b>High Performance Computing and Data Processing</b>.
                    </p>
                    <p>
                        As I have always been interested in industries, I started my career in both the Oil and Gas
                        industry and the aerospace industry. I worked on various topics such as{" "}
                        <b>parallel computing</b>, <b>real-time data processing</b>, <b>data visualization</b>, building
                        of <b>API</b> and <b>modern web UI</b>. I&apos;m looking for new challenges as a{" "}
                        <b>Software and/or Data Engineer, starting in early 2025</b>.
                    </p>
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
    techStack = [],
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
                    <div className={styles.timeline_item_tech_stack}>
                        {techStack.map((item, index) => (
                            <div key={index} className={styles.timeline_item_tech_stack_item}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ExperiencesComponent = ({ isTwoColumnSetup, experienceRef, setCurrentComponent }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={experienceRef}
            setCurrentComponent={setCurrentComponent}
            title="Experience"
            contentComponent={
                <div className={styles.timeline_items_container}>
                    <TimeLineComponent
                        dateFrom={"MAR. 2023"}
                        dateTo={"PRESENT"}
                        title={"Tech Lead & Full-Stack Engineer"}
                        entity={"TotalEnergies Denmark"}
                        location={"Esbjerg, Denmark"}
                        DescriptionComponent={
                            <>
                                <p>
                                    I&apos;m currently working as a <b>Tech-Lead</b> and <b>Software Engineer</b> at
                                    TotalEnergies Denmark, for the <b>Digital Laboratory (DLAB)</b> team. We create{" "}
                                    <b>PoC softwares</b> for the Production, HSE, Logistics, and C&P departments.{" "}
                                </p>
                                <p>
                                    <b>
                                        Two Applications in the Top 10 of the TotalEnergies &quot;E&P Best
                                        Innovators&quot; awards.
                                    </b>
                                </p>
                                <p>
                                    Structured the development environment to accompany the growth of the team (5
                                    Data-Scientists, 2 Software Enginers). Managed Azure resources and Windows servers.
                                </p>
                                <p>
                                    Developed applications involving <b>Generative AI</b>, complexe user interactions
                                    (tchat, searches, animations), <b>data processing</b>,{" "}
                                    <b>health and usage monitoring</b>, <b>Architecture</b>, and <b>SAP</b> data.
                                </p>
                            </>
                        }
                        techStack={[
                            "React",
                            "NextJS",
                            "Python",
                            "FastAPI",
                            "Pandas",
                            "Numpy",
                            "PostgreSQL",
                            "Windows Server",
                            "Azure",
                            "SAP",
                            "Git/Github",
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
                                    in charge of the development of a software managing ground and satellite
                                    communications, including <b>encryption</b> and <b>decryption</b>.
                                </p>
                                <p>
                                    I developed new features and sub-applications for this project, including a{" "}
                                    <b>new testing framework</b> for unit and integration testing, adhering to strict
                                    quality requirements and code coverage standards.
                                </p>
                            </>
                        }
                        techStack={[
                            "Java",
                            "Netty",
                            "Swing",
                            "Python",
                            "Squish",
                            "C++",
                            "Qt",
                            "Docker",
                            "RedHat",
                            "SNMP",
                            "Git/Gitlab",
                            "Redmine",
                            "Jenkins",
                            "SonarQube",
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
                            "Java",
                            "Swing/AWT",
                            "C++",
                            "C",
                            "Fortran",
                            "Angular",
                            "NodeJS",
                            "Git/Github",
                            "Gerrit",
                            "Sonar",
                            "Jenkins",
                        ]}
                    />
                    <TimeLineComponent
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
                        techStack={["Java", "JavaFX", "ControlFX", "Python", "Fortran", "Bash", "Git/BitBucket"]}
                    />
                    <TimeLineComponent
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
                        techStack={["Java", "Swing/AWT", "Git", "Gerrit"]}
                    />
                    <TimeLineComponent
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
                    />
                </div>
            }
        />
    );
};

const EducationComponent = ({ isTwoColumnSetup, educationRef, setCurrentComponent }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={educationRef}
            setCurrentComponent={setCurrentComponent}
            title="Education"
            contentComponent={
                <div className={styles.timeline_items_container}>
                    <TimeLineComponent
                        title="Master degree in Computer Science"
                        entity="CY-Tech"
                        location="Pau"
                        dateFrom="2018"
                        dateTo="2021"
                        onRight={true}
                        DescriptionComponent={
                            <p>
                                I&apos;m currently working as a Tech-Lead and Software Engineer at TotalEnergies
                                Denmark, where we create PoC software for HSE, Production, CFR (Carbon Footprint
                                Reduction), and Maintenance departments.
                            </p>
                        }
                    />
                    <TimeLineComponent
                        title="One year course in HPC and Data Processing"
                        entity="Univerty of La Coroña"
                        location="La Coroña"
                        dateFrom="2020"
                        dateTo="2021"
                        onRight={true}
                        DescriptionComponent={
                            <p>
                                I&apos;m currently working as a Tech-Lead and Software Engineer at TotalEnergies
                                Denmark, where we create PoC software for HSE, Production, CFR (Carbon Footprint
                                Reduction), and Maintenance departments.
                            </p>
                        }
                    />
                    <TimeLineComponent
                        title="Preparatory class for engineering schools"
                        entity="Saint-Cricq High School"
                        location="Pau"
                        dateFrom="2016"
                        dateTo="2018"
                        onRight={true}
                        DescriptionComponent={
                            <p>
                                I&apos;m currently working as a Tech-Lead and Software Engineer at TotalEnergies
                                Denmark, where we create PoC software for HSE, Production, CFR (Carbon Footprint
                                Reduction), and Maintenance departments.
                            </p>
                        }
                    />
                </div>
            }
        />
    );
};

const HobbiesComponent = ({ isTwoColumnSetup, hobbiesRef, setCurrentComponent }) => {
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
            setCurrentComponent={setCurrentComponent}
            title="Hobbies"
            contentComponent={
                <div className={styles.hobbies_container}>
                    <HobbyComponent
                        title={"Sport"}
                        logo={<SportIcon size={40} secondaryColor={"rgb(255, 68, 0)"} />}
                        DescriptionComponent={
                            <div>
                                <p>
                                    I spend a lot of time doing sports. I&lsquo;m currently training for thriatlon after
                                    having completed my first marathon in Copenhaguen in May 2024.
                                </p>
                            </div>
                        }
                    />
                    <HobbyComponent
                        title={"Reading"}
                        logo={<BookShelfIcon size={40} secondaryColor={"rgb(255, 68, 0)"} />}
                        onRight={true}
                        DescriptionComponent={
                            <p>
                                I love to read books. From &apos;A song of ice and fire&apos; to &apos;The Grand
                                Chessboard&apos;, I read articles and books on a large variety of topics.
                            </p>
                        }
                    />
                    <HobbyComponent
                        title={"Video Games"}
                        logo={<VideoGame size={40} secondaryColor={"rgb(255, 68, 0)"} />}
                        DescriptionComponent={
                            <p>
                                I started to be interested in IT thanks to online video games (Counter Strike!). I still
                                play, less than before, to singleplayer games.
                            </p>
                        }
                    />
                </div>
            }
        />
    );
};

export default function Resume() {
    const [isTwoColumnSetup, setIsTwoColumnSetup] = useState(false);

    const [currentPart, setCurrentPart] = useState("About");

    const aboutRef = useRef();
    const experienceRef = useRef();
    const educationRef = useRef();
    const hobbiesRef = useRef();

    function handleWindowSizeChange() {
        if (window.innerWidth > TWO_COLUMNS_BREAKPOINT) {
            setIsTwoColumnSetup(true);
        } else {
            setIsTwoColumnSetup(false);
        }
    }

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return (
        <div className={styles.resume_container}>
            <div className={styles.content_container}>
                <div style={{ width: isTwoColumnSetup ? TWO_COLUMNS_PRESENTATION_WIDTH : "100%" }}>
                    <PresentationComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        parts={[
                            { name: "About", ref: aboutRef },
                            { name: "Experience", ref: experienceRef },
                            { name: "Education", ref: educationRef },
                            { name: "Hobbies", ref: hobbiesRef },
                        ]}
                        currentPart={currentPart}
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
                    />
                    <ExperiencesComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        experienceRef={experienceRef}
                        setCurrentComponent={setCurrentPart}
                    />
                    <EducationComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        educationRef={educationRef}
                        setCurrentComponent={setCurrentPart}
                    />
                    <HobbiesComponent
                        isTwoColumnSetup={isTwoColumnSetup}
                        hobbiesRef={hobbiesRef}
                        setCurrentComponent={setCurrentPart}
                    />
                </div>
            </div>
        </div>
    );
}
