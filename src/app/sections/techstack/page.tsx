'use client';

import React from 'react';
import Carousel from '@/app/components/carousel/carousel';
import styles from './styles.module.css';
import { data } from '@/data/carousel/techData';
import { ScrollAnimation } from '@/app/components/animations/scrollAnimation';

const TechstackSection: React.FC = () => {
     return (
          <div id="techstack" className={styles.wrapper}>
               <div className={styles.expertiseSection}>
                    <ScrollAnimation animation={'fadeIn'} triggerOnce={false}>
                         <h2>
                              My Developer Toolkit <br />{' '}
                              <span className={styles.highlight}>Knowledge and expertise</span>
                         </h2>
                         <p>A peek under the hood of my tech stack.</p>
                    </ScrollAnimation>
               </div>
               <Carousel dataPath={data} />
          </div>
     );
};

export default TechstackSection;
