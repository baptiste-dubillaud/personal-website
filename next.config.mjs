import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Enable polling for file changes in Docker/Windows
        config.watchOptions = {
            poll: 500,
            aggregateTimeout: 300,
            ignored: /node_modules/,
        };
        return config;
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
