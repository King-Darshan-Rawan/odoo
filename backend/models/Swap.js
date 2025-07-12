import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  skillOffered: { type: String, required: true },
  skillWanted: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Swap', swapSchema);