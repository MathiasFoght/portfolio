import React from "react";
import Reveal from "@/app/components/Reveal";
import TECH_STACK from "@/config/techStack";
import styles from "./TechStackSection.module.css";

export default function TechStackSection() {
  return (
    <section id="techstack" className={styles.section}>
      <Reveal>
        <h2 className={styles.sectionTitle}>Tech Stack</h2>
        <p className={styles.sectionLead}>
          A peek under the hood of the technologies I’ve worked with and used.
        </p>
        <div className={styles.techGrid}>
          {TECH_STACK.map((tech) => (
            <span key={tech.name} className={styles.chip}>
              {tech.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
