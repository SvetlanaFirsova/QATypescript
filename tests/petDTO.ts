import { Pet } from './pet';
import { Category } from './Category';
import { Tag } from './Tag';

//DTO Pet class
export class PetDTO implements Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold'; //Status can only be one of these specific values

  constructor(data: Pet) {
    this.id = data.id;
    this.category = data.category;
    this.name = data.name;
    this.photoUrls = data.photoUrls || [];
    this.tags = data.tags;
    this.status = data.status;
  }
}