import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Find all products
        res.json({ products });
        // res.status(200).json(products); // Return the products
    } catch (error) {
        console.log("Error in getAllProducts controller:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message }); // Return an error if there is an error finding the products
    }
    // res.send("Get all products route");
}