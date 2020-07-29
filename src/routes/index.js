import express from 'express';

import user from './user';
import survey from './survey';
import thumbnail from './thumbnail';
import { isAuthenticated } from '../middlewares';

const router = express.Router();
router.use('/', user);
router.use('/thumbnail', thumbnail);
// all the following routes are protected by the isAuthenticated middleware
// which responds with HTTP 401 when there is no authToken
router.use('/survey', isAuthenticated, survey);

export default router;
