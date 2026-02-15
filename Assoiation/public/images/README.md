# Association Project

This repository contains both the Frontend and Backend for the Association application.

## 📂 Project Structure
- `/Assoiation`: Frontend (React + Vite + Tailwind CSS)
- `/Backend`: Backend (Node.js + Express + PostgreSQL)

---

## 🚀 How to Run the Backend Server

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [PostgreSQL](https://www.postgresql.org/) installed and running.

### 2. Setup Environment Variables
Go to the `Backend` directory and open the `.env` file. Update it with your PostgreSQL credentials:
```env
PORT=5000
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=association_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

### 3. Install Dependencies
If you haven't already, install the necessary packages:
```bash
cd Backend
npm install
```

### 4. Start the Server
You have two options to run the server:

#### A. Development Mode (Recommended)
Automatically restarts the server when you make code changes:
```bash
npm run dev
```

#### B. Production Mode
Runs the server normally:
```bash
npm start
```

Your server will be running at: **`http://localhost:5000`**

---

## 💻 How to Run the Frontend
1. Open a new terminal.
2. Navigate to the frontend folder:
   ```bash
   cd Assoiation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will be running at: **`http://localhost:5173`** (or the port shown in your terminal).
