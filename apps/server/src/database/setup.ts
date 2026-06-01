import { db } from "./connection.js";

function setupDatabase() {
  const schemasSetup = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('USER', 'ADMIN')) DEFAULT 'USER'
    );

    CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      markdown TEXT NOT NULL,
      validation_query TEXT NOT NULL,
      difficulty TEXT CHECK(difficulty IN ('EASY', 'MEDIUM', 'HARD')),
      affected_rows INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      success BOOLEAN NOT NULL,
      submitted_query TEXT NOT NULL,
      user_wrong_result TEXT DEFAULT NULL,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (challenge_id) REFERENCES challenges(id)
    );

    CREATE INDEX IF NOT EXISTS idx_user_submissions ON submissions(user_id);

    CREATE TABLE IF NOT EXISTS user_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      session TEXT UNIQUE NOT NULL,
      group_slug TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (challenge_id) REFERENCES challenges(id)
    );

    CREATE INDEX IF NOT EXISTS idx_user_challenge_session ON user_sessions(user_id, challenge_id);

    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expired_at TEXT NOT NULL,
      revoked_At TEXT DEFAULT NULL,
      revocation_reason TEXT CHECK(revocation_reason IN ('SECURITY_BREACH', 'ROTATION', 'LOGOUT')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
  `;

  db.exec(schemasSetup);
}

function insertAdmin() {
  const admin = {
    name: "G. Almeida",
    email: "almeida@gmail.com",
    password: "$argon2id$v=19$m=65536,t=3,p=4$aGkw/IWarh7koMoRZuse7A$Fv7J9+lbM/Y2zkssxakvorV7e3CnCpkg/bNF8bor034", // 'almeida123'
    role: "ADMIN",
  };

  db.prepare(`
    INSERT INTO users (name, email, password, role) 
    VALUES (@name, @email, @password, @role) 
    ON CONFLICT(email) DO NOTHING
  `).run(admin);
}

setupDatabase();
insertAdmin();
