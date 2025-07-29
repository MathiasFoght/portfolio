'use client';

import styles from './styles.module.css';
import { ScrollAnimation } from '@/app/components/animations/scrollAnimation';

function Footer() {
     return (
          <footer className={styles.footer}>
               <div className={styles.container}>
                    <div className={styles.gridContainer}>
                         <ScrollAnimation animation={'slideUp'} duration={0.5} triggerOnce={false}>
                              <div>
                                   <h2 className={styles.heading}>Get in Touch</h2>
                              </div>
                         </ScrollAnimation>
                         <div className={styles.linksGrid}>
                              <ScrollAnimation
                                   animation={'slideUp'}
                                   duration={0.5}
                                   triggerOnce={false}
                              >
                                   <div>
                                        <h3 className={styles.subHeading}>Community</h3>
                                        <ul className={styles.linkList}>
                                             <li>
                                                  <a
                                                       href="https://github.com/MathiasFoght?tab=repositories"
                                                       className={styles.link}
                                                  >
                                                       GitHub
                                                  </a>
                                             </li>
                                             <li>
                                                  <a
                                                       href="https://gitlab.au.dk/dashboard/projects/member"
                                                       className={styles.link}
                                                  >
                                                       GitLab
                                                  </a>
                                             </li>
                                        </ul>
                                   </div>
                              </ScrollAnimation>
                              <ScrollAnimation
                                   animation={'slideUp'}
                                   duration={0.5}
                                   triggerOnce={false}
                              >
                                   <div>
                                        <h3 className={styles.subHeading}>Connect</h3>
                                        <ul className={styles.linkList}>
                                             <li>
                                                  <a
                                                       href="https://www.linkedin.com/in/mathias-foght-549197252/"
                                                       className={styles.link}
                                                  >
                                                       LinkedIn
                                                  </a>
                                             </li>
                                             <li>
                                                  <a
                                                       href="https://www.instagram.com/mathias_foght/"
                                                       className={styles.link}
                                                  >
                                                       Instagram
                                                  </a>
                                             </li>
                                             <li>
                                                  <a
                                                       href="https://www.facebook.com/mathias.foght"
                                                       className={styles.link}
                                                  >
                                                       Facebook
                                                  </a>
                                             </li>
                                             <li>
                                                  <a
                                                       href="mailto:mathiasfoght98@gmail.com"
                                                       className={styles.link}
                                                  >
                                                       Email
                                                  </a>
                                             </li>
                                        </ul>
                                   </div>
                              </ScrollAnimation>
                         </div>
                    </div>
                    <div className={styles.copyrightSection}>
                         <p className={styles.copyrightText}>© 2025 Mathias Foght</p>
                    </div>
               </div>
          </footer>
     );
}

export default Footer;
