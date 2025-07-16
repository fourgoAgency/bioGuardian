'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, className, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <p ref={ref} className={className}>
      {count}{suffix}
    </p>
  );
};

export default AnimatedCounter;
