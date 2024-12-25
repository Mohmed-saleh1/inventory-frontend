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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: any;
  waste: number;
}
