"use client";

import styles from "@/app/resume/page.module.css";
import { useEffect, useRef, useState } from "react";

export default function Resume() {
    const sections = [
        { id: 1, color: "rgba(255, 0, 0, 0.6)", ref: useRef() },
        { id: 2, color: "rgba(255, 255, 0, 0.6)", ref: useRef() },
        { id: 3, color: "rgba(255, 0, 255, 0.6)", ref: useRef() },
        { id: 4, color: "rgba(0, 255, 0, 0.6)", ref: useRef() },
        { id: 5, color: "rgba(0, 255, 255, 0.6)", ref: useRef() },
    ];

    const [currentSection, setCurrentSection] = useState(-1);

    useEffect(() => {
        if (currentSection > -1 && currentSection < sections.length) {
            console.log("currentSection", currentSection);
            sections[currentSection].ref.current.scrollIntoView({
                behaviour: "smooth",
            });
        }
    }, [currentSection]);

    useEffect(() => {
        window.addEventListener("wheel", handleScroll);
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const handleScroll = (event) => {
        if (event.deltaY > 0) {
            setCurrentSection((prevSection) => Math.min(prevSection + 1, sections.length - 1));
        } else {
            setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
        }
    };

    return (
        <div>
            {sections.map((section, index) => (
                <div
                    ref={section.ref}
                    key={section.id}
                    style={{
                        minHeight: "calc(100vh - 13px)",
                        backgroundColor: section.color,
                    }}
                >
                    Section {index}
                    <div style={{ height: index * 500 }}></div>
                </div>
            ))}
        </div>
    );
}
