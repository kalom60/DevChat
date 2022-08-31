import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  conversation: [
    {
      type: String,
      min: 2,
      max: 2,
    },
  ],
  createdAt: {
    type: Date,
    immutable: false,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Message = new mongoose.model('Message', messageSchema);

export default Message;
