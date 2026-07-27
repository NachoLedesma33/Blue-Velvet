import { CheckCircle, XCircle, Star, List } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const categoryLabels: Record<string, string> = {
  torta: 'Torta',
  tarta: 'Tarta',
  postre: 'Postre',
  cupcake: 'Cupcake',
  otro: 'Especial',
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const mainImage = product.images?.[0] || 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600';
  const basePrice = product.price;
  const includedToppings = product.toppings.filter(t => t.included);

  return (
    <article
      onClick={onClick}
      className="card-organic cursor-pointer group bg-white"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`Ver detalles de ${product.name}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56 sm:h-64 bg-silver-100">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="badge bg-white/90 backdrop-blur-sm text-navy-700 text-[10px] tracking-wide">
            {categoryLabels[product.category] || product.category}
          </span>
          {product.featured && (
            <span className="badge bg-cream-400/90 text-navy-800 text-[10px] gap-0.5">
              <Star className="w-2.5 h-2.5 fill-navy-800" />
              Destacado
            </span>
          )}
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          {product.available && product.stock > 0 ? (
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-medium px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Disponible
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-red-500 text-[10px] font-medium px-2 py-1 rounded-full">
              <XCircle className="w-3 h-3" />
              Sin stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-navy-800 mb-1.5 group-hover:text-navy-600 transition-colors leading-snug">
          {product.name}
        </h3>

        {product.short_description && (
          <p className="text-silver-600 text-sm font-body leading-relaxed line-clamp-2 mb-3">
            {product.short_description}
          </p>
        )}

        {/* Included toppings preview */}
        {includedToppings.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-body font-medium text-silver-400 uppercase tracking-wider mb-1.5">Incluye</p>
            <div className="flex flex-wrap gap-1">
              {includedToppings.slice(0, 3).map((t, i) => (
                <span key={i} className="text-[10px] bg-cream-100 text-navy-700 px-2 py-0.5 rounded-full font-body">
                  {t.name}
                </span>
              ))}
              {includedToppings.length > 3 && (
                <span className="text-[10px] text-silver-400 px-1 py-0.5 font-body">
                  +{includedToppings.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Options preview */}
        {product.options?.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-body font-medium text-silver-400 uppercase tracking-wider mb-1.5">Opciones</p>
            <div className="flex flex-wrap gap-1">
              {product.options.map((opt, i) => (
                <span key={i} className="flex items-center gap-1 text-[10px] bg-navy-50 text-navy-700 px-2 py-0.5 rounded-full font-body">
                  <List className="w-2.5 h-2.5" />
                  {opt.label}: {opt.values.join(' / ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-silver-100">
          <div>
            <div className="font-display text-xl font-semibold text-navy-800">
              ${basePrice.toLocaleString('es-AR')}
            </div>
            <div className="text-[10px] text-silver-400 font-body">Precio base</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-navy-700 text-xs font-body font-medium bg-navy-50 px-3 py-1.5 rounded-full group-hover:bg-navy-800 group-hover:text-white transition-colors">
              Ver más →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
