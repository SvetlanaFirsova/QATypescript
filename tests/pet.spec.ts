import { test, expect } from '@playwright/test';
import { ApiResponse } from './apiResponse.js';
import { PetDTO } from './petDTO.js';

test.describe('Petstore API - Pet Operations', () => {
    
    test('Should create a new pet and verify response using ApiResponse class', async ({ request }) => {
        //Create data for a new pet using DTO
        const newPetData = new PetDTO({
            id: Math.floor(Math.random() * 100000), // Generate a random ID
            category: { id: 1, name: "Dogs" },
            name: "Gosha",
            photoUrls: ["https://dogs.com/gosha.jpg"],
            tags: [{ id: 11, name: "happy" }],
            status: "available"
        });

        //Send POST request
        const rawResponse = await request.post(`https://petstore.swagger.io/v2/pet/`, {
            data: newPetData,
            ignoreHTTPSErrors: true
        });

        //Get JSON from the response
        const responseBody = await rawResponse.json();

        //Use the ApiResponse class to process the result
        const petResponse = new ApiResponse<PetDTO>(responseBody, rawResponse.status());

        //Print summary to the console (as required by the assignment)
        petResponse.printSummary();

        //Assertions
        //Verify status using the isSuccess method
        expect(petResponse.isSuccess(), 'Response status should be 2xx').toBeTruthy();
        
        //Verify the status code directly
        expect(petResponse.statusCode).toBe(200);

        //Verify that the data in the response matches what we sent
        if (petResponse.data) {
            expect(petResponse.data.name).toBe(newPetData.name);
            expect(petResponse.data.id).toBe(newPetData.id);
            expect(petResponse.data.status).toBe("available");
        }
    });

    test('Should handle "Pet Not Found" error', async ({ request }) => {
    // Change to a negative ID to force a 404 error on this specific API
    const nonExistentId = -1; 
    
    const rawResponse = await request.get(`https://petstore.swagger.io/v2/pet/${nonExistentId}`);
    const statusCode = rawResponse.status();
    const responseBody = await rawResponse.json().catch(() => null);
    const errorResponse = new ApiResponse<any>(responseBody, statusCode);

    try {
        errorResponse.printSummary();
        throw new Error(`Test failed: printSummary should have thrown an error`);
    } catch (error: any) {
        if (error.message.includes("Test failed")) throw error;
        
        // This will now pass because -1 returns a real error
        expect(errorResponse.isSuccess()).toBe(false);
        expect([404, 400]).toContain(statusCode);
    }
});
});