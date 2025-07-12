import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/user.js';
import path from 'path';
import fs from 'fs';

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;
    let { profile, skillsOffered, skillsWanted } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Handle photo upload if exists
    if (req.file) {
      const photoPath = `/profile_pics/${req.file.filename}`;
      profile = { ...profile, photo: photoPath };
    }

    // Build update object
    const updateFields = {};
    if (profile) updateFields.profile = profile;
    if (skillsOffered) updateFields.skillsOffered = JSON.parse(skillsOffered);
    if (skillsWanted) updateFields.skillsWanted = JSON.parse(skillsWanted);

    await User.updateOne({ _id: userId }, { $set: updateFields });
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
