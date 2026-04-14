import type { Order } from './order.js';

//DTO Order class
export class OrderDTO implements Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete: boolean = false; //Set default value directly

  constructor(data: Partial<Order>) {
    /**
     * Object.assign copies all enumerable own properties from 
     * the 'data' object to 'this' (the class instance).
     * This eliminates the need for manual 'if' checks for every field.
     */
    Object.assign(this, data);

    //If 'complete' wasn't provided in data, it stays 'false' as defined above
  }
}