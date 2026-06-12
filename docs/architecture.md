# Advanced Analytics Dashboard Architecture

## 1. Project Overview

The Advanced Analytics Dashboard is a full-stack web application developed to analyze sales data dynamically through interactive dashboards and charts.

The system allows users to:

* Login securely using authentication
* Upload CSV files
* Store and manage sales data in PostgreSQL database
* Generate analytics dynamically
* Filter, sort, and search records
* Export reports in CSV and PDF format
* Use dark/light mode
* Handle large datasets using pagination and optimized querying

---

## 2. Technology Stack

### Frontend

* React.js
* TypeScript
* Axios
* Recharts

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)
* bcrypt password hashing

---

## 3. System Architecture

The project follows a three-layer architecture:

### Frontend Layer

Responsible for user interaction and UI rendering.

Main responsibilities:

* Login UI
* Dashboard UI
* CSV Upload
* Charts visualization
* Search and sorting
* Pagination
* Dark/light mode
* Export reports

Frontend communicates with backend APIs using Axios.

---

### Backend Layer

Responsible for handling business logic.

Main responsibilities:

* Authentication validation
* CSV processing
* Analytics calculation
* Filtering and sorting
* Pagination handling
* API response generation

Backend APIs are built using Express.js.

---

### Database Layer

Responsible for persistent storage.

The database stores:

* User details
* Sales data

PostgreSQL is used because it provides strong relational data management and high performance.

Prisma ORM is used to simplify database operations.

---

## 4. Folder Structure

### Frontend

src/

* pages/

  * Login.tsx
  * Dashboard.tsx

* components/

  * RevenueChart.tsx

* services/

  * api.ts

* App.tsx

---

### Backend

src/

* controllers/

  * authController.ts
  * analyticsController.ts

* routes/

  * authRoutes.ts
  * analyticsRoutes.ts

* prisma/

  * schema.prisma

* server.ts

---

## 5. Authentication Flow

The system uses secure JWT authentication.

### Login Process

1. User enters email and password.
2. Backend checks user in database.
3. Password is verified using bcrypt.
4. JWT token is generated.
5. Token is stored in localStorage.
6. User gets dashboard access.

This ensures secure login flow.

---

## 6. Database Schema

### User Table

Fields:

* id
* email
* password
* createdAt

Purpose:
Stores registered users securely.

Passwords are encrypted using bcrypt hashing.

---

### SalesData Table

Fields:

* id
* product
* sales
* revenue
* date
* createdAt

Purpose:
Stores uploaded CSV sales data.

---

## 7. Analytics Logic

The dashboard calculates:

### Total Revenue

Calculated using Prisma aggregate function.

### Total Sales

Calculated using Prisma aggregate function.

### Charts

Sales data is visualized using Recharts.

---

## 8. Filtering, Sorting, and Search

### Search

Search is implemented using product filtering.

### Sorting

Users can sort data by:

* Date
* Revenue
* Sales

### Pagination

Pagination is implemented using:

* skip
* take

This improves performance for large datasets.

---

## 9. Performance Optimization

To improve performance:

### Database Indexing

Indexes were added on:

* product
* date

This improves search speed.

### Pagination

Only limited rows are loaded at a time.

### Optimized Querying

Prisma ORM is used for efficient database operations.

---

## 10. Export Functionality

### CSV Export

Users can download analytics data as CSV.

### PDF Export

Users can download analytics report in PDF format.

---

## 11. Dark/Light Mode

The dashboard supports:

* Dark Mode
* Light Mode

This improves user experience.

---

## 12. Conclusion

The Advanced Analytics Dashboard provides secure authentication, analytics generation, data visualization, filtering, pagination, and report export features.

The system is scalable, optimized for performance, and designed using full-stack architecture principles.
