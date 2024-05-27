import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

/**
 * @route   GET /api/restaurants
 * @desc    Get all restaurants
 * @access  Public
 */
export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find();
        if (restaurants.length > 0) {
            res.json(restaurants);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};

/**
 * @route   POST /api/restaurants
 * @desc    Add new restaurant
 * @access  Public
 */
export const addNewRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = new Restaurant(req.body);
        const createdRestaurant = await restaurant.save();
        res.status(201).json(createdRestaurant);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
};

/**
 * @route   GET /api/restaurants/search
 * @desc    Search restaurants based on query parameters
 * @access  Public
 */
export const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query parameter is required' });
        }

        const restaurants = await Restaurant.find({
            $or: [
                { name: { $regex: new RegExp(query as string, 'i') } },
                { cuisine: { $regex: new RegExp(query as string, 'i') } },
                { location: { $regex: new RegExp(query as string, 'i') } },
                { cuisineType: { $regex: new RegExp(query as string, 'i') } },
                { priceRange: { $regex: new RegExp(query as string, 'i') } },
                { openingHours: { $regex: new RegExp(query as string, 'i') } },
                { reviews: { $regex: new RegExp(query as string, 'i') } },
                { phone: { $regex: new RegExp(query as string, 'i') } },
                { specialDiets: { $regex: new RegExp(query as string, 'i') } },
            ],
        });

        if (restaurants.length > 0) {
            res.json(restaurants);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};