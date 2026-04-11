// 1. Use regular import (not 'import type') to ensure methods are accessible
import type{ APIRequestContext } from '@playwright/test';

export class ApiClient {
  // Use Playwright's built-in request context
  // The 'private' keyword in the constructor automatically creates 'this.request'
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  /**
   * Universal response handler for Playwright API responses
   */
  private async handleResponse<T>(response: any): Promise<T> {
    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status()} ${response.statusText()} - ${errorText}`);
    }
    
    // Playwright's .json() handles parsing internally
    return await response.json() as T;
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
  public async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, { 
        data: body 
    });
    return this.handleResponse<T>(response);
  }

  /**
   * PUT method
   */
  public async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, { 
        data: body 
    });
    return this.handleResponse<T>(response);
  }

  /**
   * DELETE method
   */
  public async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`);
    if (!response.ok()) {
        throw new Error(`Delete failed: ${response.status()}`);
    }
    return {} as T;
  }
}