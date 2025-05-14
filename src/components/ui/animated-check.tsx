"use client";

import { motion } from "framer-motion";

interface AnimatedCheckProps {
  isVisible: boolean;
}

export function AnimatedCheck({ isVisible }: AnimatedCheckProps) {
  const checkVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 flex items-center justify-center w-12 h-12 bg-brand text-white rounded-full shadow-lg"
      initial="hidden"
      animate="visible"
      variants={checkVariants}
      aria-live="polite"
      aria-label="Operation completed successfully"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6L9 17 4 12" />
      </svg>
    </motion.div>
  );
} 