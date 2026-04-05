import { Pet } from '../homework3and4and5/pet';
import { Category } from '../homework3and4and5/category';
import { Tag } from '../homework3and4and5/tag';

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