const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User"); // MongoDB User model

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profile_pics"); // save in public/profile_pics
  },
  filename: function (req, file, cb) {
    const username = req.body.name.toLowerCase().replace(/\s+/g, "_"); // john doe -> john_doe
    const ext = path.extname(file.originalname);
    cb(null, `${username}${ext}`); // john_doe.png
  },
});

const upload = multer({ storage: storage });

router.post("/complete-profile", upload.single("photo"), async (req, res) => {
  try {
    let photoUrl = "";
    if (req.file) {
      photoUrl = `/profile_pics/${req.file.filename}`;
    }

    const user = new User({
      name: req.body.name,
      location: req.body.location,
      photo: photoUrl,
      skillsOffered: JSON.parse(req.body.skillsOffered),
      skillsWanted: JSON.parse(req.body.skillsWanted),
      availability: req.body.availability,
      isPublic: req.body.isPublic === "true",
    });

    await user.save();
    res.status(201).json({ message: "Profile created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

module.exports = router;
