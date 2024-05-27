import mongoose from 'mongoose';

/**
 * Checks if the MongoDB connection URI is set in the environment variables.
 * Throws an error if the URI is not set.
 */
const checkConectionURI = () => {
    if (!process.env.MONGO_URI) {
        throw new Error('The MongoDB Atlas Cloud URI string is not properly set.');
    }
}

/**
 * Connects to Atlas Cloud using the environment variables URI string.
 * Logs the connection status to the console.
 * Pings the MongoDB deployment to verify the connection.
 */
async function connectDB() {
    // Check if the MongoDB URI is properly set
    checkConectionURI();
    try {
        console.log("Attempting to connect to MongoDB Atlas...");

        // Connect to the MongoDB Atlas using Mongoose
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Successfully connected to MongoDB Atlas Cloud!");

        // Ping the MongoDB deployment to ensure the connection is working
        await mongoose.connection.db.admin().command({ ping: 1 });

        console.log("Successfully pinged the MongoDB deployment. Connection is stable!");
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// Export the connectDB function as the default export
export default connectDB;
