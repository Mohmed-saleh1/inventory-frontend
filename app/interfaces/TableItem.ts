export interface TableItem {
  _id: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string | null;
  available: number;
  sales: number;
  waste: number;
}
