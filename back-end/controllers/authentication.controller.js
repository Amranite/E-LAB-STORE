import { redis } from "../library/redis.js";
import User from "../models/user.model.js"; // Import the User model
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}

const storeRefreshToken = async (userId, refreshToken) => {
    // Store the refresh token in Redis with a key of `redis_token:${userId}` and an expiration of 7 days
    await redis.set(`redis_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
}

const setCookies = (res, accessToken, refreshToken) => {
    // Set the access token in a cookie with the key `access_token` and an expiration of 15 minutes
    res.cookie("access_token", accessToken, {
        httpOnly: true, // The cookie is only accessible by the server and not by the client side to prevent XSS (Cross-Site Scripting) attacks
        sameSite: "strict", // The cookie is only sent in requests to the same site to prevent CSRF (Cross-Site Request Forgery) attacks
        secure: process.env.NODE_ENV === "production", // The cookie is only sent over HTTPS in production
        maxAge: 15 * 60 * 1000 // The cookie expires in 15 minutes
    });
    // Set the refresh token in a cookie with the key `refresh_token` and an expiration of 7 days
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true, // The cookie is only accessible by the server and not by the client side to prevent XSS (Cross-Site Scripting) attacks
        sameSite: "strict", // The cookie is only sent in requests to the same site to prevent CSRF (Cross-Site Request Forgery) attacks
        secure: process.env.NODE_ENV === "production", // The cookie is only sent over HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000 // The cookie expires in 7 days
    });
}

// Define a route for the sign-up of the application
export const signUp = async (req, res) => {
    const { email, password, name } = req.body; // Destructure the email, password, and name from the request body
    try {
        const userExists = await User.findOne({ email }); // Check if the user exists in the database

        if (userExists) {
            return res.status(400).json({ error: "User already exists" }); // Return an error if the user already exists
        }
        const user = await User.create({ email, password, name }); // Create a new user

        const { accessToken, refreshToken } = generateTokens(user._id); // Generate tokens for the user
        await storeRefreshToken(user._id, refreshToken); // Store the refresh token in Redis
        setCookies(res, accessToken, refreshToken); // Set the cookies in the response

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }, message: "User created successfully"
        }); // Return the user and a message if the user is created successfully
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Return an error if there is an error creating the user
    }
    // res.send("Sign-up route");
}

// Define a route for the sign-in of the application
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure the email and password from the request body
        const user = await User.findOne({ email }); // Find the user by email

        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id); // Generate tokens for the user
            await storeRefreshToken(user._id, refreshToken); // Store the refresh token in Redis
            setCookies(res, accessToken, refreshToken); // Set the cookies in the response

            res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, message: "User signed in successfully"
            }); // Return the user and a message if the user is signed in successfully
        } else {
            return res.status(401).json({ error: "Invalid email or password" }); // Return an error if the email or password
        }
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Return an error if there is an error signing in the user
    }
    // res.send("Sign-in route");
}
// Define a route for the sign-out of the application
export const signOut = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token; // Get the refresh token from the request cookies
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // Verify the refresh token
            await redis.del(`redis_token:${decoded.userId}`); // Delete the refresh token from Redis
        }
        res.clearCookie("access_token"); // Clear the access token cookie
        res.clearCookie("refresh_token"); // Clear the refresh token cookie
        res.status(200).json({ message: "User signed out successfully" }); // Return a message if the user is signed out successfully
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Return an error if there is an error signing out the user
    }
    // res.send("Sign-out route");
}