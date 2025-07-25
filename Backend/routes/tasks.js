import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const task = await Task.create({ userId: req.userId, title: req.body.title });
  res.status(201).json(task);
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });


    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});


router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

export default router;
