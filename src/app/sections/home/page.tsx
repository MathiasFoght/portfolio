'use client';

import type React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './styles.module.css';
import { ScrollAnimation } from '@/app/components/animations/scrollAnimation';

const HomeSection: React.FC = () => {
     const TypewriterEffect = () => (
          <Typewriter
               options={{
                    delay: 40,
                    wrapperClassName: styles.typewriterTitle,
                    cursorClassName: styles.typewriterCursor,
               }}
               onInit={(typewriter) => {
                    typewriter
                         .typeString('{Hi!}')
                         .pauseFor(1000)
                         .deleteAll()
                         .typeString("{Let's work together!}")
                         .start();
               }}
          />
     );

     return (
          <div className={styles.pageWrapper}>
               <main className={styles.mainContainer}>
                    <ScrollAnimation animation={'scale'} duration={0.9} triggerOnce={false}>
                         <div id="home" className={styles.homeSection}>
                              <div className={styles.contentContainer}>
                                   <div className={styles.typewriterContainer}>
                                        <TypewriterEffect />
                                   </div>
                              </div>
                              <div className={styles.positionInfo}>
                                   <p className={styles.positionText}>
                                        <strong>Current Position</strong>
                                        <br />
                                        Fullstack Student Developer
                                        <br />
                                        WEXO A/S
                                   </p>
                              </div>
                         </div>
                         <div className={styles.bottomContent}>
                              <div className={styles.contentContainer}>
                                   <h2 className={styles.subtitle}>Software Engineer</h2>
                                   <p className={styles.description}>
                                        Hi, I&#39;m a software engineering student at Aarhus
                                        University. I&#39;m passionate about developing software.
                                        <br />
                                        <br />
                                        Check out my projects and feel free to contact me.
                                   </p>
                                   <div className={styles.positionInfoMobile}>
                                        <p className={styles.positionText}>
                                             <strong>Current Position</strong>
                                             <br />
                                             Fullstack Student Developer
                                             <br />
                                             WEXO A/S
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </ScrollAnimation>
               </main>
          </div>
     );
};

export default HomeSection;
