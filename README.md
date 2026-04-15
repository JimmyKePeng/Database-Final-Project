# Project Name

A full-stack website project with a Node.js, mysql backend and a React frontend.

## Project Structure

This repository contains:

- `backend/` — Node.js backend code
- `music-frontend/` — React frontend built with Vite
- `*.sql` files — SQL scripts that must be run in MySQL before starting the project. Run mysql_create_table.sql first then run dummy_data.sql

## Requirements

Before running this project, make sure you have installed:

- Node.js
- npm
- MySQL

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Set up the database

This project includes two `.sql` files that need to be imported into your MySQL database.

Run both SQL files in MySQL before starting the app.

### 3. Configure environment variables

In the `backend/` folder, create a `.env` file.

Use the values in `env.js` as a reference, don't forget to enter your mysql password there.

### 4. Install backend dependencies

```bash
cd backend
npm install
```

### 5. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Project

### Start the backend

```bash
cd backend
npm start
```

### Start the frontend

```bash
cd frontend
npm run dev
```

## Notes

- Make sure MySQL is running
- Import both SQL files before starting
- Ensure your `.env` file is set up correctly
- Do not commit your real `.env` file

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js
- Database: MySQL
