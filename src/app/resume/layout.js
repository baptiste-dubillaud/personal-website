export const metadata = {
    title: "Resume — Baptiste Dubillaud",
    description:
        "Software Engineer resume: experience, education, and interests. Explore projects, stack, and contact links.",
    alternates: { canonical: "/resume" },
    openGraph: {
        title: "Resume — Baptiste Dubillaud",
        description:
            "Software Engineer resume: experience, education, and interests. Explore projects, stack, and contact links.",
        url: "/resume",
        siteName: "Baptiste Dubillaud",
        type: "profile",
        images: [{ url: "/images/profile.jpg", width: 1200, height: 630, alt: "Resume" }],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Resume — Baptiste Dubillaud",
        description:
            "Software Engineer resume: experience, education, and interests. Explore projects, stack, and contact links.",
        images: ["/images/profile.jpg"],
    },
};

export default function ResumeLayout({ children }) {
    return children;
}
