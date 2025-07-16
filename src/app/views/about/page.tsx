import type React from "react";
import TechCarousel from "@/app/components/carousel/techCarousel";
import styles from "./styles.module.css";

const About: React.FC = () => {
    return (
        <div id="about" className={styles.wrapper} >
            <div className={styles.expertiseSection}>
                <h2>
                    Knowledge and expertise  <br/> <span className={styles.highlight}>Focused on clean structure</span>
                </h2>
                <p>
                    As a student, I explore a wide range of technologies showcased here.
                </p>
            </div>
            <TechCarousel />
        </div>
    );
}

export default About;
