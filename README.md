# SQUELCH

#### Website: http://squelch-sql.vercel.app/landing-page

## Description:

Squelch is a fun, interactive web platform built for anyone who wants to learn or sharpen their SQL skills through puzzle-solving. Inspired directly by CS50x's "Fiftyville" problem set, the site captures that exact "eureka!" moment of using data to crack a case. Playing through Fiftyville was such an awesome experience that it sparked the idea to build an entire platform dedicated to data-driven detective mysteries. Instead of just running boring, repetitive commands, Squelch drops you into immersive scenarios—like investigating late-night heists or exposing corporate fraud—where writing raw SQL queries is the only way to find the culprit.

The main goal of Squelch is to make learning databases feel less like schoolwork and more like a game. The platform gives you a smooth query editor right next to simulated, sandbox databases where you can safely test your logic, see your results update live, and keep track of clues using a built-in notes area. By blending logical deduction with real database practice, Squelch turns standard SQL learning into an engaging mystery-solving experience.

---

## Built With:

Squelch leverages a modern, robust, and lightweight stack to deliver a fast, interactive, and responsive experience:

- **Frontend**:
  - **React** & **Vite** for a blazing-fast, component-based user interface.
  - **React Router** for managing smooth, fluid client-side navigation and handling route protection across the app.
  - **Monaco Editor** (the engine behind VS Code) to provide users with a rich SQL editing experience, complete with syntax highlighting.
  - **Tailwind CSS** for a clean, responsive, and dark-themed design.
  - **Zod**, **React Query** & **React Hook Form** for smooth server state management, robust form handling, and strict input validation.
- **Backend**:
  - **Node.js** & **Express** to power the REST API and handle business rules.
  - **Better-SQLite3** for fast, synchronous, and isolated SQLite database challenge execution.
  - **PostgreSQL** for the main database, storing crucial data.
  - **Zod** for client input validation and sanitization, ensuring request payloads conform to exact schemas before reaching the business logic.
- **Tooling & Shared**:
  - **TypeScript** across the entire monorepo to ensure type safety and prevent runtime bugs.
  - **npm Workspaces** to seamlessly manage the client, server, and shared packages in one repository.
- **Deployment & Hosting**:
  - **Vercel** for hosting the frontend, ensuring fast load times and global edge delivery.
  - **Render** for hosting the backend Node.js API, handling runtime processes, and keeping database states active.
  - **Supabase** for keeping the PostgreSQL connection alive.

---

## Key Features

- **Interactive SQL Playground**: Write and run raw SQL queries directly in the browser using a Monaco-powered editor with real-time feedback.
- **Isolated Database Sandboxes**: Each investigation challenge runs on its own independent, isolated SQLite database to ensure query safety.
- **Immersive Scenarios**: Solve narrative-driven data puzzles (inspired by CS50's Fiftyville) by tracking clues, finding correlations, and analyzing tables.
- **Built-in Notebook**: Keep track of clues, query results, and suspect lists without leaving the platform.
- **Automatic Query Validation**: Submit your final answer and let Squelch's backend analyze and validate your SQL query to see if you solved the case.
- **User Authentication & Progress Tracking**: Save your solved mysteries and track your overall progress through a personalized dashboard.

---

## Project Structure:

Squelch is organized as a monorepo to keep the codebase clean and efficient. It is divided into three primary directories:

- **`apps/client`**: This houses the frontend application. It contains the user interface, the interactive query editor, database result tables, and the notebook feature that users interact with while solving mysteries.
- **`apps/server`**: This is the backend API. It manages the challenges, isolates and runs the SQL queries against sandboxed SQLite databases, and validates whether the user's query correctly solves the case.
- **`packages/shared`**: This contains code, TypeScript types, and Data Transfer Objects (DTOs) shared by both the client and the server. Storing this here eliminates code duplication and ensures a single source of truth across the entire project.

### Frontend (`apps/client`)

The frontend is built using React and TypeScript to ensure type safety and prevent runtime UI bugs. It also utilizes ESLint and Prettier to enforce a clean, consistent, and maintainable code formatting standard.

The client directory is split into two major folders:

#### 1. `public`

This folder holds static assets that bypass the Vite bundling process. It includes public assets like the site’s favicon and open-graph share banners, alongside crucial SEO files such as `robots.txt` and `sitemap.xml`.

#### 2. `src`

This is where the application logic and user interface live. It is organized into 8 subdirectories and 3 core root files:

##### Directories:

- **`api`**: Configures and exports the Axios instance used to handle HTTP communications and authorization headers with the backend API.
- **`config`**: Holds application-wide constants and handles the routing architecture built with React Router.
- **`types`**: Centralizes TypeScript interfaces and definitions for API requests and responses.
- **`layout`**: Houses structural components that define the structural blueprint of the website's pages.
- **`components`**: Contains isolated, highly reusable UI components used across multiple sections of the site (e.g., buttons, input fields, tables).
- **`pages`**: Houses the actual page views of the app (such as the Challenge Page or Homepage Dashboard). These are high-level components that piece together smaller elements from the `components` folder.
- **`assets`**: Stores images and visual media that go through the bundler, such as the hero section graphics and error fallback illustrations.
- **`features`**: Contains custom React Query hooks grouped by domain (**auth**, **challenge**, **submission**, and **user**) to elegantly manage server-state fetching and mutations.

##### Root Files:

- **`App.tsx`**: The main application component that sets up the React Router provider using the routes defined in the `config` folder.
- **`index.css`**: Injects global styles, custom scrollbars, and Tailwind CSS directives.
- **`main.tsx`**: The main entry point that bootstraps the React application and mounts it directly into the `index.html` DOM.

### Backend (`apps/server`)

The backend is built using a lightweight approach to Domain-Driven Design (DDD) and Clean Architecture principles. It handles API routing, business logic, error safety, and runs the isolated database environments for each challenge.

Here is how the backend is structured:

#### Challenge Seeding & Databases (`server/challenge-groups`)

Located at the root of the server, this folder is dedicated to setting up and storing the database files for the mysteries.

- **`GROUP_FOLDER_NAME/`**: A folder for each individual mystery (e.g., `furto-noturno`, `o-caso-do-auditor`). Each mystery's folder contains:
  - **`setup.sql`**: The database schema and seed data used to build the playground for that specific mystery.
  - **`resume.md`**: A detailed guide/walkthrough explaining the step-by-step solution to crack the case.
  - **`group.db`**: The isolated SQLite database file containing all the clues and tables for that group.

#### Core Source Code (`server/src`)

The application logic lives inside the `src` directory, which is divided into three main folders and a main entry point:

##### 1. `config`

This folder handles the environment setup. It loads environment variables and hosts a **Dependency Injection Factory** that instantiates and exports controllers, services, and repositories for the application. 

*Note: Database provisioning and seeding (such as generating the standalone SQLite challenge files via `challenges.config.ts`) have been decoupled from the application startup. These are now managed as manual, on-demand CLI tasks. Run `npm run server:populate -w server` to create and populate the challenge databases, and `npm run server:setup -w server` to insert the challenges on the main database.*

##### 2. `modules`

The core business logic is split into 4 domain folders: **`auth`**, **`challenge`**, **`submission`**, and **`user`**. Each domain is highly organized and consistently contains exactly 6 files:

- **`router`**: Defines the endpoints, catches incoming HTTP requests, forwards them to the controller, and delivers the final response back to the client.
- **`controller`**: Validates request payloads, structures the data, communicates with the service layer, and prepares the final API output.
- **`service`**: The heart of the domain. It enforces the business rules (e.g., evaluating if a query successfully solves a mystery) and talks to the repository.
- **`repository`**: Directly communicates with the SQLite databases to query or persist data, returning raw entities back to the service layer.
- **`interfaces`**: Houses the TypeScript contracts defining the methods that services and repositories must implement.
- **`entity`**: Defines the shapes and models of the data returned by the database.

##### 3. `shared`

A collection of global utilities and infrastructure used across all 4 domains:

- **`database`**: Instantiates and exports the single, shared connection to the main database.
- **`errors`**: Defines custom exception classes to catch and handle database, service, and controller-level errors.
- **`helpers`**: Small, reusable utility functions.
- **`middlewares`**: Handles request-level logic like user authentication guards and global error catching.
- **`types`**: Global TypeScript types specifically used by controllers.

##### 4. `index.ts`

The main entry point of the server. It bootstraps the Express application, registers the global middlewares, hooks up all the domain routers, and starts listening for API requests.

---

## How to Run Locally

Since Squelch is structured as a monorepo, you can easily spin up both the client and the server with minimal configuration.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Setup Steps

1. **Clone the repository:**
  Clone the Squelch repository at https://github.com/g-almeida12/squelch.git:

  ```bash
  git clone https://github.com/g-almeida12/squelch.git
  cd squelch
  ```

2. **Install all dependencies:**
  This command installs all required packages for the client, server, and shared directories at once using npm workspaces:

  ```bash
  npm install
  ```

3. **Set up Environment Variables:**
  Navigate to apps/server and create a .env file based on the provided .env.example (setting up your JWT secrets, database paths, and port numbers)

4. **Insert the challenges on the main database:**
  Run this script to insert the local challenges on your database (connected by the `DATABASE_URL` key of .env):
  ```bash
  npm run server:setup -w server
  ```


5. **start the application:**
  Run the start script to build the `packages/shared` and initiate the server API and client APP:

  ```bash
  npm run start
  ```
