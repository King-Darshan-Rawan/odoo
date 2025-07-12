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
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false }
});

const User =  mongoose.model('User', userSchema);

export default User;