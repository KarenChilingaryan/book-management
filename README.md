# Book Management API

This is a RESTful API for managing books and authors, built using NestJS, TypeScript, and MySQL. The API supports CRUD operations for books and authors, and includes JWT-based authentication.

## Features

- CRUD operations for books and authors
- JWT-based authentication
- Input validation and error handling
- Swagger documentation - baseUrl+/api/docs

## Tech Stack

- Node.js
- NestJS
- TypeScript
- MySQL
- TypeORM
- Passport.js
- JWT
- Swagger
- Jest
- Joi

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 14.x)
- Yarn
- MySQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/book-management.git
   cd book-management

2. install packages

  ```bash
  $ yarn install
  ```

## Running migrations
```bash
$ yarn migration:run
```
## Running the app

```bash
$ yarn start

$ yarn start:dev
```

## Test

```bash
$ yarn test
```


# User Registration and Login API Requests

## Register a User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
        "username": "newuser",
        "password": "password123",
        "email": "newuser@example.com"
      }'
```


## Login a User

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
        "username": "newuser",
        "password": "password123"
      }'
```


# Authors API Requests

## Create an Author

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
        "name": "John Doe",
        "biography": "Author biography",
        "dateOfBirth": "2000-01-01T00:00:00Z"
      }'
```


## Get All Authors

```bash
curl -X GET http://localhost:3000/authors \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


## Get an Author by ID

```bash
curl -X GET http://localhost:3000/authors/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


## Update an Author

```bash
curl -X PATCH http://localhost:3000/authors/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
        "name": "John Doe Updated",
        "biography": "Updated biography",
        "dateOfBirth": "2000-01-01T00:00:00Z"
      }'
```


## Delete an Author
```bash
curl -X DELETE http://localhost:3000/authors/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


# Books API Requests

## Create a Book

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
        "title": "The Great Book",
        "isbn": "123-456-789",
        "publishedDate": "2021-01-01T00:00:00Z",
        "authorId": 1
      }'
```


## Get All Books

```bash
curl -X GET http://localhost:3000/books \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


## Get a Book by ID

```bash
curl -X GET http://localhost:3000/books/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


## Update a Book

```bash
curl -X PATCH http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
        "title": "The Great Book Updated",
        "isbn": "987-654-321",
        "publishedDate": "2022-01-01T00:00:00Z",
        "authorId": 1
      }'
```

## Delete a Book

```bash
curl -X DELETE http://localhost:3000/books/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
