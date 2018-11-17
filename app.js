/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import cors from './cors';
import { mongoConnectionUrl } from './secrets/secrets';
import user from './routes/user';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors.allowCrossDomain);

// mongo db connection
mongoose.connect(mongoConnectionUrl, { useNewUrlParser: true })
  .then(() => console.log('** Mongo connection is successful ***'))
  .catch(err => console.error('Error while connecting to mongo', err));

app.use('/api/user', user);

app.listen(port);

console.log('Express listening on port...', port);

module.exports = app;
