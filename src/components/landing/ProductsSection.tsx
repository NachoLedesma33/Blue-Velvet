import { useState } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/landing/ProductCard';
import ProductModal from '@/components/landing/ProductModal';
import { Cake } from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
}

export default function ProductsSection({ products, loading }: ProductsSectionProps) {
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = products;

  return (
    <section id="productos" className="py-16 sm:py-24 bg-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-cream-100 rounded-full px-4 py-2 mb-5">
            <Cake className="w-4 h-4 text-navy-700" />
            <span className="text-navy-700 text-xs font-body font-medium tracking-wide">Nuestros Productos</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy-800 mb-4 text-balance">
            Creaciones con <span className="italic">alma</span>
          </h2>
          <p className="text-silver-500 font-body text-base max-w-xl mx-auto leading-relaxed">
            Cada torta cuenta una historia. Explorá nuestra carta y consultanos para diseñar el pedido perfecto para tu ocasión.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-organic animate-pulse">
                <div className="h-56 bg-silver-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-silver-100 rounded-full w-3/4" />
                  <div className="h-4 bg-silver-100 rounded-full w-full" />
                  <div className="h-4 bg-silver-100 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Cake className="w-12 h-12 text-silver-200 mx-auto mb-3" />
            <p className="font-display text-lg text-silver-400">No hay productos en esta categoría por ahora.</p>
            <p className="text-silver-300 text-sm font-body mt-1">Consultanos por encargos especiales.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => setSelected(product)} />
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
