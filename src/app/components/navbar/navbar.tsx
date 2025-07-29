'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import { SlArrowRight } from 'react-icons/sl';
import { useMobile } from '@/app/hooks/useMobile';
import styles from './styles.module.css';
import navItems from '@/app/utils/navItems';

export function Navbar() {
     const [activeItem, setActiveItem] = useState(navItems[0].label);
     const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const isMobile = useMobile();
     const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
     const containerRef = useRef<HTMLDivElement>(null);

     // Function to handle resizing and update indicator position
     useEffect(() => {
          if (!isMobile) {
               const activeTab = tabsRef.current.get(activeItem);
               const container = containerRef.current;
               if (activeTab && container) {
                    const containerRect = container.getBoundingClientRect();
                    const tabRect = activeTab.getBoundingClientRect();
                    setIndicatorStyle({
                         left: tabRect.left - containerRect.left,
                         width: tabRect.width,
                         height: tabRect.height,
                    });
               }
          }
     }, [activeItem, isMobile]);

     // Update active nav item on scroll
     useEffect(() => {
          const handleScroll = () => {
               let closestSection = navItems[0];
               let minDistance = Infinity;

               navItems.forEach((item) => {
                    const section = document.getElementById(item.sectionId);
                    if (section) {
                         const rect = section.getBoundingClientRect();
                         const distance = Math.abs(rect.top - 100);
                         if (distance < minDistance) {
                              minDistance = distance;
                              closestSection = item;
                         }
                    }
               });
               setActiveItem(closestSection.label);
          };

          window.addEventListener('scroll', handleScroll, { passive: true });
          return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     // Handle menu open/close for mobile
     useEffect(() => {
          document.body.style.overflow = isMenuOpen && isMobile ? 'hidden' : 'auto';

          // Switching to desktop
          if (!isMobile) {
               setIsMenuOpen(false);
          }
     }, [isMenuOpen, isMobile]);

     // Handle click on nav item
     const handleClick = (item: (typeof navItems)[0]) => {
          setActiveItem(item.label);
          setIsMenuOpen(false);
          const section = document.getElementById(item.sectionId);
          if (section) {
               const yOffset = -64;
               const scrollOffset =
                    section.getBoundingClientRect().top + window.pageYOffset + yOffset;
               window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
          }
     };

     return (
          <header className={styles.header}>
               {!isMobile && (
                    <div className={styles['desktop-nav-wrapper']}>
                         <nav ref={containerRef} className={styles['nav-container']}>
                              <div className={styles.indicator} style={indicatorStyle} />
                              {navItems.map((item) => (
                                   <button
                                        key={item.label}
                                        ref={(el) => {
                                             if (el) tabsRef.current.set(item.label, el);
                                        }}
                                        onClick={() => handleClick(item)}
                                        className={`${styles['nav-button']} ${
                                             activeItem === item.label
                                                  ? styles.active
                                                  : styles.inactive
                                        }`}
                                   >
                                        {item.label}
                                   </button>
                              ))}
                         </nav>
                    </div>
               )}
               {isMobile && (
                    <div className={styles['mobile-wrapper']}>
                         <Hamburger
                              toggled={isMenuOpen}
                              toggle={setIsMenuOpen}
                              aria-label={isMenuOpen ? 'Luk menu' : 'Åbn menu'}
                              color="#ffffff"
                         />
                    </div>
               )}
               {isMobile && isMenuOpen && (
                    <div className={styles['mobile-menu-overlay']}>
                         <nav className={styles['mobile-nav']}>
                              {navItems.map((item, index) => (
                                   <button
                                        key={item.label}
                                        onClick={() => handleClick(item)}
                                        className={`${styles['mobile-nav-button']} ${
                                             activeItem === item.label
                                                  ? styles['mobile-nav-button-active']
                                                  : ''
                                        }`}
                                        style={{
                                             animationDelay: `${index * 0.1}s`,
                                        }}
                                   >
                                        <span className={styles['mobile-nav-text']}>
                                             {item.label}
                                        </span>
                                        <SlArrowRight
                                             className={styles['mobile-nav-icon']}
                                             size={20}
                                        />
                                   </button>
                              ))}
                         </nav>
                    </div>
               )}
          </header>
     );
}

export default Navbar;
