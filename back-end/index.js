import express from "express"; // Import express
import dotenv from "dotenv"; // Import dotenv
import cookieParser from "cookie-parser"; // Import cookie-parser middleware

import authenticationRoutes from "./routes/authentication.route.js"; // Import the authentication routes
import productRoutes from "./routes/product.route.js"; // Import the authentication routes

import { connectDB } from "./library/database.js"; // Import the connectDB function

// Load environment variables
dotenv.config();

const application = express(); // Create an express application
const PORT = process.env.PORT || 1000; // Default port is 1000

// Parse JSON bodies for this application
application.use(express.json());

// Use the cookie parser middleware to parse cookies
application.use(cookieParser());

// Define a route for the root of the application
application.use("/api/authentication", authenticationRoutes);
application.use("/api/products", productRoutes);

// Define a route for the root of the application
application.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // connect to the database
  connectDB();
});