import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const AnimatedTitle = ({ title, className }) => {
  const [xValue, setXValue] = useState("100%");

  useEffect(() => {
    // Function to update xValue based on screen size
    const updateXValue = () => {
      if (window.innerWidth < 640) {
        // For mobile screens (width < 640px), reduce the animation distance
        setXValue("30%"); // Adjust this percentage as per your requirement
      } else {
        // For larger screens
        setXValue("100%");
      }
    };

    // Initial check
    updateXValue();

    // Add event listener for window resizing
    window.addEventListener("resize", updateXValue);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateXValue);
  }, []);

  return (
    <motion.h2
      className={`text-base font-bold text-secondary ${className}`}
      animate={{
        x: ["0%", xValue, "0%"], // Use dynamic xValue here
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
