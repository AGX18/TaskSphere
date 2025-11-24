# TaskSphere – Modular Task & Project Management API

**TaskSphere** is a professional-grade backend API designed to manage projects, tasks, and teams using a modular **MVC + Clean Architecture**. It has a hybrid database approach, leveraging **MongoDB** for flexible document storage (Projects/Teams) and **PostgreSQL** for structured relational data (Tasks).

---

## Features

- **Hybrid Database Architecture**:
  - **MongoDB (Mongoose)**: Manages Projects and Team Members.
  - **PostgreSQL (Drizzle ORM)**: Manages Tasks with strict relational schemas.
- **Complete CRUD Operations**: Full management for Projects, Teams, and Tasks.
- **Logging**: Request and Error logging to file system (`logs/`) using native `fs`.
- **Report Generation**: Analytics engine that combines data from both SQL and NoSQL sources to generate JSON reports.
- **Type Safety**: Built with **TypeScript** and **Zod** for runtime validation.
- **Clean Architecture**: Separation of concerns via Controllers, Services, and Repositories.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Languages**: TypeScript
- **Databases**:
  - MongoDB (via Mongoose)
  - PostgreSQL (via Drizzle ORM + `pg`)
- **Validation**: Zod (with `drizzle-zod` inference)
- **Utilities**: `fs` (Logging/Reports), `dotenv` (Config)

---

## 📂 Project Structure

```bash
TaskSphere/
├── src/
│   ├── config/         # Environment variables & configuration
│   ├── controllers/    # Request handlers (Input/Output)
│   ├── middlewares/    # Error handling, Logging
│   ├── models/         # Database schemas (Mongo & SQL)
│   ├── repositories/   # DB connection logic
│   ├── routes/         # API Endpoint definitions
│   ├── services/       # Business logic layer
│   ├── utils/          # Custom Errors, Logger, Validators
│   ├── app.ts          # Express App setup
│   └── index.ts        # Server entry point
├── drizzle/            # SQL Migrations
├── logs/               # Generated log files
├── reports/            # Generated report files
└── package.json
```

---

## ⚙️ Setup & Installation

### 1\. Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running
- MongoDB installed and running

### 2\. Installation

```bash
# Clone the repository
git clone https://github.com/AGX18/tasksphere.git
cd tasksphere

# Install dependencies
npm install
```

### 3\. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development
APP_STAGE=dev
HOST=localhost

# MongoDB
MONGO_URI=mongodb://localhost:27017/tasksphere_mongo

# PostgreSQL
DB_URL=postgresql://user:password@localhost:5432/tasksphere_sql
DB_POOL_MIN=2
DB_POOL_MAX=10
```

### 4\. Database Setup

Run the Drizzle migration to create the SQL tables:

```bash
npm run db:push
```

### 5\. Run the Server

```bash
# Development Mode (Hot Reload)
npm run dev

# Production Build
npm run compile
npm start
```

---

## 📡 API Endpoints

### Team Management

| Method   | Endpoint         | Description              |
| :------- | :--------------- | :----------------------- |
| `POST`   | `/api/teams`     | Create a new team member |
| `GET`    | `/api/teams`     | List all team members    |
| `PATCH`  | `/api/teams/:id` | Update member details    |
| `DELETE` | `/api/teams/:id` | Remove a team member     |

### Project Management (MongoDB)

| Method   | Endpoint            | Description                                |
| :------- | :------------------ | :----------------------------------------- |
| `POST`   | `/api/projects`     | Create a project (assign members)          |
| `GET`    | `/api/projects`     | List all projects (with populated members) |
| `PATCH`  | `/api/projects/:id` | Update project details                     |
| `DELETE` | `/api/projects/:id` | Delete a project                           |

### Task Management (PostgreSQL)

| Method   | Endpoint         | Description                                      |
| :------- | :--------------- | :----------------------------------------------- |
| `POST`   | `/api/tasks`     | Create a task (linked to Mongo Project)          |
| `GET`    | `/api/tasks`     | List tasks (Supports `?projectId=` & `?status=`) |
| `PATCH`  | `/api/tasks/:id` | Update task status (`todo`, `done`)              |
| `DELETE` | `/api/tasks/:id` | Delete a task                                    |

### Reports

| Method | Endpoint                  | Description                               |
| :----- | :------------------------ | :---------------------------------------- |
| `GET`  | `/api/reports/:projectId` | Generate JSON report to `/reports` folder |

---

## 🧪 Testing

A complete **Postman Collection** is included in this repository (`TaskSphere_Demo.postman_collection.json`). Import it into Postman to run a full automated demo flow:

1.  **Create Team Member**
2.  **Create Project** (Automatically uses Member ID)
3.  **Create Task** (Automatically uses Project ID)
4.  **Generate Report**
5.  **Cleanup Data**

---

## 📝 License

This project is open-source and available under the ISC License.
