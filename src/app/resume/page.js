"use client";

import styles from "@/app/resume/page.module.css";

import { useEffect, useRef, useState } from "react";

import { getNbYears } from "@/utils/dateUtils";

const TWO_COLUMNS_BREAKPOINT = 1200;
const TWO_COLUMNS_PRESENTATION_WIDTH = "39%";
const TWO_COLUMNS_CONTENT_WIDTH = "59%";

const PresentationComponent = ({ isTwoColumnSetup, currentPart, parts }) => {
    return (
        <div className={styles.presentation_container}>
            {/* Presentation data */}
            <div className={styles.presentation_name}>Baptiste Dubillaud</div>
            <div className={styles.presentation_job}>Software Engineer</div>
            <div className={styles.presentation_desc}>
                I build PoC softwares on various topics for the Oil and Gas industry.
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
                            onClick={() => part.ref.current.scrollIntoView({ block: "start", behavior: "smooth" })}
                        >
                            {part.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PartComponent = ({ isTwoColumnSetup, title, reference, setCurrentComponent, contentComponent }) => {
    function onScroll() {
        /*  if (reference.current) {
            const rect = reference.current.getBoundingClientRect();
            console.log(reference.current.);
            if (rect.top < window.innerHeight * 0.25) {
                console.log("In view", title);
                setCurrentComponent(title);
            }
        } */
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
                        {getNbYears("09-01-2020")} years of experience in the field. Like many boys in my generation, I
                        got my first interest in IT thanks to video games and the first forums/IRC channels about
                        various topics I used to visit. From my first Minecraft server hosted on my parents&apos;
                        computer to my first script to automate a boring task, I&apos;ve always been passionate about
                        technology, especially in IT.
                    </p>
                    <p>
                        I started my journey into programming in high school with EasyPIC motherboard and Raspberry PI
                        Uno. Thanks to my teachers, I discovered the basics of programming and electronics, which pushed
                        me to enter engineering studies. There I learned the basics of programming with C, C++, Java,
                        and Web, but most of all software engineering principles and how to work in a team. I finished
                        my studies with a specialization in High Performance Computing and Data Processing.
                    </p>
                    <p>
                        As I have always been interested in industries, I started my career in both the Oil and Gas
                        industry and the aerospace industry. I worked on various topics such as parallel computing,
                        real-time data processing, and data visualization. I&apos;m currently a Tech-Lead and Software
                        Engineer at TotalEnergies Denmark, where we create PoC software for HSE, Production, CFR (Carbon
                        Footprint Reduction), and Maintenance departments.
                    </p>
                </>
            }
        />
    );
};

const ExperienceComponent = ({ isTwoColumnSetup, experienceRef, setCurrentComponent }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={experienceRef}
            setCurrentComponent={setCurrentComponent}
            title="Experience"
            contentComponent={
                <>
                    <p>
                        I&apos;m a {getNbYears("12-29-1998")} years old software engineer with more than{" "}
                        {getNbYears("09-01-2020")} years of experience in the field. Like many boys in my generation, I
                        got my first interest in IT thanks to video games and the first forums/IRC channels about
                        various topics I used to visit. From my first Minecraft server hosted on my parents&apos;
                        computer to my first script to automate a boring task, I&apos;ve always been passionate about
                        technology, especially in IT.
                    </p>
                    <p>
                        I started my journey into programming in high school with EasyPIC motherboard and Raspberry PI
                        Uno. Thanks to my teachers, I discovered the basics of programming and electronics, which pushed
                        me to enter engineering studies. There I learned the basics of programming with C, C++, Java,
                        and Web, but most of all software engineering principles and how to work in a team. I finished
                        my studies with a specialization in High Performance Computing and Data Processing.
                    </p>
                    <p>
                        As I have always been interested in industries, I started my career in both the Oil and Gas
                        industry and the aerospace industry. I worked on various topics such as parallel computing,
                        real-time data processing, and data visualization. I&apos;m currently a Tech-Lead and Software
                        Engineer at TotalEnergies Denmark, where we create PoC software for HSE, Production, CFR (Carbon
                        Footprint Reduction), and Maintenance departments.
                    </p>
                </>
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
                <>
                    <p>
                        I&apos;m a {getNbYears("12-29-1998")} years old software engineer with more than{" "}
                        {getNbYears("09-01-2020")} years of experience in the field. Like many boys in my generation, I
                        got my first interest in IT thanks to video games and the first forums/IRC channels about
                        various topics I used to visit. From my first Minecraft server hosted on my parents&apos;
                        computer to my first script to automate a boring task, I&apos;ve always been passionate about
                        technology, especially in IT.
                    </p>
                    <p>
                        I started my journey into programming in high school with EasyPIC motherboard and Raspberry PI
                        Uno. Thanks to my teachers, I discovered the basics of programming and electronics, which pushed
                        me to enter engineering studies. There I learned the basics of programming with C, C++, Java,
                        and Web, but most of all software engineering principles and how to work in a team. I finished
                        my studies with a specialization in High Performance Computing and Data Processing.
                    </p>
                    <p>
                        As I have always been interested in industries, I started my career in both the Oil and Gas
                        industry and the aerospace industry. I worked on various topics such as parallel computing,
                        real-time data processing, and data visualization. I&apos;m currently a Tech-Lead and Software
                        Engineer at TotalEnergies Denmark, where we create PoC software for HSE, Production, CFR (Carbon
                        Footprint Reduction), and Maintenance departments.
                    </p>
                </>
            }
        />
    );
};

const HobbiesComponent = ({ isTwoColumnSetup, hobbiesRef, setCurrentComponent }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            reference={hobbiesRef}
            setCurrentComponent={setCurrentComponent}
            title="Hobbies"
            contentComponent={
                <>
                    <p>
                        I&apos;m a {getNbYears("12-29-1998")} years old software engineer with more than{" "}
                        {getNbYears("09-01-2020")} years of experience in the field. Like many boys in my generation, I
                        got my first interest in IT thanks to video games and the first forums/IRC channels about
                        various topics I used to visit. From my first Minecraft server hosted on my parents&apos;
                        computer to my first script to automate a boring task, I&apos;ve always been passionate about
                        technology, especially in IT.
                    </p>
                    <p>
                        I started my journey into programming in high school with EasyPIC motherboard and Raspberry PI
                        Uno. Thanks to my teachers, I discovered the basics of programming and electronics, which pushed
                        me to enter engineering studies. There I learned the basics of programming with C, C++, Java,
                        and Web, but most of all software engineering principles and how to work in a team. I finished
                        my studies with a specialization in High Performance Computing and Data Processing.
                    </p>
                    <p>
                        As I have always been interested in industries, I started my career in both the Oil and Gas
                        industry and the aerospace industry. I worked on various topics such as parallel computing,
                        real-time data processing, and data visualization. I&apos;m currently a Tech-Lead and Software
                        Engineer at TotalEnergies Denmark, where we create PoC software for HSE, Production, CFR (Carbon
                        Footprint Reduction), and Maintenance departments.
                    </p>
                </>
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
                    <ExperienceComponent
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
