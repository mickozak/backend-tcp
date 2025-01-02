const express = require("express");
const cors = require("cors"); // Import cors
const problemRoutes = require("./routes/problemRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // Ensure you're using the correct port

/**
 * Initializes and configures the Express application.
 * The application listens for incoming HTTP requests and routes them to the appropriate controllers.
 *
 * @module app
 */

/**
 * Enable CORS for all routes and origins.
 * This allows cross-origin requests from any domain.
 */
app.use(
  cors({
    origin: ["http://localhost:3001","http://vps-26fe98e4.vps.ovh.net:4000"], // Allow only the frontend port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

/**
 * Middleware to parse incoming request bodies as JSON.
 * This allows the app to handle JSON payloads in requests.
 */
app.use(express.json());

/**
 * Registers the problem routes under the '/api' path.
 * All routes defined in `problemRoutes.js` will be prefixed with '/api'.
 *
 * @see {@link ./routes/problemRoutes} for the problem-related routes.
 */
app.use("/api", problemRoutes);

/**
 * Starts the Express server on the specified port.
 * Logs a message to the console when the server is running.
 *
 * @param {number} PORT - The port number where the server will listen for requests.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
