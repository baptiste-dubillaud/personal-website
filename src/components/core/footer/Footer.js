import styles from "./Footer.module.css";
import fs from "fs";
import path from "path";
import { useTranslations } from "next-intl";

function readVersionFile() {
    try {
        // Prefer public/version.txt created at build/deploy time
        const p = path.join(process.cwd(), "public", "version.txt");
        if (fs.existsSync(p)) {
            const content = fs.readFileSync(p, "utf8");
            if (content) {
                const lines = content.split(/\r?\n/).map((l) => l.trim());
                if (lines.length) return lines[lines.length - 1].split(":")[0].trim();
            }
        }
    } catch (e) {
        return "1.0 - xxxx-xx-xx";
    }
}

export default function FooterComponent({}) {
    const t = useTranslations("footer");

    const version = readVersionFile();

    return (
        <div className={styles.footer_container}>
            <span>{t.rich("text", { years: "2024-2025", bold: (chunks) => <strong>{chunks}</strong> })}</span>
            {/* <span className={`${styles.orange_text} ${styles.bold_text}`}>Baptiste DUBILLAUD</span>
             */}
            <span className={styles.version} title={`version: ${version}`}>
                {version}
            </span>
        </div>
    );
}
