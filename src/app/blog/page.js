'use server'

import styles from "@/app/blog/page.module.css";

import Image from "next/image";

import fs from "fs";

import matter from "gray-matter";

import { BLOG_FOLDER_PATH } from "@/utils/linkUtils";
import Surface from "@/components/common/ui/Surface/Surface";
import PageHeader from "@/components/common/ui/PageHeader/PageHeader";

const BlogArticleContainer = ({ title, date, image, link }) => {
    return (
        <Surface internal href={link} interactive className={styles.article_container}>
            <div className={styles.article_image_container}>
                <Image src={image} alt={"Main image of article " + title} fill={true} objectFit="cover" />
            </div>
            <div className={styles.article_text_container}>
                <span className={styles.article_text_title}>{title}</span>
                <span className={styles.article_text_date}>{date}</span>
            </div>
        </Surface>
    );
};

export default async function Blog({}) {
    const files = fs.readdirSync(BLOG_FOLDER_PATH);

    const posts = files
        .filter((fileName) => fileName.endsWith('.md')) // Only process .md files
        .map((fileName) => {
            const post = fileName.replace(".md", "");
            const readFile = fs.readFileSync(BLOG_FOLDER_PATH + fileName, "utf-8");

            const { data } = matter(readFile);

            return {
                post,
                data,
            };
        });

    return (
        <div className={styles.blog_container}>
            <PageHeader
                title="Welcome to my blog!"
                subtitle="Sometimes I write about experiments or implementations of frameworks/libraries/langages I discovered on side projects."
            />
            <div className={styles.articles_list}>
                {posts.map((item, index) => {
                    return (
                        <BlogArticleContainer
                            title={item.data.title}
                            link={"/blog/" + item.post}
                            key={index}
                            image={item.data.image}
                            date={item.data.created}
                        />
                    );
                })}
            </div>
        </div>
    );
}
