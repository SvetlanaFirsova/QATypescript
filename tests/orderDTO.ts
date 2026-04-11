import type { Order } from './order.js';

//DTO Order class
export class OrderDTO implements Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;

  constructor(data: Order) {
    if ('id' in data) this.id = data.id;
    if ('petId' in data) this.petId = data.petId;
    if ('quantity' in data) this.quantity = data.quantity;
    if ('shipDate' in data) this.shipDate = data.shipDate;
    if ('status' in data) this.status = data.status;
    if ('complete' in data) this.complete = data.complete ?? false;
  }
}