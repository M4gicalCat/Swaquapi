# SWAQUAPI

## Description

This is a simple API for the SWAQUA project. It is a REST API that allows you to create, read, update and delete data from the database.

## Installation

### Requirements

-   [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup

1. `git clone https://github.com/M4gicalCat/swaquapi.git && cd swaquapi`
2. Install the dependencies with `npm install`
3. `cd src/ && cp db.config.example.ts db.config.ts`
4. Create a postgresql database
5. Edit the `db.config.ts` file with your database credentials
6. `cp secret.example.ts secret.ts`
7. Edit the `secret.ts` file with your secret key
8. run `npm run start`
9. The API is now running on `localhost:8000`

## Usage

### AUTH

#### /auth/register

- **Method:** POST
- **Description:** Register a new user
- **Body:**
    -  **username:** string
    -  **password:** string
- **Response:**
    -  **status:** 200
    -  **swallower:** object
        -  **id:** number
        -  **username:** string
    -  **token:** string
- **Error:**
    -  **status:** 400
    -  **message:** string

#### /auth/login

- **Method:** POST
- **Description:** Login a user
- **Body:**
    -  **username:** string
    -  **password:** string
- **Response:**
  - **status:** 200
  - **swallower:** object
    - **id:** number
    - **username:** string
    - **token:** string
- **Error:**
    -  **status:** 400
    -  **message:** string

#### /auth/refresh

- **Method:** GET
- **Description:** Refresh the token
- **Body:**
    - **token:** string
- **Response:**
  - **status:** 200
  - **swallower:** object
    - **id:** number
    - **username:** string
  - **token:** string
- **Error:**
    -  **status:** 401
    -  **message:** string

### SWALLOWERS

#### /swallowers

- **Method:** GET
- **Description:** Get the current swallower's data
- **Body:**
    - **token:** string
- **Response**
  - **status:** 200
  - **id:** number
  - **username:** string
  - **glouglou:** number
- **Error:**
    -  **status:** 401
    -  **message:** string

#### /swallowers/:id
##### only for testing purposes

- **Method:** GET
- **Description:** Get the data of a specific swallower
- **Body:**
- **Response**
  - **status:** 200
  - **id:** number
  - **username:** string
  - **glouglou:** number

#### /swallowers

- **Method:** DELETE
- **Description:** Delete the current swallower's account
- **Body:**
    - **token:** string
- **Response**
  - **status:** 200
  - **message:** string
- **Error:**
  -  **status:** 401
  -  **message:** string

### GORGEE

#### /gorgee

- **Method:** POST
- **Description:** Create a new gorgee
- **Body:**
    - **token:** string
    - **gorgee:** number
- **Response**
  - **status:** 200
  - **glouglou:** number
- **Error:**
  -  **status:** 401
  -  **message:** string