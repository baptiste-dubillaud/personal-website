'use server'

import styles from "@/app/blog/[post]/page.module.css";

import Image from "next/image";

import fs from "fs";

import matter from "gray-matter";
import md from "markdown-it";

import InternalNavigationButton from "@/components/common/buttons/InternalNavigationButton/InternalNavButton";
import { BLOG_FOLDER_PATH } from "@/utils/linkUtils";

export default async function Page({ params }) {
    const readFile = fs.readFileSync(BLOG_FOLDER_PATH + params.post + ".md", "utf-8");
    const { data, content } = matter(readFile);

    return (
        <div className={styles.container}>
            <InternalNavigationButton className={styles.back_to_blog_button} text={"< Back to Blog"} path="/blog" />
            <div className={styles.title}>{data.title}</div>
            <div className={styles.writing_data}>
                <div className={styles.author_container}>
                    By <span className={styles.author_name}>{data.author}</span>
                </div>
                <div className={styles.date_data}>
                    <div>
                        Written on <span className={styles.date}>{data.created}</span>
                    </div>
                    {data.updated && (
                        <div>
                            Updated on <span className={styles.date}>{data.updated}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.image_container}>
                <Image
                    src={data.image}
                    alt={"Main image of article " + data.title}
                    width={1000}
                    height={1000}
                    className={styles.image}
                />
            </div>
            <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        </div>
    );
}
