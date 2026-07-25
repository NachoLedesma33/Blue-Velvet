import { useState, useCallback } from 'react';
import type { Product, ProductFormData } from '@/types';
import { initialProducts } from '@/data/products';

const STORAGE_KEY = 'bluevelvet_products';

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return initialProducts;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const persist = useCallback((updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
  }, []);

  async function createProduct(data: ProductFormData): Promise<void> {
    const newProduct: Product = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    persist([newProduct, ...products]);
  }

  async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<void> {
    const updated = products.map(p =>
      p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p
    );
    persist(updated);
  }

  async function deleteProduct(id: string): Promise<void> {
    persist(products.filter(p => p.id !== id));
  }

  async function toggleAvailability(id: string, available: boolean): Promise<void> {
    await updateProduct(id, { available });
  }

  return { products, loading, error, createProduct, updateProduct, deleteProduct, toggleAvailability, refetch: () => {} };
}
