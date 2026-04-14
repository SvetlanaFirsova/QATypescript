import type { Pet } from './pet.js';
import type { Category } from './category.js';
import type { Tag } from './tag.js';

//DTO Pet class
export class PetDTO implements Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold'; //Status can only be one of these specific values

  constructor(data: Pet) {
    //Check if property exists in data before assigning to avoid 'undefined'
    if ('id' in data) this.id = data.id;
    if ('category' in data) this.category = data.category;
    
    this.name = data.name;
    this.photoUrls = data.photoUrls || [];
    
    if ('tags' in data) this.tags = data.tags;
    if ('status' in data) this.status = data.status;
  }
}