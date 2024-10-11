import express from "express"; // Import express
import dotenv from "dotenv"; // Import dotenv

import authenticationRoutes from "./routes/authentication.route.js"; // Import the authentication routes

import { connectDB } from "./library/database.js"; // Import the connectDB function

// Load environment variables
dotenv.config();

const application = express(); // Create an express application
const PORT = process.env.PORT || 1000; // Default port is 1000

// Parse JSON bodies for this application
application.use(express.json());

// Define a route for the root of the application
application.use("/api/authentication", authenticationRoutes);

// Define a route for the root of the application
application.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // connect to the database
  connectDB();
});