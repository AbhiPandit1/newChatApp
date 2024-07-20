import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Import socket setup
import { app, server } from './socket/socket.js';

// Load environment variables from .env file
dotenv.config();

// Define port and directory
const PORT = process.env.PORT || 5000;

// Compute __dirname equivalent for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json()); // To parse JSON payloads
app.use(cookieParser());
app.use(cors());

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB is connected to ${process.env.MONGO_DB_URI}`);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err.message);
    process.exit(1); // Exit process with failure code
  }
};

startServer();
