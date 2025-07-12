import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const msg = await Message.create({ message });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};