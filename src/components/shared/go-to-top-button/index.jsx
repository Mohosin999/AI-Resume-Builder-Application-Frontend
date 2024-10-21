import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const GoToTopButton = () => {
  const [showGoToTop, setShowGoToTop] = useState(false);

  // Handle scroll visibility for the "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showGoToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-secondary text-[#FFFFFF] p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all md:bottom-8 md:right-8"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    )
  );
};

export default GoToTopButton;
