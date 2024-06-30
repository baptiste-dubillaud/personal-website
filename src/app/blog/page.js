import styles from '@/app/blog/page.module.css'

import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

const BlogArticleContainer = ({ title, date, image, link}) => {

    {/* <Link href={link} className={styles.article_container}> */}
    return (
        <div  className={styles.article_container}>
            <div className={styles.article_image_container}>
                <Image src={image} alt={'Main image of article ' + title} className={styles.background_image} fill={true} />
                <div className={styles.forground_image}>
                    <Image src={image} alt={'Main image of article ' + title} fill={true} objectFit='contain' />
                </div>
            </div>
            <div className={styles.article_text_container}>
                <span className={styles.article_title}>
                    {title}
                </span>
                <span className={styles.article_datz}>
                    {date}
                </span>
            </div>

        </div>
    )
    /* </Link> */
}

export default function Blog ({ }) {
    const files = fs.readdirSync('public/blog');

    const posts = files.map((fileName) => {
        const post = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`public/blog/${fileName}`, 'utf-8');
  
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
                Sometimes I write about experiments or implementation of frameworks/libraries/langages 
                I discovered on subjects projects in my portfolio or not.
            </div>
            <div className={styles.articles_list}>
            {
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }{
                posts.map((item, index) => {
                    
                    console.log(item);
                    return (
                        <BlogArticleContainer 
                            title={item.data.title} 
                            link={'http://localhost:3000/blog/' + item.post} key={index}
                            image={item.data.image}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}
