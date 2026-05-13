HireFlow

Project Overview:
HireFlow is a job search website built using React and Vite.
The system helps users:

Search for jobs:
Filter jobs by category
View job details
Save jobs
Apply for jobs
Navigate different career pages

The project is mainly a frontend application.

Technologies Used:
React
JavaScript
Vite
CSS
Git & GitHub
GitHub Pages

Main Features:
Browse jobs
Search jobs
Filter jobs
View full job details
Save favorite jobs
Apply using external links
Responsive design
Loading and error handling



Team Members & Roles
Athanas – Frontend & Design
Worked on:
Navbar
Home page
Styling
Mobile responsiveness

Files:
Navbar.jsx
Home.jsx
main.css
App.css
index.css

Abdirahman Cabdi – API & App Logic
Worked on:
Fetch logic
Job data handling
App state management
Loading and error handling


Files:
api.js
App.jsx

Donald – Job Display
Worked on:
Job cards
Job list display

Files:
JobCard.jsx
JobList.jsx

Albert – UX & Interaction
Worked on:


Search bar
Filters
Loader
Error messages

Files:
SearchBar.jsx
Filters.jsx
Loader.jsx
Error.jsx

HIREFLOW2/
│
├── backend/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Error.jsx
│   │   ├── Filters.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── InfoPages.jsx
│   │   └── JobDetails.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── styles/
│   │   └── main.css
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js

Important Files
App.jsx:
Controls the main app logic:
Navigation
Selected jobs
Saved jobs
Search
Filters

api.js
Handles job data and frontend API logic.

Home.jsx:
Displays
Search section
Filters
Job listings

JobDetails.jsx:
Shows full information about a selected job.

How HireFlow Works:
 User searches/filter jobs
       ↓
 React updates state
        ↓
  api.js processes job data
        ↓
  Jobs display on screen
       ↓
   User views or applies


Running the Project:
1. Clone Repository
git clone https://github.com/AbdiCHAN/HireFlow2.git

2. Open Folder
cd HireFlow2

3. Install Packages
npm install

4. Run Project
npm run dev

5. Open Browser
http://localhost:5173

Build Project:
npm run build

Deploy to GitHub Pages:
npm run deploy

Live Site:
HireFlow Live Website

Git Branches:
main
donald
ui-ux-interaction
feature/ui-navbar
feature/api-fetch-logic

Git Workflow
Pull Latest Changes:
git checkout maingit pull origin main

Switch Branch:
git checkout feature/api-fetch-logic

Add Changes:
git add .

Commit:
git commit -m "Update feature"

Push Changes
git push origin branch-name

Project Summary:
HireFlow is a React-based job search platform that allows users to search, filter, save, and apply for jobs.

The project is divided into team roles so each member works on a specific part of the system.

The backend/ folder is currently empty and reserved for future backend development.