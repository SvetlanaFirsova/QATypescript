interface Order {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
}

const order: Order = {
    id: 1,
    petId: 22,
    quantity: 1,
    shipDate: "2026-03-29T14:15:31.583Z",
    status: "placed",
    complete: true
};