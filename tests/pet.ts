import { Category } from './Category';
import { Tag } from './Tag';

// Main interface for the Pet entity
export interface Pet {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    status?: 'available' | 'pending' | 'sold'; //Status can only be one of these specific values
}

const myPet: Pet = {
    id: 22,
    category: { id: 1, name: "Dogs" },
    name: "Gosha",
    photoUrls: ["https://dogs.com"],
    tags: [{ id: 11, name: "happy" }],
    status: "available"
};