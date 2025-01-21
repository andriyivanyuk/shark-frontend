export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imagePath?: string;
  customFields?: { [key: string]: string | number };
}
