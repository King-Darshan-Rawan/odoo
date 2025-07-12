import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/user.js';

const router = express.Router();

// Ensure upload folder exists
const uploadDir = path.join('public', 'profile_pics');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const username = req.body.name.toLowerCase().replace(/\s+/g, "_");
    const ext = path.extname(file.originalname);
    cb(null, `${username}${ext}`);
  },
});

const upload = multer({ storage });

// ✅ UPDATE PROFILE (not create new user)
router.post('/complete-profile', upload.single('photo'), async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const photoUrl = req.file ? `/profile_pics/${req.file.filename}` : '';

    const updatedFields = {
      'profile.name': req.body.name,
      'profile.location': req.body.location,
      'profile.isPublic': req.body.isPublic === 'true',
      skillsOffered: JSON.parse(req.body.skillsOffered || '[]'),
      skillsWanted: JSON.parse(req.body.skillsWanted || '[]'),
    };

    if (req.body.availability) updatedFields.availability = req.body.availability;
    if (photoUrl) updatedFields.photo = photoUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


export default router;