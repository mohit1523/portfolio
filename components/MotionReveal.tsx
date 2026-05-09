'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function MotionReveal({
  children,
  delay = 0,
  className,
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
