import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isBanned: { $ne: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      user = await User.create({ _id: req.params.userId, profile: { name: 'Anonymous' }, skillsOffered: [], skillsWanted: [] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, profile } = req.body;
    if (!userId || !profile.name) {
      return res.status(400).json({ error: 'User ID and name are required' });
    }
    await User.updateOne({ _id: userId }, { $set: { profile } }, { upsert: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { type, skill } = req.body;
    if (!skill) {
      return res.status(400).json({ error: 'Skill is required' });
    }
    const update = type === 'offered' ? { $push: { skillsOffered: skill } } : { $push: { skillsWanted: skill } };
    await User.updateOne({ _id: req.params.userId }, update);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeSkill = async (req, res) => {
  try {
    const { type, skill } = req.body;
    const update = type === 'offered' ? { $pull: { skillsOffered: skill } } : { $pull: { skillsWanted: skill } };
    await User.updateOne({ _id: req.params.userId }, update);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const banUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.userId }, { $set: { isBanned: true } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};