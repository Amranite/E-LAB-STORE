import express from "express"; // Import express
import { getAllProducts } from "../controllers/product.controller.js"; // Import the getAllProducts function

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts); // Define specific routes for getting all products

export default router;