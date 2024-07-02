
import fs from 'fs'

import matter from 'gray-matter';

export default function Page({ params }) {

    const readFile = fs.readFileSync(process.env.BLOG_FOLDER_PATH + params.post + ".md", 'utf-8');
    const { data, content } = matter(readFile);

    return <div>My Post: {data.title}</div>
}