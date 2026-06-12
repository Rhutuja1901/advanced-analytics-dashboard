# Advanced Analytics Dashboard — Setup Instructions

## 1. Project Requirements

Install the following software:

### Required Tools

* Node.js
* PostgreSQL
* pgAdmin
* Visual Studio Code
* Git

---

## 2. Clone Repository

Run:

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

Open project:

```bash
cd advanced-analytics-dashboard
```

---

## 3. Backend Setup

Move into backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 4. Environment Variables

Create `.env` file inside backend folder.

Add:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/advanced_analytics_dashboard_db"

JWT_SECRET=mySuperSecretKey123
```

Replace:

YOUR_PASSWORD

with PostgreSQL password.

---

## 5. Database Setup

Open PostgreSQL or pgAdmin.

Create database:

```txt
advanced_analytics_dashboard_db
```

---

## 6. Prisma Migration

Run:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

---

## 7. Start Backend Server

Run:

```bash
npm run dev
```

Expected:

```txt
Server running on port 5000
```

---

## 8. Frontend Setup

Open new terminal.

Move to frontend:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

---

## 9. Start Frontend

Run:

```bash
npm run dev
```

Open:

```txt
http://localhost:5174
```

---

## 10. Register User

Use API:

POST /api/auth/register

Example:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

---

## 11. Login User

Use:

POST /api/auth/login

Example:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

---

## 12. Upload CSV

Upload CSV using upload feature.

Data will be stored in PostgreSQL.

---

## 13. Features Included

* JWT Authentication
* CSV Upload
* Analytics Dashboard
* Search
* Sorting
* Pagination
* Dynamic Charts
* Dark/Light Mode
* CSV Export
* PDF Export

---

## 14. Troubleshooting

### Prisma Errors

Run:

```bash
npx prisma generate
```

---

### PostgreSQL Connection Error

Check:

* PostgreSQL service running
* Correct database name
* Correct password in `.env`

---

### Port Issues

If frontend port changes:

Example:

```txt
http://localhost:5174
```

Use the updated port shown in terminal.
