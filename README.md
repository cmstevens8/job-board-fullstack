# My Job Board

A full-stack job board web application built with **React**, **Tailwind CSS**, and **Flask**.  
Users can browse jobs, apply for positions, and manage their applications. Recruiters can post jobs and view applicants.

---

## Features

- User authentication (Job Seekers and Recruiters)
- Browse, search, and filter jobs
- Apply for jobs (Job Seekers)
- Manage posted jobs and view applicants (Recruiters)
- Responsive design with light and dark mode
- RESTful API backend with JWT authentication

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios  
- **Backend:** Flask, SQLite, JWT Authentication  
- **Tooling:** Vite, ESLint, PostCSS

---

## Project Structure

my-job-board/
│
├─ src/
│ ├─ components/ # React components (Navbar, JobCard, etc.)
│ ├─ context/ # AuthContext & ThemeContext
│ ├─ pages/ # React pages (Home, Login, FindJobs, JobDetail, etc.)
│ ├─ services/ # API service functions
│ ├─ styles/ # CSS / Tailwind
│ └─ App.jsx # Main app component
│
├─ LICENSE # MIT License
├─ package.json
├─ vite.config.js
└─ README.md


---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/my-job-board.git
cd my-job-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app should now be running at http://localhost:5173

## Usage

- Register as a Job Seeker to browse and apply for jobs. 
- Register as a Recruiter to post jobs and view applications.  
- Switch between Light and Dark themes using the toggle in the navbar.
- View detailed job information and apply directly from the job detail page.

## License
This project is licensed under the MIT License.
You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, as long as the original license and copyright notice are included.

See the LICENSE
 file for full details.