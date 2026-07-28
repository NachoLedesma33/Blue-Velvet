import { ArrowDown, Star, MapPin } from 'lucide-react';

function scrollToProducts(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const waGeneral = encodeURIComponent(
    'Hola! Me contacto desde la web de *Blue Velvet Pastry House*.\n\nMe gustaría consultar la disponibilidad y realizar un pedido.\n\nDesde ya, muchas gracias.'
  );

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/Blue-velvet-background.jpg"
          alt="Blue Velvet Pastry House"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-800/70 to-navy-900/90" />
      </div>

      {/* Organic blob decorations */}
      <div className="absolute top-24 right-4 sm:right-10 w-32 h-32 sm:w-64 sm:h-64 bg-silver-300/10 blob opacity-50 pointer-events-none" />
      <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-10 w-24 h-24 sm:w-48 sm:h-48 bg-cream-300/10 blob opacity-40 pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <MapPin className="w-3.5 h-3.5 text-cream-300" />
            <span className="text-white text-xs font-body font-medium tracking-wide">Alta Gracia, Córdoba</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] mb-6 text-balance">
            Hacemos más <span className="italic text-cream-300">dulces</span> tus días
          </h1>

          <p className="text-silver-200 text-lg font-body leading-relaxed mb-10 max-w-xl">
            Bienvenidos a Blue Velvet — pastelería clásica, tortas personalizadas y postres artesanales elaborados con amor. Cada pedido es único, diseñado especialmente para vos.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#productos"
              onClick={scrollToProducts}
              className="inline-flex items-center gap-2 bg-white text-navy-800 px-7 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-cream-100 hover:shadow-lg hover:-translate-y-0.5"
            >
              Ver productos
            </a>
            <a
              href={`https://wa.me/5493547650627?text=${waGeneral}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5"
            >
              Consultar pedido
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: '100%', label: 'Artesanal' },
              { value: 'Personalizado', label: 'Cada pedido' },
              { value: 'Con amor', label: 'Hecho a medida' },
            ].map(stat => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-xl font-semibold text-cream-300">{stat.value}</div>
                <div className="text-silver-400 text-xs font-body tracking-wide mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
        <button
          onClick={scrollToProducts}
          className="pointer-events-auto flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white/70 px-6 py-3 rounded-full font-body text-xs tracking-widest uppercase hover:bg-white/25 hover:text-white transition-all duration-300 animate-pulse"
        >
          Explorar
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Stars decoration */}
      <div className="absolute top-32 right-20 hidden lg:flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 text-cream-300/60 fill-cream-300/60" />
        ))}
      </div>
    </section>
  );
}
