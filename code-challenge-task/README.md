
# Task Management API Project

## Description

This project is a Task Management API built with NestJS, utilizing MySQL, MongoDB, and Redis for persistence and caching. input validation, and a Swagger interface for interacting with the API.

## Requirements

- Docker must be installed and running on your machine.

## Installation Steps

1. **Configure the `.env` file**:

   Create a `.env` file in the same directory as the `package.json` file. Make sure the `.env` file contains the following:

   ```env
   PORT=3000
   MYSQL_HOST=mysql
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=password123
   MYSQL_DATABASE=nestjs_jelou
   MONGODB_URI=mongodb://mongodb:27017/logs
   REDIS_HOST=redis
   REDIS_PORT=6379
   ```

2. **Start the services with Docker**:

   After creating the `.env` file, run the following command to build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

3. **Access Swagger**:

   Once the project is up, you can access the Swagger interface to view all available endpoints and usage examples:

   [http://localhost:3000/api](http://localhost:3000/api)

   In Swagger, you will find the available API endpoints along with schemas for creating and updating tasks.

## Features

- **Rate Limiting**: Requests are limited to a maximum of 5 requests every 3 seconds.
- **Redis Cache**: Redis cache has a lifetime of 0.5 seconds and applies only to `GET` requests with an `id` parameter, i.e., `GET tasks/{id}`.

## Unit Tests

To run the unit tests for the service and task controllers, run the following command:

```bash
npm run test
```

This command will run tests for the task services and controllers.

## Contact

- **Author**: Jonathan Vera
- **Email**: jonathankenn8852@gmail.com
- **GitHub**: [lsp12](https://github.com/lsp12)
