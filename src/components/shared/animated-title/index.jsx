import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const AnimatedTitle = ({ title, className }) => {
  return (
    <motion.h2
      className={`text-lg font-bold text-blue-700 ${className}`}
      animate={{
        x: ["0%", "100%", "0%"], // Moves from left (-100%) to right (100%) and back
      }}
      transition={{
        duration: 10, // Time taken for one complete left-to-right and back animation
        repeat: Infinity, // Repeat forever
        repeatType: "reverse", // Reverse the direction after each cycle
        ease: "linear", // Ensure smooth motion with linear easing
      }}
    >
      {title}
    </motion.h2>
  );
};

// Define PropTypes
AnimatedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AnimatedTitle;
