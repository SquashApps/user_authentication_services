/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
import nodemailer from 'nodemailer';

import { nodeMailer } from '../secrets/secrets';
import { emailService, errorMessage } from '../constants/constants';

export default mailOptions => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: nodeMailer.email,
      pass: nodeMailer.password,
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    // eslint-disable-next-line
    error ? reject({ error, message: errorMessage.emailError }) : resolve(info);
  });
});
