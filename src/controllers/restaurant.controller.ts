import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

export const getAllRestaurants = async (
  req: Request,
  res: Response
) => {
  /* #swagger.tags = ['Restaurants']
     #swagger.summary = 'Get all restaurants'
     #swagger.description = 'Retrieve a list of all restaurants'
     #swagger.responses[200] = {description: 'A list of restaurants'}
    #swagger.responses[204] = {description: 'No restaurants found'}
    #swagger.responses[500] = {description: 'Internal server error'}
  */
  try {
    const restaurants = await Restaurant.find({});
    if (restaurants.length > 0) {
      res.send(restaurants).status(200);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const addNewRestaurant = async (
  req: Request,
  res: Response
) => {
  /* #swagger.tags = ['Restaurants']
       #swagger.summary = 'Add a new restaurant'
       #swagger.description = 'Add a new restaurant to the list'
       #swagger.requestBody = {
           description: 'Restaurant object that needs to be added',
           required: true,
           }
       #swagger.responses[201] = {description: 'Restaurant created successfully'}
       #swagger.responses[400] = {description: 'Validation error'}
       #swagger.responses[500] = {description: 'Internal server error'}
    */
  try {
    const restaurant = new Restaurant(req.body);
    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Validation error',
          error: error.message,
        });
      }
      // Handle other types of errors
      res
        .status(500)
        .json({ message: 'Server error', error: error.message });
    } else {
      // Handle unknown error types
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const searchRestaurant = async (
  req: Request,
  res: Response
) => {
  /* #swagger.tags = ['Restaurants']
          #swagger.summary = 'Search for restaurants'
          #swagger.description = 'Search for restaurants based on query parameters'
          #swagger.parameters['query'] = {
              in: 'query',
              required: true,
              type: 'string',
              description: 'Name of the restaurant to search for',
          }
          #swagger.responses[200] = {
              description: 'Returns a list of matching restaurants',
          }
          #swagger.responses[400] = {
              description: 'Search query parameter is required',
          }
          #swagger.responses[404] = {
              description: 'Restaurant not found',
          }
          #swagger.responses[500] = {
              description: 'Internal server error',
          }
       */
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ message: 'Search query parameter is required' });
    }

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: new RegExp(query as string, 'i') } },
        { cuisine: { $regex: new RegExp(query as string, 'i') } },
        { location: { $regex: new RegExp(query as string, 'i') } },
        { cuisineType: { $regex: new RegExp(query as string, 'i') } },
        { priceRange: { $regex: new RegExp(query as string, 'i') } },
        {
          openingHours: { $regex: new RegExp(query as string, 'i') },
        },
        { reviews: { $regex: new RegExp(query as string, 'i') } },
        { phone: { $regex: new RegExp(query as string, 'i') } },
        {
          specialDiets: { $regex: new RegExp(query as string, 'i') },
        },
      ],
    });

    if (restaurants.length > 0) {
      res.send(restaurants).status(200);
    } else {
      return res
        .status(404)
        .json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ message: 'Server error', error: errorMessage });
  }
};
