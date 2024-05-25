import styles from "@/components/common/container/FullScreenConponent.module.css"

export default function FullScreenComponent({children, className}) {

    return (
        <div className={className ? `${className} ${styles.container}` : styles.container}>
            {children}
        </div>
    )
}