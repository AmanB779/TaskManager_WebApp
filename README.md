# Task Manager App - Backend

## Overview

This is the backend service for the Task Manager application, built with Node.js and Express.js. It provides RESTful APIs for task management, user authentication, and data persistence.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
backend/
    config/         # Configuration files
    controllers/    # Route controllers
    middleware/     # Custom middleware
    models/         # Database models
    routes/         # API routes
    utils/          # Utility functions
    helper/         # Helper functions
    server.js       # Entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV
PORT
CORS_ORIGIN
MONGO_URI
JWT_SECRET_KEY
JWT_EXPIRATION
```

4. Start the server

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Tasks

- `GET /tasks` - Get all tasks
- `POST /tasks/addTask` - Create a new task
- `GET /tasks/:id` - Get task by User
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Postman Collection Link

[Postman Collection Link](https://tggtmscollection.postman.co/workspace/My-Workspace~80f37a45-abec-414a-8327-ac909e878574/collection/42508487-1c03eb39-68f0-497f-a59f-5248242121c0?action=share&creator=42508487)

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- JWT-based authentication
- Password hashing using bcryptjs
- CORS enabled
- Rate limiting

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test
```

# Task Manager App - Frontend

## Overview

This is the frontend application for the Task Manager, built with React and Vite. It provides a modern, responsive user interface for managing tasks efficiently.

## Tech Stack

- React.js
- Vite
- Bootstrap
- React Router
- Axios

## Features

- User Authentication
- Task Management
- Modern UI/UX
- Due Date Management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server

```bash
npm run dev
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint
```

## Key Features

### Task Management

- Create, read, update, and delete tasks
- Set task priorities
- Add due dates
- Mark tasks as complete
- Add task descriptions

### User Interface

- Clean and intuitive design
- Responsive layout

### Authentication

- Secure login and registration
- Password recovery
- Session management
- Protected routes

### Screenshots

#### Signup Screen

<img src="public/app_images/signup.png?raw=true" alt="Signup Screen" width="400" title="Signup Screen">

#### Login Screen

<img src="public/app_images/login.png?raw=true" alt="Login Screen" width="400" title="Login Screen">

#### Dashboard/Add Task

<img src="public/app_images/dashboard.png?raw=true" alt="Dashboard/Add Task" width="400" title="Dashboard/Add Task">

#### Edit Task

<img src="public/app_images/task_edit.png?raw=true" alt="Edit Task" width="400" title="Edit Task">

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
