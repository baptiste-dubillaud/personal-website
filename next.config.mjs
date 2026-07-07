import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
    output: "standalone",
    webpack: (config) => {
        // next-intl uses a dynamic `import(t)` internally that webpack can't
        // statically analyse for its persistent cache, which spams harmless
        // "Parsing … failed at 'import(t)'" PackFileCacheStrategy warnings.
        // Raise the infrastructure log level so those are hidden; real
        // compilation warnings/errors are unaffected.
        config.infrastructureLogging = { level: "error" };
        return config;
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
