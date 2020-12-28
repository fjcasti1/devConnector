import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  providerUserId: {
    type: String,
    unique: true,
    required: true,
  },
  provider: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);

export default User;
