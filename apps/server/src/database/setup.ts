import { db } from "./connection.js";

function setupDatabase() {
  const schemasSetup = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      markdown TEXT NOT NULL,
      validation_query TEXT NOT NULL,
      difficulty TEXT CHECK(difficulty IN ('EASY', 'MEDIUM', 'HARD')),
      affected_rows INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS submisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      success BOOLEAN NOT NULL,
      submitted_query TEXT NOT NULL,
      user_result TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (challenge_id) REFERENCES challenges (id)
    );
  `

  db.exec(schemasSetup);
}

setupDatabase();