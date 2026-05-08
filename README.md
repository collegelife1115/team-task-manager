Team Task Manager

A premium, full-stack Task Management application built with the MERN stack. Designed with a sleek Deep Charcoal / Space Gray aesthetic, featuring glassmorphism and smooth micro-interactions.

🚀 Features
Role-Based Access Control (RBAC)
🛡️ Admin
Full system control
User Management
Project Creation
Task Assignment
💼 Manager
Create and manage projects
Assign tasks to Managers and Interns
Monitor team progress
🎓 Intern
Track assigned tasks
Update task progress and status
📁 Project Management
Dedicated dashboard for creating and monitoring projects
Deadline tracking and progress overview
Team-wide collaboration support
📌 Dynamic Task Board
Assign tasks to specific team members
Set task priorities and due dates
Real-time status updates
Organized workflow tracking
🛠️ Admin Panel
Centralized user management
Add and manage team members
Assign and update user roles
🎨 Premium UI/UX
Dark-themed Glassmorphism design
Smooth animations and micro-interactions
Interactive modals for creation flows
Fully responsive for desktop and mobile
Real-time frontend and backend synchronization
🛠️ Tech Stack
Frontend
Framework: React.js (Vite)
Styling: Tailwind CSS + Vanilla CSS
Icons: Lucide React
State Management: React Context API
HTTP Client: Axios
Backend
Runtime: Node.js
Framework: Express.js
Database: MongoDB with Mongoose
Authentication: JWT Authentication
Security: Bcrypt Password Hashing
Middleware: Custom RBAC & Validation Logic
📂 Project Structure
.
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── context/        # Authentication & Global State
│   │   ├── pages/          # Dashboard, Projects, Tasks, Admin Panel
│   │   └── services/       # API Integration
│   └── package.json
│
└── server/                 # Express Backend
    ├── controllers/        # Business Logic
    ├── models/             # Database Schemas
    ├── routes/             # API Endpoints
    ├── middleware/         # Authentication & RBAC
    └── server.js           # Backend Entry Point
⚙️ Getting Started
Prerequisites
Node.js (v18+)
MongoDB Connection String
Setup
1️⃣ Clone & Install Dependencies
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
2️⃣ Environment Variables

Create a .env file inside the server/ directory:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
3️⃣ Run the Application
Start Backend
cd server
npm run dev
Start Frontend
cd client
npm run dev
✨ Recent Updates
✅ Project creation for Admins and Managers
✅ Task assignment to Managers and Interns
✅ User management from Admin Panel
✅ Premium glassmorphism modals
✅ Added “Assignee” column in task board
✅ Improved responsive layouts and animations
📌 Future Enhancements
Real-time notifications
Team chat integration
File attachments in tasks
Analytics dashboard
Activity logs and audit tracking
