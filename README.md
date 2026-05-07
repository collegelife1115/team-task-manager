# Team Task Manager

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) for managing team projects and tasks with Role-Based Access Control (RBAC).

## Features

- **User Authentication**: Secure sign-up and login using JSON Web Tokens (JWT).
- **Role-Based Access Control (RBAC)**: Support for different user roles (e.g., Admin, Manager, Intern) with varying permissions.
- **Project Management**: Create, view, update, and manage team projects.
- **Task Management**: Assign, track, and update tasks within projects.
- **Interactive UI**: A modern, responsive interface built with React and styled with Tailwind CSS, featuring smooth animations using Framer Motion.
- **Data Visualization**: Charts and analytics for project/task progress tracking using Chart.js.

## Tech Stack

### Frontend (Client)
- **Framework**: [React.js](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Headless UI](https://headlessui.dev/), [Heroicons](https://heroicons.com/), [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Validation**: [Joi](https://joi.dev/)

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/                # React source code (components, pages, context, etc.)
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
│
└── server/                 # Backend Express application
    ├── controllers/        # Route controllers (logic)
    ├── models/             # Mongoose schemas (User, Task, Project)
    ├── routes/             # Express routes (auth, user, task, project)
    ├── middleware/         # Custom middleware (auth, validation)
    └── package.json        # Backend dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository** (if applicable) and navigate to the project directory.

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Environment Variables**: 
   Create a `.env` file in the `server` directory and add the necessary environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).

2. **Frontend Environment Variables**:
   If needed, create a `.env` file in the `client` directory for Vite specific environment variables (e.g., `VITE_API_URL`).

### Running the Application Locally

You can run the client and server separately.

**Start the Backend Server:**
```bash
cd server
npm run dev
```

**Start the Frontend Development Server:**
```bash
cd client
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on the port specified in your `.env` file (e.g., `http://localhost:5000`).
