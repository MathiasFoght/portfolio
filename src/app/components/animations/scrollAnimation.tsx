import React from 'react';
import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';

interface ScrollAnimationProps {
     children: React.ReactNode;
     animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
     duration?: number;
     delay?: number;
     className?: string;
     threshold?: number;
     triggerOnce?: boolean;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
     children,
     animation = 'fadeIn',
     duration = 0.6,
     delay = 0,
     className = '',
     threshold = 0.1,
     triggerOnce = true,
}) => {
     const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

     const getAnimationStyles = (): React.CSSProperties => {
          const baseStyles: React.CSSProperties = {
               transition: `all ${duration}s ease-out ${delay}s`,
               willChange: 'transform, opacity',
          };

          if (!isVisible) {
               switch (animation) {
                    case 'fadeIn':
                         return { ...baseStyles, opacity: 0 };
                    case 'slideUp':
                         return {
                              ...baseStyles,
                              opacity: 0,
                              transform: 'translateY(50px)',
                         };
                    case 'slideLeft':
                         return {
                              ...baseStyles,
                              opacity: 0,
                              transform: 'translateX(50px)',
                         };
                    case 'slideRight':
                         return {
                              ...baseStyles,
                              opacity: 0,
                              transform: 'translateX(-50px)',
                         };
                    case 'scale':
                         return {
                              ...baseStyles,
                              opacity: 0,
                              transform: 'scale(0.8)',
                         };
                    default:
                         return { ...baseStyles, opacity: 0 };
               }
          }

          return {
               ...baseStyles,
               opacity: 1,
               transform: 'translateY(0) translateX(0) scale(1)',
          };
     };

     return (
          <div
               ref={ref as React.RefObject<HTMLDivElement>}
               style={getAnimationStyles()}
               className={className}
          >
               {children}
          </div>
     );
};
