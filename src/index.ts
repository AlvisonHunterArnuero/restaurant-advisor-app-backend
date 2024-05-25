import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes';
import dotenv from 'dotenv';
import connectDB from './config/db';

require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
connectDB().catch(console.dir);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', restaurantRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
