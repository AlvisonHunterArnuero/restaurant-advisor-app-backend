import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurant.route';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Establish connection to the MongoDB database
// The connectDB function is an async function,
// so we handle any potential errors using.catch
connectDB().catch(console.dir);

// Middleware setup

// Enable Cross-Origin Resource Sharing (CORS)
// This allows your API to be accessible from different domains/origins
app.use(cors());

// Enable parsing of JSON bodies in requests
// This allows your API to handle incoming requests with JSON payloads
app.use(express.json());

// Route setup

// Use the restaurantRoutes for handling requests to the /api/restaurants/ endpoint
// All routes related to restaurants will be handled by the restaurantRoutes module
app.use('/api/restaurants/', restaurantRoutes);

// Define the port number for the server to listen on
// Use the PORT value from environment variables, or default to 5001 if not specified
const PORT = process.env.PORT || 5001;

// Start the Express server and listen for incoming connections on the defined port
// Log a message to the console once the server is up and running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
