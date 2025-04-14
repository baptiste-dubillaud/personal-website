import styles from "./Footer.module.css"

export default function FooterComponent({}) {

    return (
        <div className={styles.footer_container}>

            <span>Developed in <span className={styles.bold_text}>2024-2025</span> by</span>
            <span className={`${styles.orange_text} ${styles.bold_text}`}>Baptiste DUBILLAUD</span>
        </div>
    )
}