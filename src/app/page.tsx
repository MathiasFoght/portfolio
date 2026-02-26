import React from "react";
import HomeSection from "@/app/sections/home/HomeSection";
import TechStackSection from "@/app/sections/techstack/TechStackSection";
import AboutSection from "@/app/sections/about/AboutSection";
import ProjectsSection from "@/app/sections/projects/ProjectsSection";
import ContactSection from "@/app/sections/contact/ContactSection";
import styles from "./page.module.css";

export default function Initialize() {
  return (
    <div className={styles.main}>
      <div className={styles.mobileFullBleed}>
        <HomeSection />
      </div>
      <TechStackSection />
      <AboutSection />
      <ProjectsSection />
      <div className={`${styles.mobileFullBleed} ${styles.fullBleed}`}>
        <ContactSection />
      </div>
    </div>
  );
}
