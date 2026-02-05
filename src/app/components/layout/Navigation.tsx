"use client";

import React, { useState, useRef, useEffect } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { SlArrowRight } from "react-icons/sl";
import styles from "./styles.module.css";
import navItems from "@/lib/hooks/navItems";
import { useMobile } from "@/lib/hooks/useMobile";

export function Navbar() {
  const [activeItem, setActiveItem] = useState(navItems[0].label);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isMobile = useMobile();
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const visibilityMap = useRef<Map<string, number>>(new Map());

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
    const idToLabel = new Map(
      navItems.map((item) => [item.sectionId, item.label]),
    );
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          visibilityMap.current.set(id, entry.intersectionRatio);
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        visibilityMap.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        const lastItem = navItems[navItems.length - 1];
        const lastSection = document.getElementById(lastItem.sectionId);
        if (lastSection) {
          const rect = lastSection.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.6 && rect.bottom > 0) {
            setActiveItem(lastItem.label);
            return;
          }
        }

        if (bestId && bestRatio > 0) {
          const label = idToLabel.get(bestId);
          if (label) setActiveItem(label);
          return;
        }

        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) {
          setActiveItem(navItems[navItems.length - 1].label);
        }
      },
      {
        root: null,
        rootMargin: "-64px 0px 0px 0px",
        threshold: thresholds,
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle menu open/close for mobile
  useEffect(() => {
    document.body.style.overflow = isMenuOpen && isMobile ? "hidden" : "auto";

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
      window.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : ""
      }`}
    >
      {!isMobile && (
        <div className={styles["desktop-nav-wrapper"]}>
          <nav ref={containerRef} className={styles["nav-container"]}>
            <div className={styles.indicator} style={indicatorStyle} />
            {navItems.map((item) => (
              <button
                key={item.label}
                ref={(el) => {
                  if (el) tabsRef.current.set(item.label, el);
                }}
                onClick={() => handleClick(item)}
                className={`${styles["nav-button"]} ${
                  activeItem === item.label ? styles.active : styles.inactive
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
      {isMobile && (
        <div className={styles["mobile-wrapper"]}>
          <Hamburger
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
            aria-label={isMenuOpen ? "Luk menu" : "Åbn menu"}
            color="#121212"
          />
        </div>
      )}
      {isMobile && isMenuOpen && (
        <div className={styles["mobile-menu-overlay"]}>
          <nav className={styles["mobile-nav"]}>
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className={`${styles["mobile-nav-button"]} ${
                  activeItem === item.label
                    ? styles["mobile-nav-button-active"]
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <span className={styles["mobile-nav-text"]}>{item.label}</span>
                <SlArrowRight className={styles["mobile-nav-icon"]} size={20} />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
