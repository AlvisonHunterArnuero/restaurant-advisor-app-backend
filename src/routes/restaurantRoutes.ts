import express, { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

const router = express.Router();

// Get all restaurants
router.get('/', async (req: Request, res: Response) => {
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
});

// Get restaurant by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            console.log(restaurant)
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// Add new restaurant
router.post('/', async (req: Request, res: Response) => {
    try {
        const restaurant = new Restaurant(req.body);
        const createdRestaurant = await restaurant.save();
        res.status(201).json(createdRestaurant);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// Search restaurants
router.get('/search', async (req: Request, res: Response) => {
    const { name, city } = req.query;
    try {
        const query: any = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (city) query.location = { $regex: city, $options: 'i' };
        const restaurants = await Restaurant.find(query).exec();
        res.json(restaurants);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

export default router;
