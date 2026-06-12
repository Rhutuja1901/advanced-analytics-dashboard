# API Documentation — Advanced Analytics Dashboard

## Base URL

Local Development:

http://localhost:5000/api

---

# 1. Authentication APIs

## Register User

### Endpoint

POST /auth/register

### Description

Registers a new user.

### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

POST /auth/login

### Description

Authenticates a user and generates JWT token.

### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# 2. CSV Upload API

## Upload CSV

### Endpoint

POST /upload/csv

### Description

Uploads CSV file and stores sales data in PostgreSQL database.

### Request Type

multipart/form-data

### Form Field

file

### Success Response

```json
{
  "message": "CSV uploaded successfully"
}
```

---

# 3. Analytics Dashboard API

## Get Dashboard Analytics

### Endpoint

GET /analytics/dashboard

### Description

Fetches analytics data including:

* total revenue
* total sales
* sales records
* pagination
* filtering
* sorting

---

## Query Parameters

### Search

```txt
?search=laptop
```

Filters records by product name.

---

### Pagination

```txt
?page=1
```

Returns paginated results.

---

### Sorting

```txt
?sortBy=date
```

Available values:

* date
* revenue
* sales

Example:

```txt
?sortBy=revenue
```

---

## Example Request

GET /analytics/dashboard?page=1&sortBy=revenue&search=laptop

---

## Success Response

```json
{
  "totalRevenue": 204000,
  "totalSales": 200,
  "currentPage": 1,
  "totalPages": 2,
  "data": []
}
```

---

# Error Responses

## 400 Bad Request

```json
{
  "message": "Invalid request"
}
```

---

## 500 Server Error

```json
{
  "message": "Server error"
}
```

---

# Authentication

JWT authentication is used for secure login.

The token is generated during login and stored in browser localStorage.

---

# Conclusion

The API architecture supports secure authentication, analytics generation, CSV uploads, filtering, pagination, sorting, and report generation.
