'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './DualRangeSlider.module.css';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({ min, max, step = 1000 }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const range = max - min;

  const getPercent = (value: number) => Math.round(((value - min) / range) * 100);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
  };

  const [isMaxClicked, setIsMaxClicked] = useState(false);
  const [isMinClicked, setIsMinClicked] = useState(false);

  const minRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        minRef.current &&
        maxRef.current &&
        !minRef.current.contains(e.target as Node) &&
        !maxRef.current.contains(e.target as Node)


      ) {
        setIsMinClicked(false);
        setIsMaxClicked(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div className={styles.sliderTrack} />
        <div
          className={styles.sliderRange}
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className={`${styles.thumb} ${styles.thumbLeft}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />
      </div>
      <div className={styles.sliderValuesWrapper}>
        <div className={`${styles.minMaxItemWrapper} ${
          isMinClicked ? styles.active : ''
        }`}
          ref={minRef}
          onClick={e=> {
                        e.stopPropagation();
                        setIsMinClicked(true)
                        setIsMaxClicked(false)}}>
            <p className={styles.minMaxText}>최소</p>
       
            {!isMinClicked  ? <p className={styles.minMaxText}>₩ {minVal.toLocaleString()}</p>
                            : <input type='text' 
                              value={minVal}
                              className={styles.minMaxValueField}
                              onChange={e => setMinVal(Number(e.target.value))}/>
                            }
        </div>
        <div className={`${styles.minMaxItemWrapper} ${
          isMaxClicked ? styles.active : ''
        }`}
          ref={maxRef}
          onClick={(e) => {
                        e.stopPropagation();
                        setIsMaxClicked(true);
                        setIsMinClicked(false);
                    }}>
            <p className={styles.minMaxText}>최대</p>
       
            {!isMaxClicked ? <p className={styles.minMaxText}>₩ {maxVal.toLocaleString()}</p> 
                           : <input type='text' 
                              value={maxVal}
                              className={styles.minMaxValueField}
                              onChange={(e)=> setMaxVal(Number(e.target.value))}
                            />}
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;