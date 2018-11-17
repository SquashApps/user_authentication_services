import mongoose from 'mongoose';
import crypto from 'crypto';

import { hashSecrets } from '../../secrets/secrets';
import { baseString, replaceTimeStamp } from '../../constants/constants';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyEmailToken: { type: String },
  verifyEmailTokenExpires: { type: Date },
}, {
  timestamps: {
    createdAt: replaceTimeStamp.createdAt,
    updatedAt: replaceTimeStamp.updatedAt,
  },
});

userSchema.index({ email: 1 });

// eslint-disable-next-line
userSchema.methods.setPassword = function (password) {
  const user = this;
  user.salt = crypto.randomBytes(hashSecrets.randomBytesLimit).toString(baseString);
  user.hash = crypto
    .pbkdf2Sync(password, user.salt, hashSecrets.iterations, hashSecrets.length, hashSecrets.digest)
    .toString(baseString);
};

// eslint-disable-next-line
userSchema.methods.validPassword = function (password) {
  const user = this;
  const hash = crypto
    .pbkdf2Sync(password, user.salt, hashSecrets.iterations, hashSecrets.length, hashSecrets.digest)
    .toString(baseString);
  return user.hash === hash;
};

export default userSchema;
