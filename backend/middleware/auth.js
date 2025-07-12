import User from '../models/user.js'; 

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.userId = user._id; // Attach userId to request
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export {authMiddleware};