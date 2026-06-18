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
      group_slug TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_challenge_group ON challenges(group_slug);

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      success BOOLEAN NOT NULL,
      submitted_query TEXT NOT NULL,
      user_query_result TEXT NOT NULL,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (challenge_id) REFERENCES challenges(id)
    );

    CREATE INDEX IF NOT EXISTS idx_user_submissions ON submissions(user_id);

    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      revoked_at TEXT DEFAULT NULL,
      revocation_reason TEXT CHECK(revocation_reason IN ('SECURITY_BREACH', 'ROTATION', 'LOGOUT')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
  `;

  db.exec(schemasSetup);
}

setupDatabase();
