// import React from "react";
// import Header from "../components/header";
// import { Button } from "../components/ui/button";
// import {
//   ArrowRight,
//   GithubIcon,
//   LinkedinIcon,
//   TwitterIcon,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import Footer from "../components/footer";
// import { motion } from "framer-motion"; // Import framer-motion
// import CustomParagraph from "../components/ui/CustomParagraph";
// import AnimatedHeading from "../components/shared/animated-heading";
// import Wrapper from "../components/wrapper";

// const Home = () => {
//   const { isSignedIn } = useUser();
//   const navigate = useNavigate();

//   // Function to manage get started button
//   const handleGetStarted = () => {
//     if (isSignedIn) {
//       navigate("/dashboard");
//     } else {
//       navigate("/auth/sign-in");
//     }
//   };

//   // Variants for animation
//   const fadeUp = {
//     hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and move from below
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Fade in and move up
//   };

//   return (
//     <div>
//       <Header />

//       <Wrapper>
//         <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
//           {/* <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto my-6 md:my-16 text-center"> */}

//           {/* Heading */}
//           {/* <h1 className="text-primary text-3xl md:text-5xl font-bold">
//           Build Your Professional Resume
//         </h1> */}
//           <AnimatedHeading text="Build Your Professional Resume" />

//           {/* Sub-heading */}
//           <CustomParagraph className="mt-4 mb-6">
//             Create your resume with maintaining professionalism and efficiency.
//             Our AI helps you ensure your resume stands out by providing feedback
//             on how professional it is, giving you a clear score to improve.
//           </CustomParagraph>

//           {/* Buttons */}
//           <div className="flex flex-col md:flex-row items-center justify-center gap-3">
//             {/* Get started button */}
//             <Button onClick={handleGetStarted} className="w-full md:w-auto">
//               Get Started <ArrowRight className="ml-2 w-5 h-5" />
//             </Button>
//             {/* Show codes button */}
//             <a
//               href="https://github.com/Mohosin999/AI-Resume-Builder-Application-Frontend"
//               target="_blank"
//               className="w-full md:w-auto"
//             >
//               <Button variant="outline" className="w-full md:w-auto">
//                 View GitHub Repository <GithubIcon className="ml-2 w-5 h-5" />
//               </Button>
//             </a>
//           </div>

//           {/* Social Links */}
//           <div className="mt-6 md:mt-12">
//             <h3 className="mt-5 text-xl text-gray-700 font-semibold">
//               Connect With Me
//             </h3>

//             <div className="flex items-center justify-center gap-6 mt-3">
//               {/* Add Links for Social Icons */}
//               <a href="https://www.linkedin.com/in/mohosinh99/" target="_blank">
//                 <LinkedinIcon className="text-primary hover:text-blue-600" />
//               </a>

//               <a
//                 href="https://x.com/mohosinh99"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <TwitterIcon className="text-primary hover:text-blue-400" />
//               </a>

//               <a
//                 href="https://github.com/Mohosin999"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <GithubIcon className="text-primary hover:text-gray-700" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Interesting Section: Key Features */}
//         <div className="w-full bg-gray-200 py-10 md:py-16 mt-10">
//           <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
//             <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8">
//               Why Use Our AI Resume Builder?
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
//               {[
//                 "AI-Powered Suggestions",
//                 "Customizable Templates",
//                 "Real-Time Feedback",
//                 "AI Calculate Resume Score",
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeUp}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true }}
//                   className="p-6 bg-white rounded-lg shadow-sm lg:shadow-md"
//                 >
//                   <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
//                     {feature}
//                   </h3>
//                   <CustomParagraph className="!text-sm md:!text-base">
//                     Vestibulum ante ipsum primis in faucibus orci luctus et
//                     ultrices posuere cubilia curae; Duis consequat, metus ac
//                     aliquam luctus.
//                   </CustomParagraph>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Testimonials Section */}
//         <div className="w-full pt-10 md:py-16">
//           <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
//             <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8">
//               What Our Users Are Saying
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
//               <motion.div
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm lg:shadow-md"
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={fadeUp}
//               >
//                 <CustomParagraph className="italic !text-sm md:!text-base">
//                   Vestibulum ante ipsum primis in faucibus orci luctus et
//                   ultrices posuere cubilia curae; Duis consequat, metus ac
//                   aliquam luctus.
//                 </CustomParagraph>
//                 <h4 className="mt-4 font-semibold">- John Doe</h4>
//               </motion.div>

//               <motion.div
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm lg:shadow-md"
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={fadeUp}
//               >
//                 <CustomParagraph className="italic !text-sm md:!text-base">
//                   Vestibulum ante ipsum primis in faucibus orci luctus et
//                   ultrices posuere cubilia curae; Duis consequat, metus ac
//                   aliquam luctus.
//                 </CustomParagraph>
//                 <h4 className="mt-4 font-semibold">- Jane Smith</h4>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </Wrapper>

//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  ArrowUp,
} from "lucide-react"; // Added ArrowUp icon
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Footer from "../components/footer";
import { motion } from "framer-motion"; // Import framer-motion
import CustomParagraph from "../components/ui/CustomParagraph";
import AnimatedHeading from "../components/shared/animated-heading";
import Wrapper from "../components/wrapper";

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [showGoToTop, setShowGoToTop] = useState(false);

  // Function to manage get started button
  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

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

  // Variants for animation
  const fadeUp = {
    hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and move from below
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Fade in and move up
  };

  return (
    <div>
      <Header />

      <Wrapper>
        <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
          <AnimatedHeading text="Build Your Professional Resume" />

          <CustomParagraph className="mt-4 mb-6">
            Create your resume with maintaining professionalism and efficiency.
            Our AI helps you ensure your resume stands out by providing feedback
            on how professional it is, giving you a clear score to improve.
          </CustomParagraph>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Button onClick={handleGetStarted} className="w-full md:w-auto">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a
              href="https://github.com/Mohosin999/AI-Resume-Builder-Application-Frontend"
              target="_blank"
              className="w-full md:w-auto"
            >
              <Button variant="outline" className="w-full md:w-auto">
                View GitHub Repository <GithubIcon className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-6 md:mt-12">
            <h3 className="mt-5 text-xl text-gray-700 font-semibold">
              Connect With Me
            </h3>

            <div className="flex items-center justify-center gap-6 mt-3">
              <a href="https://www.linkedin.com/in/mohosinh99/" target="_blank">
                <LinkedinIcon className="text-primary hover:text-blue-600" />
              </a>

              <a
                href="https://x.com/mohosinh99"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="text-primary hover:text-blue-400" />
              </a>

              <a
                href="https://github.com/Mohosin999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="text-primary hover:text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="w-full bg-gray-600 py-10 md:py-16 mt-10">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8">
              Why Use Our AI Resume Builder?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {[
                "AI-Powered Suggestions",
                "Customizable Templates",
                "Real-Time Feedback",
                "AI Calculate Resume Score",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-lg shadow-sm lg:shadow-md"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                    {feature}
                  </h3>
                  <CustomParagraph className="!text-sm md:!text-base">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia curae; Duis consequat, metus ac
                    aliquam luctus.
                  </CustomParagraph>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="w-full pt-10 md:py-16">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8">
              What Our Users Are Saying
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              <motion.div
                className="bg-gray-50 p-6 rounded-lg shadow-sm lg:shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <CustomParagraph className="italic !text-sm md:!text-base">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Duis consequat, metus ac
                  aliquam luctus.
                </CustomParagraph>
                <h4 className="mt-4 font-semibold">- John Doe</h4>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg shadow-sm lg:shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <CustomParagraph className="italic !text-sm md:!text-base">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Duis consequat, metus ac
                  aliquam luctus.
                </CustomParagraph>
                <h4 className="mt-4 font-semibold">- Jane Smith</h4>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Go to Top Button */}
        {showGoToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all md:bottom-8 md:right-8"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </Wrapper>

      <Footer />
    </div>
  );
};

export default Home;
