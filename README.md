## Home Library Service

This is a REST API for a home music library service. The application allows users to sign up, log in, and manage their collection of artists, albums, and tracks, including adding them to a favorites list.

### Technologies Used

- Node.js
- NestJS
- TypeScript
- JWT for authentication

### Installation

1. Clone the repository to your local machine:

   `git clone <YOUR_REPOSITORY_URL>`

2. Navigate to the project directory:

   `cd nodejs2025Q2-service`

3. Install all required dependencies:

   `npm install`

### Configuration

Before running the application, you need to set up your environment variables.

- Create a .env file in the root directory of the project.

- You can copy the contents from .env.example (if it exists) or add the following variables:

PORT=4000
JWT_SECRET_KEY=YOUR_VERY_SECRET_KEY
JWT_REFRESH_SECRET_KEY=YOUR_VERY_SECRET_REFRESH_KEY
JWT_SECRET_EXPIRES_IN=1h
JWT_REFRESH_SECRET_EXPIRES_IN=24h

### Running the App

The application can be run in several modes:

    Development mode (with hot-reload):

npm run start:dev

Debug mode (with hot-reload and inspector attached):

npm run start:debug

Production mode:

    # First, build the project for production
    npm run build

    # Then, run the compiled app
    npm run start:prod

Once started, the service will be available at http://localhost:4000 (or the port specified in your .env file).

### Test

This project includes a comprehensive set of tests. You can run them using the following commands:

    Run all primary test suites:

npm run test

Run tests in watch mode (reruns tests on file changes):

npm run test:watch

Run tests with a coverage report:

npm run test:cov

Run only authentication-related tests:

    npm run test:auth

### API Documentation

The service provides a RESTful API to manage the music library.
Authentication

Most endpoints are protected. To access them, you must:

    Sign up a new user via the POST /auth/signup endpoint.
    Log in via POST /auth/login with your credentials to receive an accessToken.
    Include this token in the Authorization header for every subsequent protected request.

Example Header:
Authorization: Bearer <YOUR_ACCESS_TOKEN>
OpenAPI Specification

A complete and detailed specification for all endpoints, data models (DTOs), and response codes is available in the doc/api.yml file, following the OpenAPI standard.

You can use this specification with tools like the Swagger Editor or Postman to interactively explore and test the API.
