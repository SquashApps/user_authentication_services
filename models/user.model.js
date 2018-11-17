import mongoose from 'mongoose';

import userSchema from './schemas/user_schema';

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
