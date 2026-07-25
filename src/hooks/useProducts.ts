import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, ProductFormData } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProducts((data as Product[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function createProduct(data: ProductFormData): Promise<void> {
    const { error } = await supabase.from('products').insert(data);
    if (error) throw new Error(error.message);
    await fetchProducts();
  }

  async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<void> {
    const { error } = await supabase.from('products').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    await fetchProducts();
  }

  async function deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
    await fetchProducts();
  }

  async function toggleAvailability(id: string, available: boolean): Promise<void> {
    await updateProduct(id, { available });
  }

  return { products, loading, error, createProduct, updateProduct, deleteProduct, toggleAvailability, refetch: fetchProducts };
}
