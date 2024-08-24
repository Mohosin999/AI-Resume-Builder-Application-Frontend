// Import the Axios library for making HTTP requests.
import axios from "axios";

// API key from environment variables (e.g., from a .env.local file).
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

/**
 * ===================
 * Create Axios Client
 * ===================
 */
const axiosClient = axios.create({
  // URL from strapi
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Function to create new resume
const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

// Function to get all user resume by user_email
const GetUserResumes = (userEmail) =>
  // axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

// Function to update the resume information
const updateResumeDetails = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);

// Export the CreateNewResume function as part of the default export.
export default {
  CreateNewResume,
  GetUserResumes,
  updateResumeDetails,
};
