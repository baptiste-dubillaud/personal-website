"use client";

import styles from "@/app/resume/page.module.css";
import { useEffect, useRef, useState } from "react";

const TWO_COLUMNS_BREAKPOINT = 1200;
const TWO_COLUMNS_PRESENTATION_WIDTH = "40%";
const TWO_COLUMNS_CONTENT_WIDTH = "60%";

const PresentationComponent = ({ isTwoColumnSetup }) => {
    return (
        <div
            className={styles.presentation_container}
            style={{ width: isTwoColumnSetup ? TWO_COLUMNS_PRESENTATION_WIDTH : "100%" }}
        >
            <div className={styles.presentation_name}>Baptiste Dubillaud</div>
            <div className={styles.presentation_job}>Software Engineer</div>
            <div className={styles.presentation_desc}>
                I build PoC softwares on various topics for the Oil and Gas industry.
            </div>
        </div>
    );
};

const PartComponent = ({ isTwoColumnSetup, title, contentComponent }) => {
    return (
        <>
            <div className={styles.part_title}>{title}</div>
            <div className={styles.part_container}>
                {!isTwoColumnSetup && <div className={styles.part_title}>{title}</div>}
                {contentComponent}
            </div>
        </>
    );
};

const AboutComponent = ({ isTwoColumnSetup }) => {
    return (
        <PartComponent
            isTwoColumnSetup={isTwoColumnSetup}
            title="About"
            contentComponent={
                <p>
                    I am a software engineer with 5 years of experience in the Oil and Gas industry. I have worked on
                    various topics such as data visualization, data analysis, and automation. I am passionate about
                    software development and I am always looking for new challenges. I am a software engineer with 5
                    years of experience in the Oil and Gas industry. I have worked on various topics such as data
                    visualization, data analysis, and automation. I am passionate about software development and I am
                    always looking for new challenges. I am a software engineer with 5 years of experience in the Oil
                    and Gas industry. I have worked on various topics such as data visualization, data analysis, and
                    automation. I am passionate about software development and I am always looking for new challenges. I
                    am a software engineer with 5 years of experience in the Oil and Gas industry. I have worked on
                    various topics such as data visualization, data analysis, and automation. I am passionate about
                    software development and I am always looking for new challenges. I am a software engineer with 5
                    years of experience in the Oil and Gas industry. I have worked on various topics such as data
                    visualization, data analysis, and automation. I am passionate about software development and I am
                    always looking for new challenges. I am a software engineer with 5 years of experience in the Oil
                    and Gas industry. I have worked on various topics such as data visualization, data analysis, and
                    automation. I am passionate about software development and I am always looking for new challenges. I
                    am a software engineer with 5 years of experience in the Oil and Gas industry. I have worked on
                    various topics such as data visualization, data analysis, and automation. I am passionate about
                    software development and I am always looking for new challenges. I am a software engineer with 5
                    years of experience in the Oil and Gas industry. I have worked on various topics such as data
                    visualization, data analysis, and automation. I am passionate about software development and I am
                    always looking for new challenges. I am a software engineer with 5 years of experience in the Oil
                    and Gas industry. I have worked on various topics such as data visualization, data analysis, and
                    automation. I am passionate about software development and I am always looking for new challenges. I
                    am a software engineer with 5 years of experience in the Oil and Gas industry. I have worked on
                    various topics such as data visualization, data analysis, and automation. I am passionate about
                    software development and I am always looking for new challenges. I am a software engineer with 5
                    years of experience in the Oil and Gas industry. I have worked on various topics such as data
                    visualization, data analysis, and automation. I am passionate about software development and I am
                    always looking for new challenges.
                </p>
            }
        />
    );
};

const ExperiencesComponent = ({ isTwoColumnSetup }) => {
    return (
        <div>
            {!isTwoColumnSetup && <h2>Experiences</h2>}
            zefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzefzef
        </div>
    );
};

const EducationComponent = ({ isTwoColumnSetup }) => {
    return <div>{!isTwoColumnSetup && <h2>Education</h2>}</div>;
};

const HobbiesComponent = ({ isTwoColumnSetup }) => {
    return <div>{!isTwoColumnSetup && <h2>Experiences</h2>}</div>;
};

export default function Resume() {
    const [isTwoColumnSetup, setIsTwoColumnSetup] = useState(false);

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
                <PresentationComponent isTwoColumnSetup={isTwoColumnSetup} />
                <div
                    className={styles.right_component}
                    style={{ width: isTwoColumnSetup ? TWO_COLUMNS_CONTENT_WIDTH : "100%" }}
                >
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <AboutComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <ExperiencesComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <EducationComponent isTwoColumnSetup={isTwoColumnSetup} />
                    <HobbiesComponent isTwoColumnSetup={isTwoColumnSetup} />
                </div>
            </div>
        </div>
    );
}
