import express from 'express';

import user from './user';
import survey from './survey';
import thumbnail from './thumbnail';
import { isAuthenticated } from '../middlewares';

const router = express.Router();
router.use('/', user);
router.use('/survey', isAuthenticated, survey);
router.use('/thumbnail', thumbnail);

export default router;
