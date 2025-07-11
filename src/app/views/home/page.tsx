"use client"

import type React from "react"
import Typewriter from "typewriter-effect"
import styles from "./styles.module.css"

const HomePage: React.FC = () => {
    const TypewriterEffect = () => (
        <Typewriter
            options={{
                delay: 40,
                wrapperClassName: styles.typewriterTitle,
                cursorClassName: styles.typewriterCursor,
            }}
            onInit={(typewriter) => {
                typewriter
                    .typeString("{Hi!}")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("{Let's work together!}")
                    .start()
            }}
        />
    )

    return (
        <div className={styles.pageWrapper}>
            <main className={styles.mainContainer}>
                <div id="home" className={styles.homeSection}>
                    <div className={styles.contentContainer}>
                        <div className={styles.typewriterContainer}>
                            <TypewriterEffect />
                        </div>
                        <h2 className={styles.subtitle}>Software Engineer</h2>
                        <p className={styles.description}>
                            Hi, I&#39;m a software engineering student at Aarhus University. I&#39;m passionate about developing software.
                            <br />
                            <br />
                            Check out my projects and feel free to contact me.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage
