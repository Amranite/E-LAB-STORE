# E-Lab Store

E-Lab Store is a backend application for an e-commerce platform, built using JavaScript technologies.
The project focuses on core backend functionalities, including user authentication, product management, cart operations, and payment processing.
It serves as a learning project to enhance proficiency in using Node.js, Express.js, MongoDB, and other related technologies.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Future Improvements](#future-improvements)

## Tech Stack

### Languages & Frameworks
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for building RESTful APIs

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

### Authentication & Security
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT-based authentication
- **ioredis**: Redis client for token storage (using Upstash)

### Additional Libraries
- **cloudinary**: For image upload and management
- **cookie-parser**: Parsing cookies in requests
- **dotenv**: Managing environment variables

### Complete List of Dependencies
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cloudinary": "^2.5.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "ioredis": "^5.4.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.0"
}
```

## Features
- **User Authentication**: Registration, login, and secure password management.
- **Product Management**: CRUD operations for products.
- **Cart Functionality**: Add, view, and remove items from the cart. // (TODO: OPTIONAL)
- **Discounts & Coupons**: Planned feature for applying discount codes at checkout. // (TODO: OPTIONAL)
- **Payment Processing**: Integration with Stripe for secure transactions. // (TODO: OPTIONAL)

## Future Improvements
- Finish CRUD operations for products.
- Implement full coupon management and discount validation.
- Complete Stripe payment integration with webhooks.
- Add unit tests for critical routes and controllers.
- Expand Redis usage for caching and session management.
