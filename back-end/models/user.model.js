import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create a schema for the user model
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    timestamps: true // Add timestamps to the user model (createdAt, updatedAt)
});

// Hash the password with error handling before saving the user to the database
userSchema.pre("save", async function(next) { // the .pre() method is a middleware function that runs before the save() method
    if (!this.isModified("password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare the password with the hashed password in the database
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Create a model for the user schema
const User = mongoose.model("User", userSchema); // the model() method creates a model from the schema

// Export the user model
export default User;