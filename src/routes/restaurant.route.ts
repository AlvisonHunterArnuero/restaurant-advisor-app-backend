import express from 'express';
import { getAllRestaurants, addNewRestaurant, searchRestaurant } from '../controllers/restaurant.controller';

const router = express.Router();


router.get('/', getAllRestaurants);
router.post('/', addNewRestaurant);
router.get('/search', searchRestaurant);

export default router;

