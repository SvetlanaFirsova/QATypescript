export class ApiResponse<T> {
  public data: T;
  public statusCode: number;

  constructor(data: T, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }

  /**
   * Pure technical check: 
   * Is the status code in the 2xx range and is there any data?
   */
  public isSuccess(): boolean {
    const isGoodStatus = this.statusCode >= 200 && this.statusCode < 300;
    
    //We only check if data exists. 
    //We don't check for "Pet not found" here anymore.
    return isGoodStatus && this.data !== null && this.data !== undefined;
  }

  private getStatusMessage(): string {
    const messages: Record<number, string> = {
      200: "OK",
      201: "Created",
      204: "No Content",
      400: "Bad Request",
      401: "Unauthorized",
      404: "Not Found",
      500: "Internal Server Error"
    };
    return messages[this.statusCode] || `Status Code: ${this.statusCode}`;
  }

  public printSummary(): T {
    if (this.isSuccess()) {
      console.log(`Success (${this.getStatusMessage()}):`, JSON.stringify(this.data, null, 2));
      return this.data as T; 
    } else {
      //If failed, we log the status and the error body if it exists
      const details = this.data ? JSON.stringify(this.data) : "No details";
      const errorMessage = `Error (${this.getStatusMessage()}): Operation failed. Details: ${details}`;
      throw new Error(errorMessage);
    }
  }

  public static ok<U>(data: U): ApiResponse<U> {
    return new ApiResponse(data, 200);
  }
}