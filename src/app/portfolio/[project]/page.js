'use server'

import styles from "@/app/portfolio/[project]/page.module.css";

import Image from "next/image";
import Link from "next/link";

import fs from "fs";

import matter from "gray-matter";
import md from "markdown-it";

import { PORTFOLIO_FOLDER_PATH } from "@/utils/linkUtils";

export default async function Page({ params }) {
    const readFile = fs.readFileSync(PORTFOLIO_FOLDER_PATH + params.project + ".md", "utf-8");
    const { data, content } = matter(readFile);

    return (
        <div className={styles.container}>
            <div className={styles.post_container}>
                <Link className={styles.back_to_blog_button} href="/portfolio">
                    {"< Back to Portfolio"}
                </Link>
                <div>
                <div className={styles.title}>{data.title}</div>
                        <div>
                            Started on <span className={styles.date}>{data.created}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.image_container}>
                    <Image
                        src={`/portfolio/images/${data.image}`}
                        alt={"Main image of the project " + data.title}
                        width={1000}
                        height={1000}
                        className={styles.image}
                    />
                </div>
                <div className={styles.github_link_container}>
                    <Link href={data.github} className={styles.github_link} target="_blank">
                        View on GitHub
                    </Link>
                </div>
                <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
            </div>
        </div>
    );
}
