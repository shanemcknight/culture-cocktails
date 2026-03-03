'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function HeroCarousel({ images = [], interval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const advance = useCallback(() => {
    if (images.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % images.length);
      setIsTransitioning(false);
    }, 600); // match CSS transition duration
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, interval, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative h-full w-full">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current && !isTransitioning ? 1 : 0,
            zIndex: i === current ? 2 : 1,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt || 'Culture Cocktails'}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

      {/* Floating stat card */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg z-10">
        <span className="block text-2xl font-bold text-blue">100+</span>
        <span className="block text-xs text-gray-text">Products Launched</span>
      </div>

      {/* Dot indicators — only show if multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setIsTransitioning(false); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-white w-5'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
