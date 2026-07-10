# AI Usage Disclosure

In accordance with the CS50x academic honesty guidelines, this document details how AI tools (Claude and Gemini) were utilized during the development of this project.

## 1. TypeScript and NPM Workspaces Structure

AI assistance was used to integrate TypeScript with NPM Workspaces to create a scalable monorepo.

- **What was asked:** How to create a monorepo using NPM Workspaces that utilizes TypeScript.
- **AI Contribution:** The correct `package.json` structure across all modules (`apps/client`, `apps/server`, and `packages/shared`).

## 2. Server Structure and Architecture

The AI was used to assist in conceiving the architecture and folder organization for the API.

- **What was asked:** How to structure a web API using Node.js and Express following best practices for folder organization.
- **AI Contribution:** Suggested a domain-driven division (`auth`, `challenges`, `user`, and `submissions`) that served as the foundation for the project's final structure.

## 3. Client Structure and Architecture

The AI provided a more organized baseline to separate different React components from utility functions.

- **What was asked:** How to structure a React application using React Query, React Hook Form, and React Router, following a solid folder structure that separates responsibilities.
- **AI Contribution:** Organization into a global `components` folder for reusable components, local `components` folders for each complex component/page, and a `features` folder for functions, separating them by domains (`auth`, `challenges`, `user`, and `submissions`).

## 4. Design Assistance for Tabular Components

The AI was used to help design the layout of information displayed in table components, such as `QueryResult` and `AvailableTables`.

- **What was asked:** Help creating a minimalist design aligned with the website's visual identity.
- **AI Contribution:** A minimalist design that matched the rest of the website to display table information.

## 5. Assistance with SQLite

The AI was utilized to learn and apply key SQLite commands, specifically using `better-sqlite3`.

- **What was asked:** Periodically, help to understand which `better-sqlite3` command best fit a specific action.
- **AI Contribution:** Detailed explanations regarding how `better-sqlite3` functions, its return values, and best coding practices.

## 6. Database Modeling / SQL

The AI helped validate and optimize the database schema.

- **What was asked:** Help structuring the tables for users and learning progress in the database.
- **AI Contribution:** Assistance with the core database structure, along with suggestions for foreign keys and indexes to improve query performance.

## 7. Debugging and Error Handling

The AI was used as a rubber duck debugging assistant to resolve specific bugs.

- **Example:** Fixing an asynchronous/authentication token error in the backend.