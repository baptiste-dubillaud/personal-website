import styles from "./page.module.css";

import FullScreenComponent from "@/components/common/container/FullScreenComponent";
import GithubIcon from "@/components/common/icons/apps/GithubIcon"
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon"
import MediumIcon from "@/components/common/icons/apps/MediumIcon"
import ProfileIcon from "@/components/common/icons/misc/ProfileIcon";
import FlagIcon from "@/components/common/icons/misc/FlagIcon";
import Locationicon from "@/components/common/icons/misc/LocationIcon";

export default function Home() {

    function getAge() {
        const currDate = new Date()
        const birthdayDate = new Date("12-29-1998")
        
        return ((currDate - birthdayDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(0)
    }

    return (
        <main>
            <FullScreenComponent className={styles.presentation_full_screen_wrapper}>
                <div className={styles.presentation_container}>
                    <div className={styles.presentation_picture_border_container}>
                        <div className={styles.presentation_picture_container}>
                            {/* Insert picture here */}
                        </div>
                    </div>
                    <div className={styles.presentation_data_container}>
                        <div className={styles.presentation_data_group_container}>
                            <div className={styles.presentation_data_name_container}>
                                <span className={`${styles.presentation_data_name_text} ${styles.presentation_data_firstname}`}>Baptiste</span>
                                <span className={styles.presentation_data_name_text}>Dubillaud</span>
                            </div>
                            <div className={styles.presentation_data_role_container}>
                                <span className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}>Software</span>
                                <span className={styles.presentation_data_role_text}>&</span>
                                <span className={`${styles.presentation_data_role_text} ${styles.presentation_data_firstname}`}>Data</span>
                                <span className={styles.presentation_data_role_text}>Engineer</span>
                            </div>
                        </div>
                        <div className={styles.presentation_data_group_container}>
                            <div className={styles.presentation_data_specs_container}>
                                <ProfileIcon size={20}/>
                                <span className={styles.presentation_data_specs_text}>{getAge()} years old</span>
                                <FlagIcon size={20} />
                                <span className={styles.presentation_data_specs_text}>French</span>
                                <Locationicon size={22} />
                                <span className={styles.presentation_data_specs_text}>Esbjerg, Denmark</span>
                            </div>
                            <div>
                                <LinkedInIcon size={35} />
                                <GithubIcon size={35}/>
                                <MediumIcon size={35}/>
                            </div>
                        </div>
                    </div>
                </div>
            </FullScreenComponent>
        </main>
  ) ;
}
