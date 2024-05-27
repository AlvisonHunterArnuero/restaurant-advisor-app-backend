import express from 'express';
import { getAllRestaurants, addNewRestaurant, searchRestaurant } from '../controllers/restaurant.controller';

const router = express.Router();

/**
 * @route   GET /api/restaurants
 * @desc    Get all restaurants
 * @access  Public
 */
router.get('/', getAllRestaurants);

/**
 * @route   POST /api/restaurants
 * @desc    Add a new restaurant
 * @access  Public
 */
router.post('/', addNewRestaurant);

/**
 * @route   GET /api/restaurants/search
 * @desc    Search for restaurants based on query parameters
 * @access  Public
 */
router.get('/search', searchRestaurant);

export default router;

