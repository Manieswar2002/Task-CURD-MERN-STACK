// import express from 'express';
// import Task from '../models/Task.js';
// import auth from '../middleware/auth.js';
// import authMiddleware from '../middleware/auth.js';
// const router = express.Router();

// router.get('/', auth, async (req, res) => {
//   const tasks = await Task.find({ userId: req.userId });
//   res.json(tasks);
// });

// router.post('/', auth, async (req, res) => {
//   const task = await Task.create({ userId: req.userId, title: req.body.title });
//   res.status(201).json(task);
// });


// router.put('/:id', authMiddleware, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return res.status(404).json({ message: 'Task not found' });


//     if (req.body.title !== undefined) {
//       task.title = req.body.title;
//     }
//     if (req.body.completed !== undefined) {
//       task.completed = req.body.completed;
//     }

//     await task.save();
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });



// router.put('/:id', auth, async (req, res) => {
//   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(task);
// });


// router.delete('/:id', auth, async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Task deleted' });
// });

// export default router;








import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js'; // Cleaned up to a single import

const router = express.Router();

// GET all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // Use req.user.id from auth middleware
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new task for the logged-in user
router.post('/', auth, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Task title is required' });
    }
    const task = await Task.create({ userId: req.user.id, title }); // Use req.user.id
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT (update) a specific task
// This is now the ONLY router.put handler
router.put('/:id', auth, async (req, res) => {
  try {
    // Find the task by its ID and the user's ID to ensure users can't edit others' tasks
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, 
      req.body, 
      { new: true } // This option returns the updated document
    );

    // If no task was found (either wrong task ID or not owned by user), return 404
    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission to edit it' });
    }

    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a specific task
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the task by its ID and the user's ID to ensure users can't delete others' tasks
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    // If no task was found (either wrong task ID or not owned by user), return 404
    if (!task) {
        return res.status(404).json({ message: 'Task not found or you do not have permission to delete it' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

