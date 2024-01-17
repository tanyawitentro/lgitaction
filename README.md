# Micro Template

Micro Template is a Node.js web application template with TypeScript, Express, and other essential tools.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v20.10.0)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Typescript](https://www.typescriptlang.org/Typescript) (v4.7.4)
- [MongoDB](https://www.mongodb.com/try/download/community) (v7)

## Installation

1. Clone the repository:
	```bash
      git clone https://gitlab.entro-lab.com/ovms/micro-template.git
   ```

2. Change into the project directory:
	```bash
      cd micro-template
   ```
   
3. Install dependencies:
	```bash
      npm install
   ```
   
## Usage
**Local Development**
For local development with automatic reloading:
   ```bash
      npm run local
   ```

**Production Build**
To build and run the application in production mode:
   ```bash
      npm run prod
   ```

**Docker Compose**
To run the application using Docker Compose:
   ```bash
      docker-compose up -d
   ```
   
## Configuration

The application can be configured using environment variables. Edit the `docker-compose.yml` file or use a `.env` file to set configuration options.

## Scripts

-   `npm run tsc`: Run TypeScript compiler.
-   `npm run local`: Run the application in local mode.
-   `npm run dev`: Run the application in development mode.
-   `npm run start`: Alias for `npm run serve`.
-   `npm run build`: Build the application for production.
-   `npm run prod`: Build and run the application in production.
-   `npm test`: Run tests.


## Release Note
**1.0.1**
 - test

**1.0.0**
 - test