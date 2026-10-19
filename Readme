# Project Architecture and Flow: Node.js Express Docker API

## 1. Overview
This project is a containerized Node.js Express application that serves as a lightweight REST API. It is designed to demonstrate application lifecycle management, single-stage and multi-stage Docker builds, and container orchestration using Docker Compose.

## 2. System Architecture
The system follows a standard lightweight microservice architecture where the application logic and HTTP web server are bundled inside an isolated Docker container.

```text
[ Client / Browser / cURL ]
           |
           | HTTP GET (e.g., /api/data)
           v
[ Host Machine (EC2 / Local) ]
           |
           | Port Forwarding (3000 -> 3000)
           v
[ Docker Engine (compose.yaml) ]
           |
           v
[ Docker Container (node-express-app) ]
           |
           | Node.js Runtime (Alpine Linux)
           v
[ Express.js Server (src/server.js) ]
```

## 3. Core Components

### A. Application Layer
*   **`src/server.js`**: The application entry point. It initializes the Express instance, parses environment variables (like `PORT`), defines the API routes (`/`, `/health`, `/api/data`), and binds the server to `0.0.0.0` so it can accept external connections from Docker.
*   **`package.json`**: Manages the project dependencies (specifically `express`) and defines execution scripts (`start`, `dev`).

### B. Containerization Layer
*   **Single-Stage (`Dockerfile`)**: A straightforward build file. It copies all files, installs all dependencies via `npm ci`, and runs the application. Great for learning and rapid testing.
*   **Multi-Stage (`Dockerfile.multistage`)**: An optimized build file. 
    *   **Stage 1 (Build)**: Gathers source files and installs all dependencies.
    *   **Stage 2 (Runtime)**: Starts fresh, copies only the required code from Stage 1, and uses `npm ci --omit=dev` to install only production dependencies. This reduces the final image size and minimizes security vulnerabilities.
*   **`.dockerignore`**: Ensures local artifacts (like the local `node_modules` folder, `.git`, or `.env` files) are not copied into the Docker image, preventing cross-platform binary issues and protecting secrets.

### C. Orchestration Layer
*   **`compose.yaml`**: The blueprint for running the container. It defines the service (`app`), maps the host port `3000` to the container port `3000`, sets production environment variables, and ensures the container restarts automatically if it crashes (`restart: unless-stopped`).

---

## 4. Application Request Flow (Lifecycle)

When a user interacts with the API, the request goes through the following flow:

1. **Initialization**: Running `docker compose up -d` triggers the Docker daemon to build the image (if not already built) and spin up the container. Inside the container, the `CMD ["node", "src/server.js"]` instruction starts the Node process.
2. **Request Entry**: A client makes an HTTP GET request to `http://<your-ip>:3000/api/data`.
3. **Network Routing**: The Host machine receives the traffic on port 3000. Docker's internal networking (configured by Compose) intercepts this and routes it to port 3000 *inside* the isolated container.
4. **Application Processing**: The Node.js runtime receives the request. The Express framework checks its configured routes, matches `/api/data`, and executes the corresponding callback function.
5. **Response Generation**: The Express route generates a JSON object (`{"data": "Here is your sample data..."}`) and sends it back through the Docker network bridge to the host, and finally back to the client with an HTTP 200 OK status.

---

## 5. Project File Structure

```text
node-express-docker-app/
├── src/
│   └── server.js             # API Routes and Server setup
├── package.json              # Node dependencies and scripts
├── Dockerfile                # Single-stage build configuration
├── Dockerfile.multistage     # Optimized multi-stage build configuration
├── compose.yaml              # Docker Compose service definition
└── .dockerignore             # Excludes unnecessary local files from Docker
```
