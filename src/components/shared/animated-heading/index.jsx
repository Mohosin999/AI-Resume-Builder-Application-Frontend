import React from "react";
import { motion } from "framer-motion";

const AnimatedHeading = ({ text, className }) => {
  const words = text.split(" ");

  // Define animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from below
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Delay each word by 0.2s
        duration: 0.5,
      },
    }),
  };

  return (
    <h1 className={`text-primary text-3xl md:text-5xl font-bold ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={index} // Pass the index as a custom prop
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;
