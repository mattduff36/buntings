'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroBannerProps {
  images: string[];
  alt?: string;
  height?: string;
  overlay?: React.ReactNode;
  intervalMs?: number;
}

export function HeroBanner({
  images,
  alt = 'Agricultural equipment',
  height = '480px',
  overlay,
  intervalMs = 5000,
}: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const isCarousel = images.length > 1;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isCarousel) return;
    const timer = setInterval(advance, intervalMs);
    return () => clearInterval(timer);
  }, [isCarousel, advance, intervalMs]);

  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={images[current]}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AnimatePresence>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {overlay && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          {overlay}
        </motion.div>
      )}

      {isCarousel && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 3,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 10,
                height: 10,
                borderRadius: 5,
                border: 'none',
                background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
