'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedPageWrapperProps {
  children: ReactNode;
  maxWidth?: string;
}

export function AnimatedPageWrapper({ children, maxWidth = 'var(--responsive-xl, 1200px)' }: AnimatedPageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth,
        margin: '0 auto',
        width: '100%',
        padding: 'var(--spacing-l, 24px)',
      }}
    >
      {children}
    </motion.div>
  );
}
