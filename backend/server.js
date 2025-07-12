import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/User.js';
import swapRoutes from './routes/Swap.js';
import messageRoutes from './routes/Message.js';
import jwt from 'jsonwebtoken';
import userRoutes from './routes/User.js';
import swapRoutes from './routes/Swap.js';
import messageRoutes from './routes/Message.js';



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/profile_pics", express.static("public/profile_pics"));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use(userRoutes);
app.use(swapRoutes);
app.use(messageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));