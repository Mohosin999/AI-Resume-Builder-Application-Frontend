// import axios from "axios";

// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// const axiosClient = axios.create({
//   baseURL: "http://localhost:1337/api/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

// const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

// export default {
//   CreateNewResume,
// };

// Import the Axios library for making HTTP requests.
import axios from "axios";

// Retrieve the API key from environment variables (e.g., from a .env.local file).
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// Create an Axios instance with default configuration for making requests to the Strapi API.
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/", // Set the base URL for the API.
  headers: {
    "Content-Type": "application/json", // Specify that the content type of requests is JSON.
    Authorization: `Bearer ${API_KEY}`, // Include the API key as a Bearer token in the Authorization header.
  },
});

/**
 * Function to create a new resume by sending a POST request to the '/user-resumes' endpoint.
 *
 * @param {Object} data - The resume data to be sent in the request body.
 * @returns {Promise} - The Axios promise representing the POST request.
 */
const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

// Export the CreateNewResume function as part of the default export.
export default {
  CreateNewResume,
};
