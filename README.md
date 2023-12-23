# Levitation Backend API Task

This documentation provides a guide on setting up, running, and deploying the Blogging Platform API. The API is built using Node.js and Express, with MongoDB as the database. It includes user authentication using JWT, CRUD operations for blog posts, and security measures such as input validation, and rate limiting.

## Hosted Url

The App is hosted on Cyclic and can be accessed through the url: https://tame-teal-elephant-sari.cyclic.app/

## Table of Contents

1. [Requirements](#requirements)
2. [Project Setup](#project-setup)
3. [Running Locally](#running-locally)
4. [API Endpoints](#api-endpoints)

## Requirements

Before proceeding, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shreyanshxyz/Levitation-API.git
   cd Levitation-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following variables:

     ```
     PORT=8000
     MONGODB_URI=your-mongodb-connection-uri
     JWT_SECRET=your-secret-key
     ```

   Replace `your-secret-key` with a strong, unique secret key for JWT.

## Running Locally

- Run As A Dev:

  ```bash
  npm run dev
  ```

- Run the application normally:

  ```bash
  npm start
  ```

  The server will start on `http://localhost:8000`.

## API Endpoints

- **User Authentication:**

  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Log in an existing user.

- **Blog Posts:**
  - `GET /blog/posts`: Get all blog posts (public).
  - `POST /blog/posts`: Create a new blog post (authenticated).
  - `PUT /blog/posts/:id`: Update a blog post (authenticated).
  - `DELETE /blog/posts/:id`: Delete a blog post (authenticated).
