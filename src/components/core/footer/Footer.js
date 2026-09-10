import styles from "./Footer.module.css";
import { useTranslations } from "next-intl";

import { readVersion } from "@/utils/versionUtils";

export default function FooterComponent({}) {
    const t = useTranslations("footer");

    const version = readVersion();

    return (
        <div className={styles.footer_container}>
            <span>{t.rich("text", { years: "2024-2026", bold: (chunks) => <strong>{chunks}</strong> })}</span>
            <span className={styles.version} title={`version: ${version}`}>
                {version}
            </span>
        </div>
    );
}
