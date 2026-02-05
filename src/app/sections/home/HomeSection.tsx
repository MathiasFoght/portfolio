import React from "react";
import Reveal from "@/app/components/Reveal";
import ShinyText from "@/app/components/animations/ShinyText/ShinyText";
import styles from "./HomeSection.module.css";
import DecryptedText from "@/components/DecryptedText/DecryptedText";

export default function HomeSection() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroGrid}>
        <Reveal>
          <p className={styles.kicker}>Junior Software Engineer</p>
          <h1 className={styles.heroTitle}>
            Mathias <span className={styles.heroAccent}>Foght</span>
          </h1>
          <p className={styles.heroBody}>
            I’m a curious software engineer passionate about well-structured
            systems, with a strong interest in AI and agent-based development,
            and in designing intelligent solutions that are clear, scalable, and
            maintainable.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.buttonPrimary} href="#projects">
              View Projects
            </a>
            <a className={styles.buttonGhost} href="#contact">
              Let&#39;s Talk
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className={styles.heroMeta}>
            <div className={styles.metaRow}>
              <span>Focus</span>
              <DecryptedText
                text="Computer Engineering"
                speed={120}
                maxIterations={8}
                sequential
                revealDirection="center"
              />
            </div>
            <div className={styles.metaRow}>
              <span>Developing</span>
              <DecryptedText
                text="Fullstack + AI"
                speed={120}
                maxIterations={8}
                sequential
                revealDirection="center"
              />
            </div>
            <div className={styles.metaRow}>
              <span>CV</span>
              <a
                className={styles.metaLink}
                href="/CV_Mathias_Foght.pdf"
                download
                aria-label="Download CV"
              >
                <DecryptedText
                  text="Download"
                  speed={120}
                  maxIterations={8}
                  sequential
                  revealDirection="center"
                />
              </a>
            </div>
            <div className={styles.metaRow}>
              <span>Status</span>
              <DecryptedText
                text="Open for work"
                speed={120}
                maxIterations={8}
                sequential
                revealDirection="center"
                renderAfterComplete={
                  <ShinyText
                    text="Open for work"
                    speed={5}
                    delay={0}
                    color="#121212"
                    shineColor="#2067ff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover
                  />
                }
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
