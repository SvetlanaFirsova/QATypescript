import { test } from '@playwright/test';
import { PetDTO } from './petDTO';
import { OrderDTO } from './orderDTO';
import { fetchData } from './fetchData';

test('Homework_5 - Async Simulation', async () => {
  //--- PET ---
  const myDog = new PetDTO({ id: 28, name: "Gosha", photoUrls: [] });

  try {
    console.log("--- Testing Pet Fetch ---");
    const resultPet = await fetchData<PetDTO>(myDog);
    console.log("Success! Received Pet:", resultPet.name); 
    console.log("Success! Received Pet ID:", resultPet.id);
    console.log("Success! Received Photo Urls:", resultPet.photoUrls); 
    console.log("Success! Received Category:", resultPet.category); 
    console.log("Success! Received Status:", resultPet.status);
    console.log("Success! Received Tags:", resultPet.tags);
  } catch (error: any) {
    console.error("Failed to fetch Pet:", error.message);
  }

  //--- Order ---
  const myOrder = { id: 400, petId: 28, quantity: 9, complete: true };

  try {
    console.log("\n--- Testing Order Fetch ---");
    const resultOrder = await fetchData<OrderDTO>(myOrder);
    console.log("Success! Received Order ID:", resultOrder.id); 
    console.log("Success! Received Pet ID:", resultOrder.petId); 
    console.log("Success! Received Quantity:", resultOrder.quantity); 
    console.log("Success! Received Ship Date:", resultOrder.shipDate); 
    console.log("Success! Received Complete:", resultOrder.complete); 
    console.log("Success! Received Status:", resultOrder.status);
  } catch (error: any) {
    console.error("Failed to fetch Order:", error.message);
  }
});