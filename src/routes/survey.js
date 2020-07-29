import express from 'express';

import {
  createSurvey, getAllSurveyIds, getSurvey, takeSurvey, getSurveyResult,
} from '../controllers/survey';

const router = express.Router();
router.post('/', createSurvey);
router.get('/', getAllSurveyIds);
router.get('/:surveyId', getSurvey);
router.post('/:surveyId', takeSurvey);
router.get('/:surveyId/results', getSurveyResult);

export default router;
