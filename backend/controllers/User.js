import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/user.js';

export const register = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      return res.status(400).json({ msg: 'Please enter all details' });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: 'User already exists with this username or email' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');
    const newUser = await User.create({
      _id: 'user_' + crypto.randomBytes(8).toString('hex'),
      name,
      email,
      username,
      password: hashedPassword,
      token,
      profile: { name, location: '', isPublic: true },
      skillsOffered: [],
      skillsWanted: []
    });
    return res.json({ message: 'User Created', userId: newUser._id, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all details' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({ msg: 'User not registered' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    await User.updateOne({ _id: user._id }, { token });
    return res.status(200).json({ message: 'Login successful', userId: user._id, token });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isBanned: { $ne: true } }).select('-password -token');
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -token');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, profile } = req.body;
    if (!userId || !profile.name) {
      return res.status(400).json({ msg: 'User ID and name are required' });
    }
    if (req.userId !== userId && !await User.findById(req.userId).isAdmin) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    await User.updateOne({ _id: userId }, { $set: { profile } });
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { type, skill } = req.body;
    if (!skill) {
      return res.status(400).json({ msg: 'Skill is required' });
    }
    const update = type === 'offered' ? { $push: { skillsOffered: skill } } : { $push: { skillsWanted: skill } };
    await User.updateOne({ _id: req.params.userId }, update);
    res.json({ message: 'Skill added successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const removeSkill = async (req, res) => {
  try {
    const { type, skill } = req.body;
    if (req.userId !== req.params.userId && !await User.findById(req.userId).isAdmin) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    const update = type === 'offered' ? { $pull: { skillsOffered: skill } } : { $pull: { skillsWanted: skill } };
    await User.updateOne({ _id: req.params.userId }, update);
    res.json({ message: 'Skill removed successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const banUser = async (req, res) => {
  try {
    if (!await User.findById(req.userId).isAdmin) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    await User.updateOne({ _id: req.params.userId }, { $set: { isBanned: true } });
    res.json({ message: 'User banned successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUserr = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    await User.deleteOne({ _id: userId });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};