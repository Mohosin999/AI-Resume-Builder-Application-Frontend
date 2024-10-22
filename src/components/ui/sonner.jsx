// "use client";
// import { useTheme } from "next-themes";
// import { Toaster as Sonner } from "sonner";

// const Toaster = ({ ...props }) => {
//   const { theme = "system" } = useTheme();

//   return (
//     <Sonner
//       theme={theme}
//       className="toaster group"
//       toastOptions={{
//         classNames: {
//           toast:
//             "group-[.toaster]:bg-blue-500 group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg flex justify-center items-center w-full", // Added flexbox and width styles
//           description: "group-[.toast]:text-white text-center w-full", // Center the text within the description
//           actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
//           cancelButton: "group-[.toast]:bg-blue-400 group-[.toast]:text-white",
//         },
//       }}
//       {...props}
//     />
//   );
// };

// export { Toaster };

"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group-[.toaster]:bg-secondary group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg flex justify-center items-center max-w-[80%] md:w-full", // Added flexbox and width styles
          description: "group-[.toast]:text-white text-center w-full", // Center the text within the description
          actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-blue-400 group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
