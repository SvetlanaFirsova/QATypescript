import { Order } from './order';

//DTO Order class
export class OrderDTO implements Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;

  constructor(data: Order) {
    this.id = data.id;
    this.petId = data.petId;
    this.quantity = data.quantity;
    this.shipDate = data.shipDate;
    this.status = data.status;
    this.complete = data.complete ?? false;
  }
}