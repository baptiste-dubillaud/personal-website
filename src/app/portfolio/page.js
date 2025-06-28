'use server'

import styles from "@/app/portfolio/page.module.css";

import Image from "next/image";
import Link from "next/link";

import fs from "fs";

import matter from "gray-matter";

import { PORTFOLIO_FOLDER_PATH } from "@/utils/linkUtils";

const ProjectContainer = ({ title, description, image, technologies, github, demo, date }) => {
    return (
        <div className={styles.project_container}>
            <div className={styles.project_image_container}>
                <Image 
                    src={image} 
                    alt={`Screenshot of ${title} project`} 
                    fill={true} 
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className={styles.project_content}>
                <div>
                    <div className={styles.project_header}>
                        <div>
                            <div className={styles.project_title}>{title}</div>
                            <div className={styles.project_date}>Started in {date}</div>
                        </div>
                    </div>
                    <div className={styles.project_description}>{description}</div>
                </div>
                <div className={styles.project_footer}>
                    <div className={styles.project_technologies}>
                        {technologies?.map((tech, index) => (
                            <span key={index} className={styles.technology_tag}>
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className={styles.project_links}>
                        {github && (
                            <Link href={github} className={styles.project_link} target="_blank">
                                GitHub
                            </Link>
                        )}
                        {demo && (
                            <Link href={demo} className={styles.project_link} target="_blank">
                                Live Demo
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default async function Portfolio({}) {
    const files = fs.readdirSync(PORTFOLIO_FOLDER_PATH);

    const projects = files
        .filter((fileName) => fileName.endsWith('.md')) // Only process .md files
        .map((fileName) => {
            const project = fileName.replace(".md", "");
            const readFile = fs.readFileSync(PORTFOLIO_FOLDER_PATH + fileName, "utf-8");

            const { data } = matter(readFile);

            return {
                project,
                data,
            };
        })
        .sort((a, b) => new Date(b.data.created) - new Date(a.data.created)); // Sort by date, newest first

    return (
        <div className={styles.portfolio_container}>
            <div className={styles.portfolio_title}>My Portfolio</div>
            <div className={styles.portfolio_subtitle}>
                Here are some of the projects I&apos;ve worked on. Each project showcases different technologies and skills I&apos;ve developed over time.
            </div>
            <div className={styles.projects_list}>
                {projects.map((item, index) => {
                    return (
                        <ProjectContainer
                            key={index}
                            title={item.data.title}
                            description={item.data.description}
                            image={`/portfolio/images/${item.data.image}`}
                            technologies={item.data.technologies}
                            github={item.data.github}
                            demo={item.data.demo}
                            date={item.data.created}
                        />
                    );
                })}
            </div>
        </div>
    );
}