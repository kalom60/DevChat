import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
    unique: true,
  },
  linkedIn: {
    type: String,
  },
  image: {
    type: String,
    default: '',
  },
  expreience: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
  },
  chatRoom: [
    {
      type: String,
    },
  ],
  emailToken: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

export default User;
