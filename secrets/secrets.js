module.exports = {
  nodeMailer: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
  hashSecrets: {
    randomBytesLimit: 16,
    iterations: 1000,
    length: 64,
    digest: 'sha512',
  },
  mongoConnectionUrl: 'mongodb://localhost:27017/accounts',
};
