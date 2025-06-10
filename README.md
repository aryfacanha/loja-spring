# Loja Spring

This repository contains a simple store management application built with Spring Boot.
It exposes a REST API for managing brands, categories, products and orders and includes
basic HTML/JS pages in `src/frontend` that interact with the API.

## Features

- CRUD operations for brands, categories and products
- Orders with related products
- Global exception handling returning JSON error messages
- Example front‑end pages using jQuery and Bootstrap

## Requirements

- Java 17+
- Maven 3+
- MySQL running locally (database configured in
  [`src/main/resources/application.properties`](src/main/resources/application.properties))

## Running the application

Use the Maven wrapper to start the Spring Boot application:

```bash
./mvnw spring-boot:run
```

By default the server starts on `http://localhost:8080` and initializes the database
schema using `create-drop` each run. API endpoints are available under `/api/`.

## Running tests

```bash
./mvnw test
```

## Front-end pages

Static HTML pages for quick testing are available in `src/frontend`.
Open the desired page in a browser after starting the server and the scripts will
perform AJAX requests to the API.