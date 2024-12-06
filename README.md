# EarDefender frontend

This is the frontend for the EarDefender application, built with Vue.js. It serves as the user interface for interacting with the system, providing tools for audio analysis and verification.

## Local run using Docker

### Build Docker Image
Use the provided Dockerfile to build a containerized version of the frontend:
```bash
docker build -t frontend-app .
```

### Run Docker Container
Run the containerized frontend, exposing it on port `8080`:
```bash
docker run -p 8080:8080 frontend-app
```

## Local run 

### Install Dependencies
```bash
npm install
```

### Compiles and Hot-Reloads for Development
```bash
npm run serve
```

### Compiles and Minifies for Production
```bash
npm run build
```

### Lints and Fixes Files
```bash
npm run lint
```

### Customize Configuration
See [Configuration Reference](https://cli.vuejs.org/config/).