import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config(); // Load environment variables

// export keyword is used to export the redis object so that it can be used in other files
export const redis = new Redis(process.env.UPSTASH_REDIS_URL); // Create a new Redis client

/* await redis.set('foo', 'bar'); // Set a key-value pair in Redis with the key 'foo' and the value 'bar' */