
# Product Recommendation Service

This project implements a scalable API for product recommendations using **NestJS**, **TypeScript**, and vector-based search technology. The API is designed to serve as a foundation for a SaaS product recommendation service.

## Features

- **Endpoints:**
  - **GET `/products/:productID`**: Recommends similar products based on a given product ID.
  - **POST `/products`**: Adds products to the database in batch mode, optimized for handling large payloads.
- **Tech Stack:**
  - Backend: NestJS, TypeScript.
  - Database: Pinecone (vector-based).
  - Cloud: AWS Lambda with Serverless framework.
- **Best Practices:**
  - Modular architecture following Clean Architecture principles.
  - Validation with DTOs and Pipes.
  - Logging with `nestjs-pino`.
  - Batch processing for scalability.
  - Detailed error handling with custom exceptions.

## Requirements

- **Node.js**: `>=18`
- **NPM**: `>=10.5`
- **Serverless Framework**: `^4.4.9`

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
    APP_NAME=app
    NODE_ENV=development
    APP_URL=127.0.0.1
    APP_PORT=3000
    APP_LOG_LEVEL=info
    OPENAI_API_KEY=
    PINECONEAPI_KEY=
    PINECONE_TOP_K=
    PINECONE_INDEX=
   ```


## Scripts

| Command            | Description                              |
|--------------------|------------------------------------------|
| `npm run start:prod`    | Starts the application in production.    |
| `npm run start:dev`| Starts the application in development.   |
| `npm run lambda`   | Start on lambda environment with serverless-offline   |
| `npm run build`    | Compiles the TypeScript code.            |
| `npm run deploy`   | Deploys the application using Serverless.|
| `npm run test`     | Runs all unit tests.                    |
| `npm run lint`     | Lints and fixes code issues.            |


## Use PostmanCollection.json to import the collection on postman for test.

## Api Urls

- local
 - http://localhost:3000/

- dev
 - https://30eflgmzk7.execute-api.us-east-1.amazonaws.com/dev/


## API Endpoints

### 1. `GET /products/:productID`
- **Description**: Fetches similar products for a given product ID.
- **Response Example**:
  ```json
  {
    "recommendations": [
      { "productId": "123", "score": 0.95 },
      { "productId": "456", "score": 0.87 }
    ]
  }
  ```

### 2. `POST /products`
- **Description**: Adds products to the database.
- **Payload Example**:
  ```json
  {
    "products": [
      { "id": "123", "name": "Product A", "description": "..." },
      { "id": "456", "name": "Product B", "description": "..." }
    ]
  }
  ```

## Architecture

- **Clean Architecture**:
  - `Domain`: Contains business logic and entities.
  - `Application`: Implements use cases, DTOs, controllers and repositories.

## Deployment

This project uses **AWS Lambda** with the **Serverless Framework**. To deploy:
```bash
npm run deploy
```

### Serverless Configuration Highlights

- **Runtime**: Node.js 18.x
- **Timeout**: 900 seconds (15 minutes).
- **Customizations**: Optimized with esbuild for performance and minimized deployment packages.

## Testing

- **Unit Tests**: Written with Jest.
- **Test Coverage**: Validate business logic and critical paths.
- Run tests:
  ```bash
  npm run test
  ```

## Decisions and Rationale

- **Vector Database**: Chose Pinecone for its high performance and ease of integration with AI-based recommendation systems.
- **Batch Processing**: Process large payloads in chunks (150 per batch) to improve scalability and memory usage.
- **Cloud-Ready**: Designed for AWS Lambda with optimizations for serverless execution.

## Future Improvements

- **Authentication**: Implement role-based access control.
- **Enhanced Error Handling**: Add global exception filters for consistent error responses.

## Contributors

- **Your Name** Sebastian Aliceio
  - **Role**: Principal Engineer
  - **Contact**: sebastian.aliceio@vangwe.com
