import styles from "@/app/blog/[post]/page.module.css"

import fs from 'fs'

import matter from 'gray-matter';
import md from 'markdown-it';

export default function Page({ params }) {

    const readFile = fs.readFileSync(process.env.BLOG_FOLDER_PATH + params.post + ".md", 'utf-8');
    const { data, content } = matter(readFile);

    return <div className={styles.container}>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        </div>
}