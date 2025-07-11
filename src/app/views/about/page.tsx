import type React from "react";
import TechCarousel from "@/app/components/carousel/techCarousel";
import styles from "./styles.module.css";

const About: React.FC = () => {
    return (
        <div id="about" className={styles.wrapper} >
            <TechCarousel />
        </div>
    );
}

export default About;
