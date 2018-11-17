/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */

import crypto from 'crypto';

import UserModel from '../models/user.model';
import {
  signup, oneHourInMilliseconds, baseString, httpStatusCode, errorMessage,
  responseMessage, emailTokenExpires,
} from '../constants/constants';
import { hashSecrets } from '../secrets/secrets';
import sendEmail from '../services/emailService';

const checkForParams = (email, password) => ((email && password));

const findUser = (email, password) => new Promise((resolve, reject) => {
  UserModel.findOne({ email, isVerified: true }).exec((error, user) => {
    if (error) {
      // eslint-disable-next-line
      reject({error, message: errorMessage.findUser });
    }
    if (user) {
      if (user.validPassword(password)) {
        const data = { _id: user._id, email: user.email };
        resolve(data);
      } else {
        // eslint-disable-next-line
        reject({ error, message: errorMessage.password });
      }
    } else {
      // eslint-disable-next-line
      reject({ status: httpStatusCode.notFound, message: errorMessage.userNotFound });
    }
  });
});

export const getUser = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!checkForParams(email, password)) {
      return res.status(httpStatusCode.badRequest).json({ message: errorMessage.badRequest });
    }
    const user = await findUser(email, password);
    return res.status(httpStatusCode.success)
      .json({ message: responseMessage.successLogin, user });
  } catch (error) {
    return error.status && error.status === httpStatusCode.notFound
      ? res.status(httpStatusCode.notFound).json(error)
      : res.status(httpStatusCode.error).json({ message: errorMessage.loginUser, error });
  }
};

const saveUser = newUser => new Promise((resolve, reject) => {
  newUser.save((error, user) => {
    // eslint-disable-next-line
    error ? reject({ error, message: errorMessage.duplicate }) : resolve(user);
  });
});

const generateToken = () => {
  const buffer = crypto.randomBytes(hashSecrets.randomBytesLimit);
  const token = buffer.toString(baseString);
  return token;
};

const setTokenToUser = (user, token) => new Promise((resolve, reject) => {
  UserModel.findOneAndUpdate({ _id: user._id },
    {
      emailToken: token,
      emailTokenExpires: Date.now() + oneHourInMilliseconds,
    }, { new: true }).exec((error, updatedUser) => {
    // eslint-disable-next-line
    error ? reject({error, message: errorMessage.updateToken }) : resolve(updatedUser); 
  });
});

export const createUser = async (req, res) => {
  try {
    const newUser = new UserModel();
    const { email, password } = req.body;
    if (!checkForParams(email, password)) {
      return res.status(httpStatusCode.badRequest).json({ message: errorMessage.badRequest });
    }
    newUser.email = email;
    await newUser.setPassword(password);
    const user = await saveUser(newUser);
    const token = await generateToken();
    const updatedUser = await setTokenToUser(user, token);
    const mailOptions = await {
      from: signup.fromEmail,
      to: updatedUser.email,
      subject: signup.subject,
      html: `${signup.template}${signup.verifyApi}${token}${signup.signature}`,
    };
    await sendEmail(mailOptions);
    return res.status(httpStatusCode.created).json({ message: responseMessage.successSignup });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

const checkForTokenExpiration = token => new Promise((resolve, reject) => {
  UserModel.findOne({ emailToken: token })
    .where(emailTokenExpires)
    .gt(Date.now())
    .exec((error, user) => {
      // eslint-disable-next-line
      error ? reject({ error, message: errorMessage.tokenExpire }) : resolve(user);
    });
});

const updateVerifyStatus = user => new Promise((resolve, reject) => {
  UserModel.findOneAndUpdate({ _id: user._id },
    { isVerified: true, emailToken: '', emailTokenExpires: '' })
    .exec((error, updatedUser) => {
      // eslint-disable-next-line
      error ? reject({error, message: errorMessage.updateStatus }) : resolve(updatedUser);
    });
});

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(httpStatusCode.notFound).json({ message: errorMessage.userNotFound });
    }
    const user = await checkForTokenExpiration(token);
    if (user) {
      await updateVerifyStatus(user);
      return res.status(httpStatusCode.success).json({ message: responseMessage.successVerify });
    }
    return res.status(httpStatusCode.error).json({ message: errorMessage.expireLink });
  } catch (error) {
    return res.status(httpStatusCode.error).json({ error });
  }
};
