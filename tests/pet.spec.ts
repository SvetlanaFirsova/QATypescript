import { test, expect } from '@playwright/test';
import { ApiResponse } from '../homework3and4and5/apiresponse';
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
        //Try to get a pet using a non-existent ID
        const nonExistentId = 999999999;
        
        // IMPORTANT: Use only backticks ` ` (the key below Esc) for string interpolation
        const rawResponse = await request.get(`https://petstore.swagger.io/v2/pet/${nonExistentId}`, {
        // Add SSL certificate error ignoring directly to the request:
        ignoreHTTPSErrors: true});

        //Use ApiResponse even for error handling
        const errorResponse = new ApiResponse<any>(null, rawResponse.status());
        
        //Print the error summary to the console
        errorResponse.printSummary();

        //Verify that the request was NOT successful
        expect(errorResponse.isSuccess()).toBeFalsy();
        expect(errorResponse.statusCode).toBe(404);
    });
});