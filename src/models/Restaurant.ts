import mongoose, { Document, Schema, model } from 'mongoose';

interface IRestaurant extends Document {
    name: string;
    cuisineType: string;
    specialDiets: string[];
    location: string;
    contact: {
        phone: string;
        website: string;
    };
    rating: {
        food: number;
        service: number;
        value: number;
    };
    reviews: string[];
    priceRange: string;
    menu: string[];
    logoUrl: string;
    openingHours: string;
    specialDishes: string[];
}

const RestaurantSchema: Schema = new Schema({
    name: { type: String, required: true },
    cuisineType: { type: String, required: false },
    specialDiets: { type: [String], required: false },
    location: { type: String, required: false },
    contact: {
        phone: { type: String, required: false },
        website: { type: String, required: false },
    },
    rating: {
        food: { type: Number, required: false },
        service: { type: Number, required: false },
        value: { type: Number, required: false },
    },
    reviews: { type: [String], required: false },
    priceRange: { type: String, required: false },
    menu: { type: [String], required: false },
    logoUrl: { type: String, required: false },
    openingHours: { type: String, required: false },
    specialDishes: { type: [String], required: false },
});

export default model<IRestaurant>('Restaurant', RestaurantSchema);