<<<<<<< HEAD
// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//  Initialize app first
const app = express();

// Middleware
// app.use(cors({
//   origin: ['http://localhost:3000',"http://localhost:5173"],// React dev server
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
app.use(cors())
app.use(express.json());

// Import routers after app is declared
const booksRouter = require('./routes/books');

//  Mount routers
app.use('/api/books', booksRouter);
console.log(' Books routes mounted at /api/books');

// Test route
app.get('/', (req, res) => res.send(' Bookstore API is running'));

//Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err.message));

//Handle 404
app.use((req, res) => {
  console.error(`Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//  Initialize app first
const app = express();

// Middleware
// app.use(cors({
//   origin: ['http://localhost:3000',"http://localhost:5173"],// React dev server
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
app.use(cors())
app.use(express.json());

// Import routers after app is declared
const booksRouter = require('./routes/books');

//  Mount routers
app.use('/api/books', booksRouter);
console.log(' Books routes mounted at /api/books');

// Test route
app.get('/', (req, res) => res.send(' Bookstore API is running'));

//Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err.message));

//Handle 404
app.use((req, res) => {
  console.error(`Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> 5537394c1179184fef942c783d9e1af1aeb1d7eb
