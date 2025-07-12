import Message from '../models/Message.js';

import User from '../models/user.js';

export const createMessage = async (req, res) => {
  try {
    if (!await User.findById(req.userId).isAdmin) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ msg: 'Message is required' });
    }
    const msg = await Message.create({ message });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};