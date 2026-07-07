import styles from "@/app/blog/[post]/page.module.css";

import Image from "next/image";

import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import md from "markdown-it";

import { getPostBySlug, formatPostDate } from "@/utils/blogUtils";
import PageBackground from "@/components/common/ui/PageBackground/PageBackground";
import Heading from "@/components/common/ui/Heading/Heading";
import Divider from "@/components/common/ui/Divider/Divider";
import Button from "@/components/common/ui/Button/Button";
import Tag from "@/components/common/ui/Tag/Tag";

// The article language is resolved per request (NEXT_LOCALE cookie → Accept-Language),
// so the page must render dynamically — static prerendering would freeze one locale.
export const dynamic = "force-dynamic";

// markdown-it keeps HTML disabled (`html: false`) so authored markdown can never
// inject raw HTML — the rendered string is safe to pass to dangerouslySetInnerHTML.
const renderMarkdown = (content) => md({ linkify: true, typographer: true }).render(content);

export async function generateMetadata({ params }) {
    const locale = await getLocale();
    const post = getPostBySlug(params.post, locale);
    if (!post) return {};

    const { data } = post;
    const url = `/blog/${post.slug}`;
    return {
        title: data.title,
        description: data.description,
        alternates: { canonical: url },
        openGraph: {
            title: data.title,
            description: data.description,
            url,
            type: "article",
            publishedTime: data.created,
            modifiedTime: data.updated || data.created,
            authors: data.author ? [data.author] : undefined,
            images: data.image ? [{ url: data.image }] : undefined,
            tags: data.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.description,
        },
    };
}

export default async function Page({ params }) {
    const locale = await getLocale();
    const t = await getTranslations("pages.blog");
    const post = getPostBySlug(params.post, locale);

    if (!post) {
        notFound();
    }

    const { data, content } = post;

    return (
        <PageBackground as="main" className={styles.container}>
            <article className={styles.post_container}>
                <div className={styles.back}>
                    <Button internal href="/blog" variant="ghost">
                        {t("back")}
                    </Button>
                </div>

                <header className={styles.post_header}>
                    <Heading as="h1" className={styles.title}>
                        {data.title}
                    </Heading>
                    {Array.isArray(data.tags) && data.tags.length > 0 && (
                        <div className={styles.tags}>
                            {data.tags.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </div>
                    )}
                    <div className={styles.writing_data}>
                        <div className={styles.author_container}>
                            {t("by")} <span className={styles.author_name}>{data.author}</span>
                        </div>
                        <div className={styles.date_data}>
                            <div>
                                {t("written_on")}{" "}
                                <span className={styles.date}>{formatPostDate(data.created, locale)}</span>
                            </div>
                            {data.updated && (
                                <div>
                                    {t("updated_on")}{" "}
                                    <span className={styles.date}>{formatPostDate(data.updated, locale)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Divider />
                </header>

                {data.image && (
                    <div className={styles.image_container}>
                        <Image
                            src={data.image}
                            alt={"Main image of article " + data.title}
                            width={1000}
                            height={1000}
                            className={styles.image}
                        />
                    </div>
                )}

                <div
                    className={styles.prose}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
            </article>
        </PageBackground>
    );
}
