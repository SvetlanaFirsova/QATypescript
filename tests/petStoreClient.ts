import { ApiClient } from './apiClient';
import { PetDTO } from './petDTO';
import type { Pet } from './pet';

export class PetStoreClient {
  constructor(private api: ApiClient) {}

  //Retry getting Pet`s id
  async getPetById(id: number): Promise<PetDTO> {
  console.log(`[PetStoreClient] Fetching pet by ID: ${id}`);
  
  let attempts = 0;
  while (attempts < 3) {
    try {
      const data = await this.api.get<Pet>(`/pet/${id}`);
      return new PetDTO(data);
    } catch (error: any) {
      if (error.message.includes('404') && attempts < 2) {
        attempts++;
        console.log(`[PetStoreClient] Pet not found yet. Retrying in 1s... (Attempt ${attempts})`);
        await new Promise(res => setTimeout(res, 1000));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Pet not found after multiple attempts');
}

  async createPet(pet: PetDTO): Promise<PetDTO> {
    console.log(`[PetStoreClient] Creating pet with ID: ${pet.id}`);
    const data = await this.api.post<Pet>('/pet', pet);
    console.log(`[PetStoreClient] Server confirmed creation. Received ID from server: ${data.id}`);
    return new PetDTO(data);
  }

  async updatePet(pet: PetDTO): Promise<PetDTO> {
    console.log(`[PetStoreClient] Updating pet ID: ${pet.id}`);
    const data = await this.api.put<Pet>('/pet', pet);
    return new PetDTO(data);
  }

  async deletePet(id: number): Promise<void> {
    console.log(`[PetStoreClient] Deleting pet ID: ${id}`);
    await this.api.delete(`/pet/${id}`);
  }
}