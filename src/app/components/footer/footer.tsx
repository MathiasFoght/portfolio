import styles from "./styles.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.gridContainer}>
                    <div>
                        <h2 className={styles.heading}>Get in Touch</h2>
                    </div>
                    <div className={styles.linksGrid}>
                        <div>
                            <h3 className={styles.subHeading}>Community</h3>
                            <ul className={styles.linkList}>
                                <li>
                                    <a href="#" className={styles.link}>
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.link}>
                                        GitLab
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={styles.subHeading}>Connect</h3>
                            <ul className={styles.linkList}>
                                <li>
                                    <a href="#" className={styles.link}>
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.link}>
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.link}>
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.link}>
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.copyrightSection}>
                    <p className={styles.copyrightText}>© 2025 Mathias Foght</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
