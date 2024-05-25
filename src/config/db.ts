import mongoose from 'mongoose';

async function connectDB() {
    if (!process.env.MONGO_URI) {
        throw new Error('Invalid MongDB Atlas Cloud URI string');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.log('Failed', err);
    } finally {
        // Ensures that the client will close when you finish/error
        //await mongoose.disconnect();
    }
}

export default connectDB;
