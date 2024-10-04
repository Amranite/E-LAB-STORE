import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const application = express(); // Create an express application
const PORT = process.env.PORT || 1000; // Default port is 1000

application.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});