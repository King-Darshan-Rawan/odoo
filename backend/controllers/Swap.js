import Swap from '../models/Swap.js';
import User from '../models/user.js';

export const getSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({ $or: [{ from: req.userId }, { to: req.userId }] });
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSwap = async (req, res) => {
  try {
    const { to, skillOffered, skillWanted } = req.body;
    if (!to || !skillOffered || !skillWanted) {
      return res.status(400).json({ msg: 'All swap fields are required' });
    }
    const swap = await Swap.create({ from: req.userId, to, skillOffered, skillWanted });
    res.json(swap);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSwap = async (req, res) => {
  try {
    const { action } = req.body;
    const swap = await Swap.findById(req.params.swapId);
    if (!swap) return res.status(404).json({ msg: 'Swap not found' });
    if (swap.to !== req.userId && swap.from !== req.userId && !await User.findById(req.userId).isAdmin) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    if (action === 'delete') {
      await Swap.deleteOne({ _id: req.params.swapId });
    } else {
      await Swap.updateOne({ _id: req.params.swapId }, { $set: { status: action } });
    }
    res.json({ message: `${action.charAt(0).toUpperCase() + action.slice(1)} successful` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};