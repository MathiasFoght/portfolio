import React from "react";
import Reveal from "@/app/components/Reveal";
import PROJECTS from "@/config/projects";
import styles from "./ProjectsSection.module.css";

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <Reveal>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionLead}>
          A selection of focused builds developed as hobby and academic
          projects, showcasing the technologies used.
        </p>
      </Reveal>
      <div className={styles.projectsGrid}>
        {PROJECTS.map((project, index) => (
          <Reveal key={project.id} delayMs={index * 90}>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardBody}>{project.description}</p>
              <div className={styles.cardTech}>
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              {(project.demo || project.github) && (
                <div className={styles.cardLinks}>
                  {project.demo && (
                    <a
                      className={styles.linkPrimary}
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                  )}
                  {project.github && (
                    <a
                      className={styles.linkSecondary}
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
