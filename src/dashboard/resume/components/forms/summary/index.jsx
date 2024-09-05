// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Brain, LoaderCircle } from "lucide-react";
// import { AIChatSession } from "../../../../../../service/AIModal";
// import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
// import GlobalApi from "../../../../../../service/GlobalApi";
// import { Button } from "../../../../../components/ui/button";
// import { Textarea } from "../../../../../components/ui/textarea";

// // Prompt to create summary from AI
// const PROMPT =
//   "Job Title: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience Level and summary with Experience level for Fresher, Mid-Level and Experienced";

// /**
//  * summary Component
//  *
//  * @param {Function} setEnableNext - It will be a function
//  * @returns {JSX.Element}
//  */
// const Summary = ({ setEnableNext, activeFormIndex, setActiveFormIndex }) => {
//   // Destructuring resume information from useContext
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

//   // States
//   const [summary, setSummary] = useState(resumeInfo?.attributes?.summary || "");
//   const [loading, setLoading] = useState(false);

//   // Get the resume id from url
//   const params = useParams();

//   // Effect to update the resumeInfo when summary will change
//   useEffect(() => {
//     // summary &&
//     setResumeInfo({
//       ...resumeInfo,
//       attributes: {
//         ...resumeInfo?.attributes,
//         summary: summary,
//       },
//     });
//   }, [summary]);

//   /**
//    * ====================================================
//    * Function to handle the saving of the resume summary
//    * ====================================================
//    */
//   const handleSave = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Define a data variable with the form data
//     const data = {
//       data: {
//         summary: summary,
//       },
//     };

//     GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
//       (res) => {
//         setEnableNext(true);
//         setLoading(false);
//         toast("summary Updated Successfully!");
//       },
//       (error) => {
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div>
//       <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
//         {/* Heading and Skip Button */}
//         <div className="flex justify-between">
//           <h2 className="font-bold text-lg">Summary</h2>
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => {
//               setActiveFormIndex(activeFormIndex + 1);
//               setEnableNext(true);
//             }}
//           >
//             Skip
//           </Button>
//         </div>
//         {/* Sub Heading */}
//         <p>Here you can add or skip your summary</p>

//         {/*
//          * =====================================================
//          *                   summary Form
//          * =====================================================
//          */}
//         <form onSubmit={handleSave} className="mt-7">
//           <div>
//             <label>Add summary</label>
//           </div>

//           {/* Textarea */}
//           <Textarea
//             className="mt-5"
//             value={resumeInfo?.attributes?.summary}
//             // onChange={(e) => setSummary(e.target.value)}
//             onChange={(e) => {
//               setEnableNext(false);
//               setSummary(e.target.value);
//             }}
//           />

//           {/* Save button */}
//           <div className="mt-2 flex justify-end">
//             <Button type="submit" size="sm" disabled={loading}>
//               {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Summary;

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Brain, LoaderCircle } from "lucide-react";
// import { AIChatSession } from "../../../../../../service/AIModal";
// import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
// import GlobalApi from "../../../../../../service/GlobalApi";
// import { Button } from "../../../../../components/ui/button";
// import { Textarea } from "../../../../../components/ui/textarea";

// // Prompt to create summary from AI
// const PROMPT =
//   "Job Title: {jobTitle}, Generate a JSON object for a resume summary tailored to different experience levels, based on the provided job title. The JSON should include 'experienceLevel' and 'summary' fields for each experience level (Fresher, Mid-Level, Experienced). Each summary should be within 4-5 lines.";

// /**
//  * summary Component
//  *
//  * @param {Function} setEnableNext - It will be a function
//  * @returns {JSX.Element}
//  */
// const Summary = ({ setEnableNext, activeFormIndex, setActiveFormIndex }) => {
//   // Destructuring resume information from useContext
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

//   // States
//   const [summary, setSummary] = useState(resumeInfo?.attributes?.summary || "");
//   const [loading, setLoading] = useState(false);
//   const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

//   // Get the resume id from url
//   const params = useParams();

//   // Effect to update the resumeInfo when summary will change
//   useEffect(() => {
//     // summary &&
//     setResumeInfo({
//       ...resumeInfo,
//       attributes: {
//         ...resumeInfo?.attributes,
//         summary: summary,
//       },
//     });
//   }, [summary]);

//   const GenerateSummeryFromAI = async () => {
//     setLoading(true);
//     const prompt = PROMPT.replace(
//       "{jobTitle}",
//       resumeInfo?.attributes?.jobTitle
//     );
//     const result = await AIChatSession.sendMessage(prompt);

//     console.log("prompt -> ", prompt);
//     console.log("result -> ", result.response.text());
//     console.log(
//       "json parse -> ",
//       Object.values(JSON.parse(result.response.text()))
//     );

//     setAiGenerateSummeryList(Object.values(JSON.parse(result.response.text())));
//     setLoading(false);
//   };

//   /**
//    * ====================================================
//    * Function to handle the saving of the resume summary
//    * ====================================================
//    */
//   const handleSave = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Define a data variable with the form data
//     const data = {
//       data: {
//         summary: summary,
//       },
//     };

//     GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
//       (res) => {
//         setEnableNext(true);
//         setLoading(false);
//         toast("summary Updated Successfully!");
//       },
//       (error) => {
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div>
//       <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
//         {/* Heading and Skip Button */}
//         <div className="flex justify-between">
//           <h2 className="font-bold text-lg">Summary</h2>
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => {
//               setActiveFormIndex(activeFormIndex + 1);
//               setEnableNext(true);
//             }}
//           >
//             Skip
//           </Button>
//         </div>
//         {/* Sub Heading */}
//         <p>Here you can add or skip your summary</p>

//         {/*
//          * =====================================================
//          *                   summary Form
//          * =====================================================
//          */}
//         <form onSubmit={handleSave} className="mt-7">
//           {/* Label and AI Button */}
//           <div className="flex justify-between items-end">
//             <label>Add Summery</label>
//             <Button
//               variant="outline"
//               onClick={() => GenerateSummeryFromAI()}
//               type="button"
//               size="sm"
//               className="border-primary text-primary flex gap-2"
//             >
//               <Brain className="h-4 w-4" /> Generate from AI
//             </Button>
//           </div>

//           {/* Textarea */}
//           <Textarea
//             className="mt-5"
//             value={resumeInfo?.attributes?.summary}
//             // onChange={(e) => setSummary(e.target.value)}
//             onChange={(e) => {
//               setEnableNext(false);
//               setSummary(e.target.value);
//             }}
//           />

//           {/* Save button */}
//           <div className="mt-2 flex justify-end">
//             <Button type="submit" size="sm" disabled={loading}>
//               {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
//             </Button>
//           </div>
//         </form>
//       </div>

//       {/*
//        * =====================================================
//        *                  AI Suggestions
//        * =====================================================
//        */}
//       <div>
//         {/* Show the title after generated suggestions */}
//         {aiGeneratedSummeryList && (
//           <h2 className="font-bold text-lg p-5 mt-2">Suggestions</h2>
//         )}
//         {/* Map and Display the Result */}
//         {aiGeneratedSummeryList?.map((item, index) => (
//           <div
//             key={index}
//             className="p-5 rounded-lg shadow-lg bg-white border border-gray-200"
//           >
//             <h3 className="font-semibold text-primary text-md mb-2">
//               {item?.experienceLevel}
//             </h3>
//             <p className="text-gray-700">{item?.summary}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Summary;
