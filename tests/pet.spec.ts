import { test, expect } from '@playwright/test';
import { ApiResponse } from './apiResponse.js';
import { PetDTO } from './petDTO.js';

//Interface for standard Petstore API errors
interface PetStoreError {
    code: number;
    type: string;
    message: string;
}

test.describe('Petstore API - Pet Operations', () => {
    
    test('Should create a new pet and verify response using ApiResponse class', async ({ request }) => {
        const petId = Math.floor(Math.random() * 100000);
        const newPetData = new PetDTO({
            id: petId,
            category: { id: 1, name: "Dogs" },
            name: "Gosha",
            photoUrls: ["https://dogs.com/gosha.jpg"],
            tags: [{ id: 11, name: "happy" }],
            status: "available"
        });

        const rawResponse = await request.post(`https://petstore.swagger.io/v2/pet/`, {
            data: newPetData,
            ignoreHTTPSErrors: true
        });

        const responseBody = await rawResponse.json();
        const petResponse = new ApiResponse<PetDTO>(responseBody, rawResponse.status());

        //The method now outputs the technical summary of the response
        petResponse.printSummary();

        expect(petResponse.isSuccess(), 'Response status should be 2xx').toBeTruthy();
        expect(petResponse.statusCode).toBe(200);

        if (petResponse.data) {
            expect(petResponse.data.name).toBe(newPetData.name);
            expect(petResponse.data.id).toBe(newPetData.id);
            //Additional business check for "garbage" characters in the name (if needed)
            expect(petResponse.data.name).not.toContain('%00');
        }
    });

    test('Should handle "Pet Not Found" error', async ({ request }) => {
        const nonExistentId = -1; 
        
        const rawResponse = await request.get(`https://petstore.swagger.io/v2/pet/${nonExistentId}`);
        const statusCode = rawResponse.status();
        const responseBody = await rawResponse.json().catch(() => null);
        
        //Use the error interface for typing the response
        const errorResponse = new ApiResponse<PetStoreError>(responseBody, statusCode);

        try {
            //Since we passed a 404, printSummary() will now THROW an error
            //because isSuccess() returns false (technical failure)
            errorResponse.printSummary();
            throw new Error(`Test failed: printSummary should have thrown an error`);
        } catch (error: any) {
            //If this is our own "Test failed" error, re-throw it
            if (error.message.includes("Test failed")) throw error;
            
            console.log("Caught expected technical error:", error.message);
            
            //Technical check: status is not 2xx
            expect(errorResponse.isSuccess()).toBe(false);
            expect([400, 404]).toContain(statusCode);

            //Business check: verify the error message from the server
            if (errorResponse.data) {
                expect(errorResponse.data.message).toBe('Pet not found');
            }
        }
    });
});