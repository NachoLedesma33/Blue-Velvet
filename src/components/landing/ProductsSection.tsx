import { useState } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/landing/ProductCard';
import ProductModal from '@/components/landing/ProductModal';
import { Cake, SlidersHorizontal } from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
}

const categoryFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'torta', label: 'Tortas' },
  { value: 'tarta', label: 'Tartas' },
  { value: 'postre', label: 'Postres' },
  { value: 'cupcake', label: 'Cupcakes' },
];

export default function ProductsSection({ products, loading }: ProductsSectionProps) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (showAvailableOnly && (!p.available || p.stock === 0)) return false;
    return true;
  });

  return (
    <section id="productos" className="py-24 bg-white">
      <div className="container-wide section-padding">
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

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveCategory(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeCategory === f.value
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'bg-silver-100 text-silver-600 hover:bg-silver-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
              showAvailableOnly
                ? 'bg-emerald-600 text-white'
                : 'bg-silver-100 text-silver-600 hover:bg-silver-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Solo disponibles
          </button>
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

        {/* Bottom CTA */}
        <div className="text-center mt-16 py-12 bg-cream-50 rounded-3xl">
          <h3 className="font-display text-2xl font-semibold text-navy-800 mb-2">
            ¿Buscás algo especial?
          </h3>
          <p className="text-silver-500 font-body text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Diseñamos tu pedido ideal. Escribinos por DM en Instagram o por WhatsApp y lo creamos juntas.
          </p>
          <a
            href="https://wa.me/5493541000000?text=Hola!%20Me%20gustar%C3%ADa%20consultar%20por%20una%20torta%20personalizada%20%F0%9F%92%99"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Consultar pedido personalizado
          </a>
        </div>
      </div>

      {/* Modal */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
