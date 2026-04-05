import { test, expect } from '@playwright/test';
import { PetDTO } from '../tests/petDTO';

//Base interface for all entities (optional, for better flexibility)
interface BaseEntity {
  id?: number;
}

export class ApiResponse<T extends BaseEntity> {
//Public fields to allow direct access when needed
  public data: T | null;
  public statusCode: number;

  constructor(data: T | null, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }

  /**
   * Checks if the response code is within the 2xx range.
   * Public because this is frequently used in test assertions.
   */
  public isSuccess(): boolean {
    return this.statusCode >= 200 && this.statusCode < 300;
  }

  /**
   * Returns a text message based on the status code.
   * Private as it is a helper method for internal use (e.g., logging).
   */
  private getStatusMessage(): string {
    switch (this.statusCode) {
      case 200: return "OK";
      case 201: return "Created";
      case 400: return "Bad Request";
      case 404: return "Not Found";
      case 500: return "Internal Server Error";
      default: return `Status Code: ${this.statusCode}`;
    }
  }

  /**
   * Prints the summary to the console.
   * Public method for quick debugging.
   */
  public printSummary(): void {
    if (this.isSuccess()) {
      console.log(`Success (${this.getStatusMessage()}):`, JSON.stringify(this.data, null, 2));
    } else {
      console.error(`Error (${this.getStatusMessage()}): Operation failed.`);
    }
  }

  /**
   * Static method to quickly create a successful response.
   */
  public static ok<U extends BaseEntity>(data: U): ApiResponse<U> {
    return new ApiResponse(data, 200);
  }
}