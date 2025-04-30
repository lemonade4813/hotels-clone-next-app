'use client'

import React, { useRef } from 'react';
import styles from "./CarouselContainer.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

export default function CarouselContainer({ children }: ContainerProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {

    const scrollAmount = containerRef.current.offsetWidth;    
    //   const scrollAmount = (containerRef.current.children[0] as HTMLElement).offsetWidth;

      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.carouselItems}>
        {children}
      </div>
      <button
        onClick={() => scroll('left')}
        style={{left: '10px'}}
        className={styles.carouselButton}
      >
        ◀
      </button>
      <button
        onClick={() => scroll('right')}
        className={styles.carouselButton}
        style={{right : '10px'}}
      >
        ▶
      </button>
    </div>
  );
}