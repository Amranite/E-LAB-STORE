import express from "express"; // Import express
import { signIn, signOut, signUp } from "../controllers/authentication.controller.js"; // Import the sign-up, sign-in, and sign-out functions from the authentication controller

// Create a router object
const router = express.Router();

// Define a route for the sign-up of the application
router.post("/sign-up", signUp);
// Define a route for the sign-in of the application
router.post("/sign-in", signIn);
// Define a route for the sign-out of the application
router.post("/sign-out", signOut);

// Export the router object
export default router;