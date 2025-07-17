import React from "react";
import Carousel from "@/app/components/carousel/carousel";
import styles from "./styles.module.css";
import { data } from "@/data/carousel/techData";

const About: React.FC = () => {
    return (
        <div id="about" className={styles.wrapper} >
            <div className={styles.expertiseSection}>
                <h2>
                    Knowledge and expertise  <br/> <span className={styles.highlight}>Focused on clean code</span>
                </h2>
                <p>
                    As a student, I explore a wide range of technologies showcased here.
                </p>
            </div>
            <Carousel dataPath={data} />
        </div>
    );
}

export default About;
