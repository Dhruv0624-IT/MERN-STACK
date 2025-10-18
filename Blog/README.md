# MERN Blog Application

A full-stack blog application built with MongoDB, Express.js, React, and Node.js.

## Features

- User authentication (register/login)
- Create, read, update, and delete blog posts
- User-specific post management
- Responsive design
- Image upload support (backend ready)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blog
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:5173` (frontend)
2. Register a new account or login with existing credentials
3. Create, edit, and delete your blog posts
4. View all posts on the homepage

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (requires authentication)
- `PUT /api/posts/:id` - Update post (requires authentication)
- `DELETE /api/posts/:id` - Delete post (requires authentication)

## Project Structure

```
Blog/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   └── App.jsx
    └── package.json
```

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, multer
- **Frontend**: React, React Router, Axios, Context API
- **Styling**: CSS3 with modern design principles

## Notes

- Make sure MongoDB is running before starting the backend
- The JWT secret should be a long, random string for security
- Image upload functionality is implemented in the backend but not fully integrated in the frontend yet
- All API calls include proper authentication headers automatically
