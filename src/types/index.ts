export interface Topping {
  name: string;
  included: boolean;
  extra_price: number;
}

export interface ProductOption {
  label: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  short_description: string | null;
  description: string | null;
  price: number;
  stock: number;
  available: boolean;
  category: 'torta' | 'tarta' | 'postre' | 'cupcake' | 'otro';
  images: string[];
  toppings: Topping[];
  options: ProductOption[];
  tags: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

export interface Profile {
  id: string;
  name: string | null;
  role: 'super_admin' | 'admin' | 'viewer';
  created_at: string;
}
