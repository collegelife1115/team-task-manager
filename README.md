# Team Task Manager

A premium, full-stack Task Management application built with the MERN stack. Designed with a sleek **Deep Charcoal / Space Gray** aesthetic, featuring glassmorphism and smooth micro-interactions.

## 🚀 Features

- **Role-Based Access Control (RBAC)**:
  - 🛡️ **Admin**: Full system control, including User Management, Project Creation, and Task Assignment.
  - 💼 **Manager**: Can create new projects and assign tasks to any employee (Managers or Interns).
  - 🎓 **Intern**: Can track assigned tasks and update their progress.
- **Project Management**: Dedicated dashboard for creating and monitoring team-wide projects with deadline tracking.
- **Dynamic Task Board**: Assign tasks to specific team members with priority levels, due dates, and real-time status updates.
- **Admin Panel**: Centralized user management for adding new team members and managing roles.
- **Premium UI/UX**:
  - Dark-themed glassmorphism design.
  - Interactive modals for all creation flows.
  - Responsive layouts for desktop and mobile.
  - Real-time data synchronization with the backend.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS with Tailwind CSS for layout utilities
- **Icons**: Lucide React
- **State Management**: React Context API (Auth Context)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT Authentication, Bcrypt password hashing
- **Middleware**: Custom RBAC and Validation logic

## 📂 Project Structure

```
.
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Modals, Layout, etc.)
│   │   ├── context/        # Auth and Global State
│   │   ├── pages/          # Dashboard, Projects, Tasks, Admin Panel
│   │   └── services/       # API integration
│   └── package.json
│
└── server/                 # Express Backend
    ├── controllers/        # Business Logic
    ├── models/             # Database Schemas
    ├── routes/             # API Endpoints
    ├── middleware/         # Auth & RBAC
    └── server.js           # Entry Point
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Setup

1. **Clone & Install**:
   ```bash
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

2. **Environment Variables**:
   Create a `.env` in `server/`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

3. **Run Locally**:
   ```bash
   # Start Backend (from server directory)
   npm run dev
   
   # Start Frontend (from client directory)
   npm run dev
   ```

## 📝 Recent Updates
- ✅ **Project Creation**: Admins and Managers can now create new projects.
- ✅ **Task Assignment**: Tasks can now be assigned to any team member (Managers/Interns).
- ✅ **User Management**: Admins can add new users directly from the Admin Panel.
- ✅ **UI Refinement**: Added premium glassmorphism modals and an "Assignee" column to the task board.

---
Built with ❤️ by the Team Task Manager Project.
