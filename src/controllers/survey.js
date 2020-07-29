/* eslint-disable indent */
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('sqlite.db');

const createSurvey = ({ body: questions }, res) => {
  db.serialize(async () => {
    db.get('SELECT survey_id FROM Survey ORDER BY survey_id DESC LIMIT 1', (err, row) => {
      if (err === null) {
        const surveyId = (row && row.survey_id) ? row.survey_id + 1 : 1;
        const stmt = db.prepare('INSERT INTO Survey VALUES (?, ?)');

        for (let i = 0; i < questions.length; i += 1) {
          stmt.run(surveyId, questions[i]);
        }
        stmt.finalize();

        res.send(`Survey created with survey id ${surveyId}`);
      } else {
        res.send(`Error occurred, ${err}`);
      }
    });
  });
};

const getAllSurveyIds = (_, res) => {
  db.all('SELECT DISTINCT survey_id FROM Survey', (err, rows) => {
    if (err === null) {
      res.send(rows);
    } else {
      res.send(`Error occurred, ${err}`);
    }
  });
};

const getSurvey = ({ params: { surveyId } }, res) => {
  db.all('SELECT rowid, question FROM Survey WHERE survey_id = ?', surveyId, (err, rows) => {
    if (err === null) {
      res.send(rows);
    } else {
      res.send(`Error occurred, ${err}`);
    }
  });
};

const takeSurvey = ({ body: surveyAnswers }, res) => {
  db.serialize(async () => {
    db.get('SELECT submission_id FROM Submissions ORDER BY submission_id DESC LIMIT 1', (err, row) => {
      if (err === null) {
        const submissionId = (row && row.submission_id) ? row.submission_id + 1 : 1;
        const stmt = db.prepare('INSERT INTO Submissions VALUES (?, ?, ?)');
        for (let i = 0; i < surveyAnswers.length; i += 1) {
          stmt.run(submissionId, surveyAnswers[i].rowid, surveyAnswers[i].answer);
        }
        stmt.finalize();
        res.send(`Survey response submitted with submission id ${submissionId}`);
      } else {
        res.send(`Error occurred, ${err}`);
      }
    });
  });
};

const getSurveyResult = ({ params: { surveyId } }, res) => {
  db.all(`SELECT submission_id, question, answer FROM Survey JOIN Submissions 
          ON Survey.rowid = Submissions.survey_question WHERE survey_id = (?)`,
    surveyId,
    (err, rows) => {
      if (err === null) {
        res.send(rows);
      } else {
        res.send(`Error occurred, ${err}`);
      }
    });
};

export {
  createSurvey, getAllSurveyIds, getSurvey, takeSurvey, getSurveyResult,
};
