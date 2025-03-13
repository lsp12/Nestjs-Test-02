# Task Management API Project

## Description

This repository contains two projects:

1. **Code Challenge**
2. **Problem Resolution**

Both projects are described in the PDF provided to me.

## Project Structure

Each project has its own `README.md` file, where specific instructions and explanations for each project are provided.

---

Thank you for your consideration.

---

## QUIZ

### 1. You're building a high-throughput API for a cryptocurrency trading platform. For this platform, time is extremely important because microseconds count when processing high-volume trade orders. For communicating with the API, you want to choose the verb that is fastest for read-only operations.

What verb should you choose for retrieving trade orders with the API server?

- **a. GET** (Correct answer)
- b. UPDATE
- c. DELETE
- d. POST

### 2. You work for a Customer Relationship Management CRM company. The company's clients gain CRM access through a RESTful API. The CRM allows clients to add contact information for customers, prospects, and related persons (e.g., virtual assistants or marketing directors). You want to choose an appropriate API request path so clients can easily retrieve information for a single contact while also being flexible for future software changes.

Which of the following API paths should you use?

- a. /customers/{customer_id}
- **b. /contacts/{contact_id}** (Correct answer)
- c. /contacts/{contact_type}/all
- d. /customers/all

### 3. You work for a large social media network, and you've been tasked with error handling for the API. You're trying to decide on an appropriate error code for authentication failures based on non-existent users and incorrect passwords. You want to balance security against brute force attacks with providing descriptive and true error codes.

Which HTTP error code(s) should you use to keep the system secure and still report that an error occurred?

- a. 404 if the user doesn't exist, and 403 if the password is wrong.
- b. 403 if the user doesn't exist, and 401 if the password is wrong.
- c. 500 if the user doesn't exist or if the password is wrong.
- **d. 401 if the user doesn't exist or if the password is wrong.** (Correct answer)

### 4. You're writing documentation for requesting information about a given user in your system. Your system uses UUIDS (universally unique identifiers) as user identifiers. In your documentation, you want to show an example.

True or false: You should put a fake UUID into the example code (instead of just the text "UUID") as a placeholder.

- a. TRUE
- **b. FALSE** (Correct answer)

### 5. You're building code to handle errors issued from a remote API server. The response may or may not have an error.

How much work should your method, handleErrors(response), handle?

- a. Check for the presence of an error. If it exists, then set a class property to the error.
- **b. Check for the presence of an error. If it exists, throw an exception with the error.** (Correct answer)
- c. Check for the presence of an error. If it exists, set a class property to the error, then throw an exception.

### 6. You have two classes: a database driver and an email driver. Both classes need to set errors so that your front-end interface displays any errors that transpire on your platform.

Which way should you implement this error handling?

- a. Write the error handling the same way in both classes, but keep it to one line of code.
- **b. Make a trait to handle errors so it'll collect errors in any class that uses it.** (Correct answer)
- c. Make a driver-based error provider to handle errors in all classes that can issue errors.

### 7. You need to name the private method in your class that handles looping through eCommerce products to collect and parse data. That data gets stored in an array and set as a class property.

Which of the following should you use to name your method?

- a. loopThroughProductsAndParseData()
- **b. loopProductsAndParse()** (Correct answer)
- c. parseDataForProducts()
- d. parseDataForProductsAndSetArray()

### 8. There are multiple places in your codebase that need to access the database. To access the database, you need to supply credentials. You want to balance security with usability.

What strategy should you use to store and access these credentials?

- a. Put them in the code that connects to the database for each place that needs database access.
- b. Put them in a configuration file, then include that file in the code everywhere that needs to access the database.
- c. Put the credentials into a configuration file, then load them with a database service provider.
- **d. Put them in a .env file, load data from it into a configuration system, then request the credentials from a database service provider.** (Correct answer)

---

## Scenario Analysis

### Scenario: Distributed System Latencies and Failures in Microservices

**Identifying the problem:**

- First, it's crucial to understand what's causing the latencies and failures. This is done by constantly monitoring the services, using tools that provide visibility into performance and possible bottlenecks. It's also important to have detailed logs to identify error patterns and determine if certain services fail more frequently or if there is overload on any microservice.

**Possible solutions:**

1. **Scaling services**: If a microservice is receiving more traffic than it can handle, we can scale horizontally by adding more instances of that service to share the load.
2. **Using retries and circuit breakers**: If a service fails, we don't want it to affect the rest of the system. To do that, we can implement patterns like automatic retries with intervals (exponential backoff) and circuit breakers, which prevent a problematic microservice from affecting the entire architecture.
3. **Asynchronous processing**: Sometimes, it's better not to do everything at once. Using message queues like RabbitMQ or Kafka allows us to decouple services so that if one microservice is slow, the others aren't affected.
4. **Data caching**: To improve the speed of data access, we can cache frequently queried data (using Redis, for example). This reduces the load on the database and cuts down on latencies.

**High availability and resilience:**

- **Service redundancy**: To avoid single points of failure, it's important to deploy microservices on different servers or availability zones. If one server fails, the system continues to function.
- **Automatic failover**: Set up failover mechanisms to ensure that if a service goes down, a backup service takes over without the users noticing.
- **Gradual deployments**: Implement strategies like Blue-Green or Canary deployments so that updates don't affect the whole system at once. This allows new versions to be tested in a controlled manner before the full switch is made.
- **Resilience testing**: Perform resilience tests, like chaos engineering, where we simulate intentional failures in the system to see how it responds to emergency situations.

**Continuous improvements:**

- **Constant monitoring**: It's not enough to improve the system just once. Continuous performance monitoring and adjustments are needed as new problems arise.
- **Code optimization**: Sometimes latency problems come from inefficient code. It's important to review and improve the performance of microservice code, looking for ways to make it faster and more efficient.
