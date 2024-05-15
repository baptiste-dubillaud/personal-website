'use client'

import styles from "@/components/core/navigationBar/NavigationBar.module.css"

import { useRouter } from "next/navigation"

const NavLinkComponent = ({name, path}) => {

    const router = useRouter()

    return (
        <div className={styles.nav_link} onClick>
            {name}
        </div>
    )
}

export default function NavigationBarComponent({}) {

    return (
        <div className={styles.nav_bar_container}>
            <div className={styles.hello_message}>
                Hi, I'm Baptiste!
            </div>
            <div className={styles.links_container}>
                <NavLinkComponent name="Home" path="/"/>
                <NavLinkComponent name="Resume" path="/resume"/>
                <NavLinkComponent name="Portfolio" path="/portfolio"/>
                <NavLinkComponent name="Blog" path="/blog"/>
                <NavLinkComponent name="Contact me" path="/contact"/>
            </div>
        </div>
    )
}