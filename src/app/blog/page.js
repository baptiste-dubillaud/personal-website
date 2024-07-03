import styles from '@/app/blog/page.module.css'

import Image from 'next/image';
import Link from 'next/link';

import fs from 'fs';

import matter from 'gray-matter';

const BlogArticleContainer = ({ title, date, image, link}) => {

    return (
        <Link href={link} className={styles.article_container}>
            <div className={styles.article_image_container}>
                <Image src={image} alt={'Main image of article ' + title} fill={true} objectFit='cover' />
            </div>
            <div className={styles.article_text_container}>
                <span className={styles.article_text_title}>
                    {title}
                </span>
                <span className={styles.article_text_date}>
                    {date}
                </span>
            </div>
        </Link>
    )
}

export default function Blog ({ }) {
    const files = fs.readdirSync(process.env.BLOG_FOLDER_PATH);

    const posts = files.map((fileName) => {
        const post = fileName.replace('.md', '');
        const readFile = fs.readFileSync(process.env.BLOG_FOLDER_PATH + fileName, 'utf-8');
  
        const { data } = matter(readFile);

        return {
            post,
            data
        };
    }); 

    return (
        <div className={styles.blog_container}>
            <div className={styles.blog_title}>
                Welcome to my blog!
            </div>
            <div className={styles.blog_subtitle}>
                Sometimes I write about experiments or implementations of frameworks/libraries/langages 
                I discovered on subjects projects in my portfolio or not.
            </div>
            <div className={styles.articles_list}>
            {
                posts.map((item, index) => {
                    
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                            date={item.data.created}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}
