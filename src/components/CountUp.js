'use client';

import { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Parse the numeric part
  const numericEnd = parseInt(end.replace(/[^0-9]/g, ''), 10);
  const prefix = end.match(/^[^0-9]*/)?.[0] || '';
  const suffixFromEnd = end.match(/[^0-9]*$/)?.[0] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericEnd));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, numericEnd, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffixFromEnd}{suffix}
    </span>
  );
}
