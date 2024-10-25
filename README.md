# Frontend: AI-Powered Resume Builder Application

## 📑 Table of Contents

- [Description](#-description)
- [Technologies & Tools Used](#-technologies--tools-used)
- [Features](#-features)
- [Setup and Installation](#-setup-and-installation)

## 📄 Description

I developed an AI-Powered Resume Builder Application designed to help users create professional resumes with ease and flexibility. Users can customize their resumes by adding sections, colors, and styles. If they choose not to include certain sections, they can simply leave them empty without any issues. Integrated Google Gemini AI to generate personalized resume summaries. Users can select their own color themes for a personalized look and can download their resumes as PDFs and easily share them.

The AI provides a "Resume Score" to indicate professionalism and offers suggestions for improvement. To enhance performance, I implemented lazy loading, and used React hooks (useMemo, useCallback) to optimize rendering and improve responsiveness. I also focused on reusable code by developing modular components.

## 💻 Technologies & Tools Used

- **Frontend:** React.js, Context API, React Router DOM, Tailwind CSS, Framer Motion
- **Backend:** Strapi
- **AI Integration:** Google Gemini AI
- **Authentication:** Clerk
- **Text Editor:** React Quill
- **Others:** React Web Share, PropTypes, Axios

## 🛠 Features

### Customizable Resume Sections

User can add any resume section or leave it blank and move to another section. Also user can add multiple entries within a section and delete and edit any specific entries.

### AI Summary Generation

Integrated Google Gemini AI to generate resume summaries based on user input. Users can review and choose from AI-suggested summaries to enhance their resume.

### AI Resume Scoring

After creating a resume, users can use the AI Resume Scoring feature. This analyzes the entire resume and provides a "Resume Score" to indicate the level of professionalism. Additionally, the AI offers tailored suggestions for improvement.

I collected all user input and generated a detailed prompt, which is sent to the AI when the user clicks the button. Based on this prompt, the AI produces scoring and suggestions.

### Download & Share Options

User can download resume in PDF format or can share it.

### Theme Color Customization

User can customize the resume theme with user-selected colors, creating a professional look.

### Enhanced User Experience

Optimized for speed and responsiveness, with techniques like lazy loading to ensure seamless performance across devices.

## 🚀 Setup and Installation

Follow these steps to set up this application's frontend on your local machine:

### `Clone the Repository:`

```
https://github.com/Mohosin999/AI-Resume-Builder-Application-Frontend.git
```

### `Install Dependencies:`

Install all dependencies by typing this in your terminal.

```
npm install
```

### `Configure Environment Variables:`

Create a `.env.local` file in the root directory and set the following variables:

```
VITE_CLERK_PUBLISHABLE_KEY= (key from your clerk account)

VITE_STRAPI_API_KEY= (api key from strapi backend)

VITE_GOOGLE_AI_API_KEY= (key from google gemini AI)

# Base URL
VITE_BASE_URL= https://ai-resume-builder-application-backend.onrender.com (or your base url)
```

### `Start the Server:`

```
npm run dev
```

#### The End
