import { test, expect } from '@playwright/test';
import { ApiResponse } from './apiResponse';
import { PetDTO } from './petDTO';

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
    // 1. Declare a constant for the non-existent ID
    const nonExistentId = 999999999;
    
    const rawResponse = await request.get(`https://petstore.swagger.io/v2/pet/${nonExistentId}`, {
        ignoreHTTPSErrors: true
    });

    const errorResponse = new ApiResponse<any>(null, rawResponse.status());
    
    try {
        // Use the method that is now expected to throw an Error for non-success statuses
        errorResponse.printSummary();
        
        // Ensure the test fails if no error was thrown by printSummary
        throw new Error("Test failed: printSummary should have thrown an error for a 404/200 null response");
        
    } catch (error: any) {
        // Verify that the error was caught as expected
        console.log("Caught expected error:", error.message);
        
        // Assert that the request was not successful
        expect(errorResponse.isSuccess()).toBeFalsy();
        
        // If the server returns 200 for this specific request, we assert 200.
        // Adjust to 404 if the API behavior is corrected in the future.
        expect(errorResponse.statusCode).toBe(404); 
    }
});
});