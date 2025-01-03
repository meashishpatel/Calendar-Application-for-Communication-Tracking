# Communication Tracker Application

## Overview
The **Communication Tracker Application** is a full-stack web application designed for managing communication workflows. It includes role-based access control with three user roles:
- **Super Admin**:
  - Can create Admin and User accounts.
- **Admin**:
  - Can create User accounts.
- **User**:
  - Can register themselves and track their communications.
 
## Demo Video: 
![Communication Tracker Demo](https://github.com/meashishpatel/Calendar-Application-for-Communication-Tracking/blob/main/frontend/src/assets/gif.gif?raw=true)

### Features:
- **Login & Registration**:
  - Super Admin, Admin, and User roles with restricted access.
- **Role-Based Access**:
  - Admin and Super Admin can manage user roles.
- **Communication Management**:
  - Track and schedule communications via a dashboard.
  - Supports default communication methods (e.g., LinkedIn Post, Email).
- **Interactive Dashboard**:
  - Displays last five communications and upcoming tasks.

## Folder Structure
```plaintext
communication-tracker/
├── backend/
│   ├── models/
│   │   ├── CommunicationLog.js
│   │   ├── CommunicationMethod.js
│   │   ├── Company.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   ├── Shared/
│   │   │   └── User/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── main.jsx
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Prerequisites
Ensure you have the following installed:
- Node.js and npm
- MongoDB (local or remote instance)
- Git (optional for cloning)


## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/communication-tracker.git
cd communication-tracker
```
### 2. Backend Setup
  - Navigate to the backend folder:
      ```bash
      git clone https://github.com/your-repo/communication-tracker.git
      cd communication-tracker
      ```
  - Install dependencies:
      ```bash
      npm install
      ```
  - Create a .env file in the backend directory with the following variables:
    ```bash
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_secret_key
      PORT=5000
      ```
  - Start the backend server:
      ```bash
      node server.js
      ```

### 2. Frontend Setup
  - Navigate to the frontend folder:
      ```bash
      cd ../frontend
      ```
  - Install dependencies:
      ```bash
      npm install
      ```
  - Start the frontend  server:
      ```bash
      npm run dev
      ```


## Usage

### Super Admin:
- Login and create Admin and User accounts.

### Admin:
- Login and create User accounts.

### User:
- Register and use the dashboard to track communications.

## Default Roles
- **Super Admin**: Must be initialized directly in the database with a role of superadmin.
- **Admin**: Created by Super Admin.
- **User**: Can register themselves.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and retrieve a token.

### Role-Based Actions
- `POST /api/auth/create` - Create users or admins (Admin/Super Admin only).

### Dashboard
- `GET /api/user/dashboard` - Fetch user dashboard data.

## Technologies Used
- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: CSS

## Screenshots
![image](https://github.com/user-attachments/assets/db2d6eb7-64ed-4ae2-8802-66f560957147)
![image](https://github.com/user-attachments/assets/1e6b9169-b531-44e0-8ce8-306bbc11b421)
![image](https://github.com/user-attachments/assets/d040a570-5eff-4028-958b-30be39afddc7)
### Admin
![image](https://github.com/user-attachments/assets/c8c103f8-3c5e-4ff7-96fe-ff0943808d5d)
![image](https://github.com/user-attachments/assets/3a7807b2-0745-494f-83f7-e73807a14e14)
### User
![image](https://github.com/user-attachments/assets/e4d9046d-2841-4987-ad30-846becbf6174)
![image](https://github.com/user-attachments/assets/495045d2-b98d-4f26-82bd-4316a2820421)
![image](https://github.com/user-attachments/assets/5d47b715-858a-4570-b3e7-04c3cdd4b3ea)




