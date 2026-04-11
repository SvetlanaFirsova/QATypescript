// tests/petstore-crud.spec.ts
import { test, expect } from '@playwright/test';
import { ApiClient } from './apiClient';
import { PetStoreClient } from './petStoreClient';
import { PetDTO } from './petDTO';

test('Homework 6 - PetStore CRUD Flow', async ({ request }) => {
  const apiClient = new ApiClient(request, 'https://petstore.swagger.io/v2');
  const petStore = new PetStoreClient(apiClient);
  
  // Використовуємо велике випадкове число
  const petId = Math.floor(Math.random() * 900000) + 100000;
  const myPet = new PetDTO({
    id: petId,
    name: 'Fluffy',
    status: 'available',
    photoUrls: ['https://example.com/photo.jpg']
  });

  //CREATE
  console.log('--- Creating Pet ---');
  const createdPet = await petStore.createPet(myPet);
  
  //Use id that was returne by server
  const actualId = createdPet.id || petId; 

  //READ (з невеликою затримкою 1 сек)
  console.log('--- Reading Pet ---');
  await new Promise(res => setTimeout(res, 1000)); 
  
  const fetchedPet = await petStore.getPetById(actualId);
  expect(fetchedPet.id).toBe(actualId);
  expect(fetchedPet.name).toBe('Fluffy');

  //UPDATE
  console.log('--- Updating Pet ---');
  createdPet.name = 'Fluffy The Great';
  const updatedPet = await petStore.updatePet(createdPet);
  expect(updatedPet.name).toBe('Fluffy The Great');

  //DELETE
  console.log('--- Deleting Pet ---');
  await petStore.deletePet(actualId);

  // 5.VERIFY DELETION
  console.log('--- Verifying Deletion ---');
  
  let isDeleted = false;
  // Спробуємо 5 разів з інтервалом в 1 секунду дочекатися зникнення
  for (let i = 0; i < 5; i++) {
    try {
      await apiClient.get(`/pet/${actualId}`);
      console.log(`Attempt ${i + 1}: Pet still exists, waiting...`);
      await new Promise(res => setTimeout(res, 1000));
    } catch (error: any) {
      if (error.message.includes('404')) {
        isDeleted = true;
        break; 
      }
    }
  }

  expect(isDeleted).toBe(true);
  console.log('Success: Pet is officially gone.');
  
});