export interface CategoryType {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[]; // Debería ser un arreglo de strings en vez de string con JSON
  creationAt?: string;
  updatedAt?: string;
  category: CategoryType;
}
