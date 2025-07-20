import React from "react";
import Carousel from "@/app/components/carousel/carousel";
import styles from "./styles.module.css";
import { data } from "@/data/carousel/techData";

const About: React.FC = () => {
    return (
        <div id="about" className={styles.wrapper} >
            <div className={styles.expertiseSection}>
                <h2>
                    My Developer Toolkit  <br/> <span className={styles.highlight}>Knowledge and expertise</span>
                </h2>
                <p>
                    A peek under the hood of my tech stack.
                </p>
            </div>
            <Carousel dataPath={data} />
        </div>
    );
}

export default About;
