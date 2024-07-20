import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { app, server } from './socket/socket.js';

// Load environment variables from .env file
dotenv.config();

const __dirname = path.resolve();
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
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB is Connected ${process.env.MONGO_DB_URI}`);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err.message);
  }
};

startServer();
