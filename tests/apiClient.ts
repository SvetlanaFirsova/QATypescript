import type{ APIRequestContext, APIResponse } from '@playwright/test';

export interface ApiResponse {
  code: number;
  type: string;
  message: string;
}

export class ApiClient {
  //Use Playwright's built-in request context
  //The 'private' keyword in the constructor automatically creates 'this.request'
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  /**
   * Universal response handler for Playwright API responses
   */
  private async handleResponse<T>(response: APIResponse): Promise<T> {
    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status()} ${response.statusText()} - ${errorText}`);
    }

    const text = await response.text();
    // Playwright's .json() handles parsing internally
    return text ? (JSON.parse(text) as T) : ({} as any);
  }

  /**
   * GET method
   */
  public async get<T>(endpoint: string): Promise<T> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`);
    return this.handleResponse<T>(response);
  }

  /**
   * POST method
   */
  public async post<T>(endpoint: string, body: APIResponse): Promise<T> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, { 
        data: body 
    });
    return this.handleResponse<T>(response);
  }

  /**
   * PUT method
   */
  public async put<T>(endpoint: string, body: APIResponse): Promise<T> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, { 
        data: body 
    });
    return this.handleResponse<T>(response);
  }

  /**
   * DELETE method
   */
  public async delete(endpoint: string): Promise<ApiResponse> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`);
    return this.handleResponse<ApiResponse>(response);
  }
}