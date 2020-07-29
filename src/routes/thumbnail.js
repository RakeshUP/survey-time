import express from 'express';

import generateThumbnail from '../controllers/thumbnail';

const router = express.Router();
router.get('/', generateThumbnail);

export default router;
