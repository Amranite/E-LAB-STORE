import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
   try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "You need to be logged in to access this route" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        // const user = await User.findById(decoded.userId).select("-password"); // TO-DO: userId or id
        const user = await User.findById(decoded.id).select("-password");
    
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
    
        req.user = user;
    
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        throw error;
    }

   } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(401).json({ message: "You need to be logged in to access this route" });
   }
}; // Create a protectRoute middleware function

export const adminRoute = (req, res, next) => { 
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied - Admin Only" });
    }
 }; // Create an adminRoute middleware function