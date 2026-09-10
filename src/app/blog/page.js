import styles from "@/app/blog/page.module.css";

import Image from "next/image";

import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { BLOG_ENABLED } from "@/utils/featureFlags";
import { getAllPosts, formatPostDate } from "@/utils/blogUtils";
import PageBackground from "@/components/common/ui/PageBackground/PageBackground";
import Heading from "@/components/common/ui/Heading/Heading";
import Divider from "@/components/common/ui/Divider/Divider";
import Surface from "@/components/common/ui/Surface/Surface";
import Tag from "@/components/common/ui/Tag/Tag";

export async function generateMetadata() {
    if (!BLOG_ENABLED) return {};

    const t = await getTranslations("pages.blog");
    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: { canonical: "/blog" },
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: "/blog",
            type: "website",
        },
    };
}

const ArticleCard = ({ index, title, date, image, link, tags = [] }) => {
    return (
        <Surface
            internal
            href={link}
            interactive
            corners
            className={styles.article_card}
            style={{ animationDelay: `${index * 0.07}s` }}
        >
            <div className={styles.article_image_container}>
                <Image
                    src={image}
                    alt={"Main image of article " + title}
                    fill={true}
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className={styles.article_body}>
                <span className={styles.article_title}>{title}</span>
                <div className={styles.article_meta}>
                    <span className={styles.article_date}>{date}</span>
                    <span className={styles.article_arrow}>→</span>
                </div>
                {tags.length > 0 && (
                    <div className={styles.article_tags}>
                        {tags.map((tag) => (
                            <Tag key={tag} className={styles.article_tag}>
                                {tag}
                            </Tag>
                        ))}
                    </div>
                )}
            </div>
        </Surface>
    );
};

export default async function Blog({}) {
    // Held back from the 2.1 release — see BLOG_ENABLED.
    if (!BLOG_ENABLED) {
        notFound();
    }

    const locale = await getLocale();
    const t = await getTranslations("pages.blog");
    const posts = getAllPosts(locale);

    return (
        <PageBackground as="main" className={styles.blog_container}>
            <header className={styles.blog_header}>
                <Heading as="h1" className={styles.blog_title}>
                    <Heading.Accent>{t("title")}</Heading.Accent>
                </Heading>
                <p className={styles.blog_subtitle}>{t("subtitle")}</p>
                <div className={styles.blog_divider}>
                    <Divider />
                </div>
            </header>

            <div className={styles.articles_list}>
                {posts.length === 0 ? (
                    <p className={styles.empty_state}>{t("empty")}</p>
                ) : (
                    posts.map((item, index) => (
                        <ArticleCard
                            index={index}
                            title={item.data.title}
                            link={"/blog/" + item.slug}
                            key={item.slug}
                            image={item.data.image}
                            date={formatPostDate(item.data.created, locale)}
                            tags={item.data.tags}
                        />
                    ))
                )}
            </div>
        </PageBackground>
    );
}
