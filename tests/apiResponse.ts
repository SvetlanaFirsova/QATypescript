
export class ApiResponse<T> {
//Public fields to allow direct access when needed
  public data: T;
  public statusCode: number;

  constructor(data: T, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }

  /**
   * Checks if the response code is within the 2xx range and not null.
   * Public because this is frequently used in test assertions.
   */
  public isSuccess(): boolean {
  //Check if the status code is within the successful range (200-299)
  const isGoodStatus = this.statusCode >= 200 && this.statusCode < 300;

  //Access data as 'any' to prevent TypeScript compilation errors for dynamic properties
  const data = this.data as any;

  //Determine if the data is corrupted or indicates a failure 
  //(e.g., null body, garbage characters like '%00', or specific error messages)
  const isDataCorrupted = !data || 
                          (typeof data.name === 'string' && data.name.includes('%00')) ||
                          (data.message === 'Pet not found');

  // Success is only confirmed if the status is good AND the data is valid (not corrupted)
  return isGoodStatus && !isDataCorrupted;
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
 * Prints the summary to the console and returns the data.
 * Throws an error if the operation was not successful.
 * @returns {T} The response data.
 */
public printSummary(): T {
  if (this.isSuccess()) {
    console.log(`Success (${this.getStatusMessage()}):`, JSON.stringify(this.data, null, 2));
    return this.data; 
  } else {
    const errorMessage = `Error (${this.getStatusMessage()}): Operation failed.`;
    throw new Error(errorMessage);
  }
}

  /**
   * Static method to quickly create a successful response.
   */
  public static ok<U>(data: U): ApiResponse<U> {
    return new ApiResponse(data, 200);
  }
}