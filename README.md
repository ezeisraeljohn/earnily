# EARNILY

![Earnily](Earnily.png)

### Welcome to the Earnily API, this API is for developers looking for the right API to develop their Job seeking / Employment platform

## Table of Contents

1. [Features](#Features)
2. [Installation](#installation)
3. [Endpoints](#endpoints)
4. [Technologies](#technologies)
5. [Usage](#usage)
6. [Testing](#testing)
7. [API Documentation](#api-documentation)
8. [Author](#author)
9. [License](#license)

### Features

- Create a job (For employers)
- Get all jobs
- Get a single job
- Update a job
- Delete a job
- apply for a job (for jobseekers)
- update status of a particular job application (for employers)

## Installation

Please follow this guide carefully on how to install the Earnily API on your local machine

1. **clone the repository:**
   I will recommend to use a CLI for this operation instead of a GUI.
   For this operation I will be using bash.

   ```bash
   git clone https://github.com/ezeisraeljohn/earnily.git
   cd earnily
   ```

2. **Install dependencies:**
   To install the dependencies, you need to run the following command

   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory of the project and add the following environment variables

   ```env
   SECRET=your_secret_key
   PORT=3000
   Test_MONGO_URI=mongodb://localhost:27017/earnily  # serves and the database for your main application
   T_Mongo_URI=mongodb://localhost:27017/test_earnily # serves as the database for your test
   ```

4. **start the server:**
   To start the server, you need to run the following command

   ```bash
   npm start
   ```

### Endpoints

below are the sneek peek of the endpoints

- POST `/api/v1/register` - Register a user
- POST `/api/v1/login` - Login a user
- POST `/api/vi/jobs` - Create a job
- POST `/api/v1/jobs/:jobId/apply` - Apply for a job

see the full documentation at [API Documentation](#api-documentation)

## Technologies

- Node.js
- Express
- MongoDB
- Azure Blob Storage

## Usage

once you have the server running, you can interact wit the api using tools like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or [curl](https://curl.se/)

## Testing

You can test the API endpoints using Postman. Import the collection directly using the following link:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://documenter.getpostman.com/view/38873322/2sAYBbdoiw)

Or you can run the test using the following command

```bash
npm test
```

## API Documentation

For detailed API documentation, visit the [Postman](https://documenter.getpostman.com/view/38873322/2sAYBbdoiw) endpoints.

## Author

- [Eze Israel John](https://ezeisraeljohn.me)

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
