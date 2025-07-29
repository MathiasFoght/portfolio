'use client';

import Link from 'next/link';
import styles from './catchAll.module.css';
import { ScrollAnimation } from '@/app/components/animations/scrollAnimation';

export default function CatchAll() {
     return (
          <div className={styles.container}>
               <ScrollAnimation animation={'fadeIn'}>
                    <div className={styles.content}>
                         <div className={styles.errorCode}>:(</div>
                         <p className={styles.description}>Page not found </p>
                         <ScrollAnimation animation={'fadeIn'}>
                              <Link href="/" className={styles.homeButton}>
                                   Back
                              </Link>
                         </ScrollAnimation>
                    </div>
               </ScrollAnimation>
          </div>
     );
}
