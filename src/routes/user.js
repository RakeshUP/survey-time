import express from 'express';

import createAuthToken from '../controllers/user';

const router = express.Router();
router.post('/auth', createAuthToken);

export default router;
