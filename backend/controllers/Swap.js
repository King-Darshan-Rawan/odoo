import Swap from '../models/Swap.js';

export const getSwaps = async (req, res) => {
  try {
    const { userId } = req.query;
    const swaps = await Swap.find({ $or: [{ from: userId }, { to: userId }] });
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSwap = async (req, res) => {
  try {
    const { from, to, skillOffered, skillWanted } = req.body;
    if (!from || !to || !skillOffered || !skillWanted) {
      return res.status(400).json({ error: 'All swap fields are required' });
    }
    const swap = await Swap.create({ from, to, skillOffered, skillWanted });
    res.json(swap);
    // Note: Real-time sync could be added via WebSockets if time allows
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSwap = async (req, res) => {
  try {
    const { action } = req.body;
    if (action === 'delete') {
      await Swap.deleteOne({ _id: req.params.swapId });
    } else {
      await Swap.updateOne({ _id: req.params.swapId }, { $set: { status: action } });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};