# Task Management System Backend

This is the backend API for a task management system built using Node.js, Express, and MongoDB. It provides endpoints for user authentication, task management, and category management.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
    - [User Authentication](#user-authentication)
    - [Task Management](#task-management)
    - [Category Management](#category-management)
- [Error Handling](#error-handling)
- [Response Structure](#response-structure)
- [Dependencies](#dependencies)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/47seconds/365AITech-TaskManagementSystem-api.git
    cd 365AITech-TaskManagementSystem-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    - Create a `.env` file in the root directory.
    -  Add the following variables as explained in the  [Environment Variables](#environment-variables) section.

4.  **Start the server:**

    ```bash
    npm start
    ```

    The server will start on the port specified in the `.env` file (default: 3000).

## Environment Variables

The following environment variables must be set in the `.env` file:

-   `PORT`: The port on which the server will run (e.g., `3000`).
-   `MONGODB_URI`: The connection string for your MongoDB database.
    - Example: `mongodb://user:password@host:port/database?authSource=admin`
-   `DB_NAME`: The name of your MongoDB database
-   `CORS_ORIGIN`: The allowed origin for CORS requests (e.g., `http://localhost:5173`). Use "*" for all origins in development but use the specific origins for production.
-   `ACCESS_TOKEN_SECRET`: Secret key for signing access tokens.
-   `ACCESS_TOKEN_EXPIRY`: Expiry time for access tokens (e.g., `1d` for 1 day).
-   `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens.
-   `REFRESH_TOKEN_EXPIRY`: Expiry time for refresh tokens (e.g., `10d` for 10 days).
-   `ACCESS_TOKEN_COOKIE_EXPIRY`: Expiry for access token cookie (e.g., `1`).
-   `REFRESH_TOKEN_COOKIE_EXPIRY`: Expiry for refresh token cookie (e.g., `10`).

**Note:** A sample '.env.example' is given in the repository

## API Endpoints

All API endpoints are prefixed with `/api`.

### User Authentication

-   **`POST /api/auth/register`**: Register a new user.
    -   Request Body:
        ```json
        {
            "email": "user@example.com",
            "username": "username123",
            "password": "SecurePassword123!"
        }
        ```
    -   Response:
        - 200 OK: Successfully registered a new user,  `user._id` in the data response.
        - 400 Bad Request: If any field is missing.
        - 500 Internal Server Error: If the creation fails.
    -   Sets `accessToken` and `refreshToken` cookies.
-   **`POST /api/auth/login`**: Log in an existing user.
    -   Request Body:
    

        ```json
        {
            "username": "username123" or "user@example.com",
            "password": "SecurePassword123!"
        }
        ```
    **Note:** username can handle both username and user email as request

    -   Response:
        - 200 OK: Successfully logged in the user. Includes user document without password and refreshToken.
        - 400 Bad Request: If any field is missing.
        - 404 Not Found: If user does not exist.
        - 401 Unauthorized: If password is incorrect
    - Sets `accessToken` and `refreshToken` cookies.
-   **`GET /api/auth/logout`**: Log out the current user.
    -   Requires a valid `accessToken` in the request cookies.
    -   Response:
        - 200 OK: Successfully logged out, clears `accessToken` and `refreshToken` cookies.
        - 500 Internal Server Error: If server fails to logout user.

### Task Management

-   **`GET /api/tasks`**: Get all tasks for the logged-in user.
    -   Requires a valid `accessToken` in the request cookies.
    -   Response:
        -   200 OK: Returns an array of task objects.
        -   404 Not Found: If no tasks are found for the user.
-   **`POST /api/tasks`**: Create a new task.
    -   Requires a valid `accessToken` in the request cookies.
    -   Request Body:
        ```json
         {
            "title": "Task Title",
            "description": "Task Description",
            "status": "To Do" | "In Progress" | "Completed",
            "priority": "High" | "Medium" | "Low",
            "dueDate": "2024-12-31T23:59:59.000Z",
            "category_id": "<category_id>"
        }
        ```
       -  `status`, `priority`, `dueDate` are optional parameters
        -   Response:
            -   200 OK: Returns the newly created task object.
            -   400 Bad Request: if required parameter is missing.
            -   404 Not Found: If invalid category id is provided
            -   500 Internal Server Error: If task creation fails.
-  **`GET /api/tasks/:task_id`**: Get a specific task by ID.
    -   Requires a valid `accessToken` in the request cookies.
    -   Response:
        -   200 OK: Returns the task object with the provided ID.
        -   404 Not Found: If the task with the given ID is not found.
-   **`PUT /api/tasks/:task_id`**: Update an existing task by ID.
    -   Requires a valid `accessToken` in the request cookies.
    -   Request Body: (any of these field, not mandatory)
        ```json
        {
            "title": "Updated Task Title",
            "description": "Updated Task Description",
            "status": "To Do" | "In Progress" | "Completed",
            "priority": "High" | "Medium" | "Low",
            "dueDate": "2024-12-31T23:59:59.000Z",
             "category_id": "<category_id>"
        }
        ```
       -   Response:
            -   200 OK: Returns the updated task object.
            -   400 Bad Request: if no field to update parsed.
            -   404 Not Found: If the task with the given ID or category with the given id is not found.
            -   500 Internal Server Error: If the task update fails.
-   **`DELETE /api/tasks/:task_id`**: Delete a task by ID.
    -   Requires a valid `accessToken` in the request cookies.
    -   Response:
        -   200 OK: Returns an empty object in data, with success message.
        -   404 Not Found: If the task with the given ID is not found.

### Category Management

-   **`GET /api/categories`**: Get all categories for the logged-in user.
    -   Requires a valid `accessToken` in the request cookies.
    -   Response:
        -   200 OK: Returns an array of category objects.
        -   404 Not Found: If no categories are found for the user.
-   **`POST /api/categories`**: Create a new category.
    -   Requires a valid `accessToken` in the request cookies.
    -   Request Body:
        ```json
        {
            "name": "Category Name"
        }
        ```
    -   Response:
        -   200 OK: Returns the newly created category object.
        -   400 Bad Request: If category name not parsed.
        -   500 Internal Server Error: If category creation fails.
-   **`DELETE /api/categories/:category_id`**: Delete a category by ID.
    -   Requires a valid `accessToken` in the request cookies.
    -   Response:
        -   200 OK: Returns the deleted category object
        -   404 Not Found: If the category with the given ID is not found.
         -   500 Internal Server Error: If the category delete fails.

## Error Handling

The API uses a consistent error handling mechanism.

- The API response with following structure in case of failure:

```json
{
    "statusCode": 400,
    "message": "Error Message",
    "success": false,
    "errors": []
    "stack" : "Error call stack"
}

statusCode: The HTTP status code of the error (e.g., 400, 404, 500).

message: A human-readable error message.

success: Boolean value indicating that operation failed.

errors: An array of error details (optional).
```

- The API typically returns responses in the following structure:
```json
{
    "statusCode": 200,
    "data": {},
    "message": "Success Message",
    "success": true,
    "user": {}
}

statusCode: The HTTP status code of the response (e.g., 200).

data: The response data. It can be an object, array, or empty.

message: A human-readable message describing the result.

success: A boolean indicating the status of the response.

user: The current logged-in user's information.
```

## Dependencies

The project uses the following main dependencies:

-   `express`: For building the server.
-   `cors`: For handling CORS.
-   `cookie-parser`: For parsing cookies.
-   `jsonwebtoken`: For handling JSON Web Tokens.
-   `mongoose`: For MongoDB database interactions.
-   `bcryptjs`: For password hashing.
-   `dotenv`: For loading environment variables.

The following are used as development dependencies:
-   `@babel/eslint-parser`: For enabling ESLint to parse modern JavaScript.
-   `@eslint/js`: Provides recommended ESLint rules.
-   `eslint`: For linting JavaScript code.
-   `eslint-config-prettier`: Turns off ESLint rules that conflict with Prettier.
-   `eslint-plugin-node`: ESLint rules for Node.js projects.
-   `eslint-plugin-prettier`: Enables Prettier as an ESLint rule.
-   `globals`: Provides a list of global variables for use with ESLint.
-   `husky`: For git hooks.
-   `lint-staged`: For running linters only on staged files.
-   `nodemon`: For automatic restarting of the server during development.
-   `prettier`: For code formatting.

**Note:** Development dependencies are used for development purposes, such as code quality checks and local server management, and are not required for running the application in a production environment.