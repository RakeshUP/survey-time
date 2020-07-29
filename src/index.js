/* eslint-disable no-console */
import sqlite3 from 'sqlite3';

import app from './app';

const PORT = process.env.PORT || 4000;
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('sqlite.db');

const createTables = `CREATE TABLE IF NOT EXISTS Survey (
                        survey_id INTEGER NOT NULL,
                        question TEXT NOT NULL
                      );
                      
                      CREATE TABLE IF NOT EXISTS Submissions (
                        submission_id INTEGER NOT NULL,
                        survey_question INTEGER NOT NULL,
                        answer TEXT NOT NULL,
                        FOREIGN KEY (survey_question)
                          REFERENCES Survey (rowid)
                      );`;

db.on('open', () => {
  console.log('Database open for connections');

  db.exec(createTables);

  const server = app.listen(PORT,
    () => console.log(`🚀 app running at http://localhost:${PORT}`));

  const shutdownHandler = () => server.close(() => {
    console.log('Server closed for connections. Going to terminate process ...');

    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Database connection closed');
      }
      process.exit();
    });
  });

  process.on('SIGINT', shutdownHandler);
});

db.on('error', (err) => {
  console.error('Error opening database, ', err);
});
