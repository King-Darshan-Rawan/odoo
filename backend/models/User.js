import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  profile: {
    name: { type: String, required: true },
    location: String,
    isPublic: { type: Boolean, default: true }
  },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,           // ✅ ADD THIS
  photo: String,                  // ✅ ADD THIS
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false }
});


// ✅ Fix OverwriteModelError (reuse existing model if already compiled)
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;