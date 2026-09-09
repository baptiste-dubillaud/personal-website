import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
    output: "standalone",
    // Auto-memoises components at build time (React Compiler 1.0), cutting
    // client re-renders on the animation-heavy pages. Costs build time (Babel).
    reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
