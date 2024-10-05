import express from "express";

const ROUTER = express.Router();

// Define a route for the sign-up of the application
ROUTER.get("/sign-up", (req, res) => {
  res.send("Sign-up route");
});

// Define a route for the sign-in of the application
ROUTER.get("/sign-in", (req, res) => {
  res.send("Sign-in route");
});

// Define a route for the sign-out of the application
ROUTER.get("/sign-out", (req, res) => {
  res.send("Sign-out route");
});

export default ROUTER;