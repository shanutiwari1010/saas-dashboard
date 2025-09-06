export interface TopSellingProduct {
  id: string;
  name: string;
  price: number;
  amount: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
