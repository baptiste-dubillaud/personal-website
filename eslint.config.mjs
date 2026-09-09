// ESLint flat config — `next lint` was removed in Next.js 16, so linting now
// runs through the ESLint CLI (`npm run lint`) with the shared Next config.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
    ...nextCoreWebVitals,
    {
        ignores: [".next/**", "node_modules/**"],
    },
];

export default config;
