import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, XCircle, Package, Star, MessageCircle, Plus, List } from 'lucide-react';
import type { Product } from '@/types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  torta: 'Torta', tarta: 'Tarta', postre: 'Postre', cupcake: 'Cupcake', otro: 'Especial',
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const images = product.images?.length ? product.images : [
    'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const extras = product.toppings.filter(t => !t.included && t.extra_price > 0);
  const included = product.toppings.filter(t => t.included);

  const waMessage = encodeURIComponent(
    `Hola! Me contacto desde la web de *Blue Velvet Pastry House*.\n\nMe gustaría consultar disponibilidad y hacer un pedido de:\n➤ *${product.name}*\n\nDesde ya, muchas gracias.`
  );

  const nextImage = () => setImageIndex(i => (i + 1) % images.length);
  const prevImage = () => setImageIndex(i => (i - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center modal-backdrop bg-navy-900/60"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-4xl sm:mx-4 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-slide-up max-h-[95vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-silver-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="badge bg-cream-100 text-navy-700 text-xs">{categoryLabels[product.category]}</span>
            {product.featured && (
              <span className="badge bg-cream-300 text-navy-800 text-xs gap-1">
                <Star className="w-3 h-3 fill-navy-800" />Destacado
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-silver-100 hover:bg-silver-200 flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 text-navy-700" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto scrollbar-hide flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery */}
            <div className="relative bg-silver-50">
              <div className="relative h-72 md:h-full min-h-72 overflow-hidden flex items-center justify-center bg-silver-50">
                <img
                  src={images[imageIndex]}
                  alt={`${product.name} — imagen ${imageIndex + 1}`}
                  className="max-w-full max-h-full object-contain transition-all duration-500"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-navy-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-navy-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === imageIndex ? 'border-navy-700 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 space-y-5">
              {/* Title & availability */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy-800 leading-snug mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  {product.available && product.stock > 0 ? (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-body font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />Disponible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 text-xs font-body font-medium">
                      <XCircle className="w-3.5 h-3.5" />Sin stock
                    </span>
                  )}
                  {product.stock > 0 && (
                    <span className="flex items-center gap-1 text-silver-400 text-xs font-body">
                      <Package className="w-3 h-3" />
                      {product.stock} unidades
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-silver-600 text-sm font-body leading-relaxed">{product.description}</p>
              )}

              {/* Price */}
              <div className="bg-cream-50 rounded-2xl p-4">
                <p className="text-xs font-body font-medium text-silver-400 uppercase tracking-wider mb-1">Precio base</p>
                <p className="font-display text-3xl font-semibold text-navy-800">
                  ${product.price.toLocaleString('es-AR')}
                  <span className="text-sm font-body font-normal text-silver-400 ml-2">ARS</span>
                </p>
              </div>

              {/* Included components */}
              {included.length > 0 && (
                <div>
                  <p className="text-xs font-body font-medium text-silver-400 uppercase tracking-wider mb-2">Incluye</p>
                  <div className="space-y-1.5">
                    {included.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-body text-navy-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional extras */}
              {extras.length > 0 && (
                <div>
                  <p className="text-xs font-body font-medium text-silver-400 uppercase tracking-wider mb-2">Podés agregar</p>
                  <div className="space-y-1.5">
                    {extras.map((t, i) => (
                      <div key={i} className="flex items-center justify-between text-sm font-body">
                        <span className="flex items-center gap-2 text-navy-600">
                          <Plus className="w-3.5 h-3.5 text-silver-400 shrink-0" />
                          {t.name}
                        </span>
                        <span className="text-navy-800 font-medium bg-cream-100 px-2 py-0.5 rounded-full text-xs">
                          +${t.extra_price.toLocaleString('es-AR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Options */}
              {product.options?.length > 0 && (
                <div>
                  <p className="text-xs font-body font-medium text-silver-400 uppercase tracking-wider mb-2">Elegí tu versión</p>
                  <div className="space-y-2">
                    {product.options.map((opt, i) => (
                      <div key={i}>
                        <p className="text-sm font-body font-medium text-navy-700 mb-1">{opt.label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {opt.values.map((v, j) => (
                            <span key={j} className="flex items-center gap-1.5 text-sm font-body text-navy-600 bg-cream-50 border border-cream-200 px-3 py-1.5 rounded-full">
                              <List className="w-3 h-3 text-silver-400 shrink-0" />
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-silver-100 text-silver-500 px-2 py-0.5 rounded-full font-body capitalize">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/5493547650627?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-2xl font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar por WhatsApp
              </a>

              <p className="text-center text-silver-400 text-[10px] font-body leading-relaxed">
                Los precios pueden variar según personalización. Consultá por opciones y disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
