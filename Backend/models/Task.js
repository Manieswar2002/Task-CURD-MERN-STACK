import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

export default mongoose.model('Task', taskSchema);
