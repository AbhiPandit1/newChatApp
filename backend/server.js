import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http'; // Import http to create server if not using it directly from socket.js

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Initialize environment variables
dotenv.config();

const app = express(); // Initialize express app
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // To parse JSON payloads
app.use(cookieParser());
app.use(cors());

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected at ${process.env.MONGO_DB_URI}`);

    // Create HTTP server
    const server = http.createServer(app);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Optionally, handle server shutdown
    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Server shutting down gracefully');
        mongoose.connection.close(() => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

  } catch (err) {
    console.error('Error starting server:', err.message);
    process.exit(1); // Exit process with failure code
  }
};

startServer();
