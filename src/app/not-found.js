"use client";

import styles from "@/app/not-found.module.css";
import { useRouter } from "next/navigation";
import Button from "@/components/common/ui/Button/Button";

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push("/");
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <main>
            <div className={styles.error_full_screen_wrapper}>
                <div className={styles.error_container}>
                    {/* Error Icon/Number */}
                    <div className={styles.error_icon_container}>
                        <div className={styles.error_number}>404</div>
                        <div className={styles.error_icon}>🔍</div>
                    </div>
                    
                    <div className={styles.error_content_container}>
                        <div className={styles.error_title_container}>
                            <span className={styles.error_title_text}>
                                Page <span className={styles.error_highlight}>Not</span> Found
                            </span>
                        </div>
                        
                        <div className={styles.error_message_container}>
                            <p className={styles.error_message}>
                                Oops! The page you&apos;re looking for seems to have wandered off.
                                It might have been moved, deleted, or you may have mistyped the URL.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Action buttons */}
                <div className={styles.error_buttons_container}>
                    <Button variant="outline" onClick={handleGoBack}>
                        Go Back
                    </Button>
                    <Button variant="solid" onClick={handleGoHome}>
                        Go Home
                    </Button>
                </div>
            </div>
        </main>
    );
}
