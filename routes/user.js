import express from 'express';

import { getUser, verifyToken, createUser } from '../api/user';

const router = express.Router();

router.get('/', getUser);
router.get('/verify/:token', verifyToken);
router.post('/', createUser);

module.exports = router;
