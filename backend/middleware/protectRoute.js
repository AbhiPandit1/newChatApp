import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
  try {
    // Check for token in cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach user object to the request object
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors and other potential issues
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token Expired' });
    }

    console.error('Error in protectRoute middleware: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default protectRoute;
