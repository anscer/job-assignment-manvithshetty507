 State Management System - Backend Assignment

## Project Overview
This project implements a state management system using Node.js, Express.js, and MongoDB with TypeScript. The system includes session-based user authentication and authorization, API endpoints for CRUD operations, and features like data querying and aggregation.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- TypeScript
- Mongoose
- Jest
- Supertest
- MongoMemoryServer

## Prerequisites
- Node.js (version >= 14.x)
- npm (version >= 6.x)
- MongoDB

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/state-management-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd server
    ```
3. Install the dependencies:
    ```bash
    npm install
    npx tsc --init
    ```

## Running the Application
To start the server in development mode:
```bash
npm build
npm run start:prod

## API Documentation

### Authentication APIs

#### Register

**POST** `http://localhost:3000/api/auth/register`

**Body:**

```json
{
  "username": "your-username",
  "password": "your-password"
}


###Login
**POST** http://localhost:3000/api/auth/login

**Body:**
```json
{
  "username": "your-username",
  "password": "your-password"
}

###Logout
**POST** http://localhost:3000/api/auth/logout

### State APIs

#### Create a State

**POST** `http://localhost:3000/api/states`

**Example Body:**

```json
{
  "name": "Operational",
  "description": "The state indicating that the system is fully operational.",
  "status": "active",
  "createdBy": "user123"
}

###Get a State
**GET** http://localhost:3000/api/states/669e93514a1ad001d0b0d963

###Update a State
**PUT** http://localhost:3000/api/states/669e93514a1ad001d0b0d963

###Delete a State
**DELETE** http://localhost:3000/api/states/669e93514a1ad001d0b0d963
