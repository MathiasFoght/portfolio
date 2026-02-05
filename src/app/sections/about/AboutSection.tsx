import React from "react";
import Reveal from "@/app/components/Reveal";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <Reveal>
        <h2 className={styles.sectionTitle}>About</h2>
      </Reveal>
      <div className={styles.aboutGrid}>
        <Reveal>
          <div className={styles.aboutCard}>
            <h3>Who I am</h3>
            <p>
              Hi, I’m 27 years old and based in Aarhus, originally from Horsens.
              I completed my Software Engineering degree at Aarhus University in
              2026. I’m deeply passionate about software development and
              problem-solving, especially the process of working through complex
              challenges and finally cracking them after persistent effort.
              Driven by curiosity and a strong desire to learn, I enjoy
              continuously improving my skills through both hands-on experience
              from internships and student roles, and by exploring new
              technologies.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={120}>
          <div className={styles.aboutCard}>
            <h3>My approach to software engineering</h3>
            <p>
              I enjoy breaking down complex problems and iterating until the
              solution clicks. I focus on writing clear, maintainable code and
              constantly look for ways to optimize and improve.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
