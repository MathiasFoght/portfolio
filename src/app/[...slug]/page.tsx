'use client';

import Link from 'next/link';
import styles from './catchAll.module.css';

export default function CatchAll() {
     return (
          <div className={styles.container}>
               <div className={styles.content}>
                    <div className={styles.errorCode}>:(</div>
                    <p className={styles.description}>Page not found </p>
                    <Link href="/" className={styles.homeButton}>
                         Back
                    </Link>
               </div>
          </div>
     );
}
