import express from 'express';

import {
  createSurvey, getAllSurveyIds, getSurvey, takeSurvey, getSurveyResult,
} from '../controllers/survey';
import { isAuthenticated } from '../middlewares';

const router = express.Router();
router.post('/', isAuthenticated, createSurvey);
router.get('/', isAuthenticated, getAllSurveyIds);
router.get('/:surveyId', isAuthenticated, getSurvey);
router.post('/:surveyId', isAuthenticated, takeSurvey);
router.get('/:surveyId/results', isAuthenticated, getSurveyResult);

export default router;
