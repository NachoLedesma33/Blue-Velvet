import { Instagram, Heart, MapPin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-navy-900 text-white">
      {/* Main footer */}
      <div className="container-wide section-padding pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">Blue Velvet</h3>
              <p className="text-silver-400 text-[10px] tracking-[0.25em] uppercase mt-0.5 font-body">Pastry House</p>
            </div>
            <p className="text-silver-300 text-sm font-body leading-relaxed">
              El lugar para hacer más dulce tus días. Pastelería clásica, tortas personalizadas y postres artesanales elaborados con amor en Alta Gracia.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/bluevelvet.pastry/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-silver-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://wa.me/5493541000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group"
                aria-label="WhatsApp"
              >
                {/* WhatsApp icon inline */}
                <svg className="w-4 h-4 text-silver-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <h4 className="font-display text-lg font-semibold text-white">Información</h4>
            <ul className="space-y-3 font-body text-sm text-silver-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-silver-500 shrink-0 mt-0.5" />
                <span>Alta Gracia, Córdoba, Argentina</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-silver-500 shrink-0 mt-0.5" />
                <span>Consultas y pedidos por DM en Instagram o WhatsApp</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-silver-500 shrink-0" />
                <span>Elaboración artesanal con ingredientes seleccionados</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-5">
            <h4 className="font-display text-lg font-semibold text-white">Nuestros Productos</h4>
            <ul className="space-y-2 font-body text-sm text-silver-300">
              {['Tortas personalizadas', 'Tortas clásicas', 'Tartas', 'Postres', 'Cupcakes artesanales'].map(item => (
                <li key={item}>
                  <a href="#productos" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="border-t border-white/10">
        <div className="container-wide section-padding py-4">
          <div className="flex items-start gap-2.5 bg-white/5 rounded-xl p-3.5 mb-4">
            <ShieldCheck className="w-4 h-4 text-silver-400 shrink-0 mt-0.5" />
            <p className="text-silver-400 text-xs font-body leading-relaxed">
              <span className="text-silver-300 font-medium">Aviso de seguridad:</span> Los pedidos se gestionan únicamente a través de WhatsApp o Instagram DM. Blue Velvet Pastry House nunca solicita datos bancarios ni contraseñas. Verifica siempre que estés hablando con el canal oficial antes de realizar pagos. Ante cualquier duda, contáctanos a través de los canales verificados en esta página.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-silver-500 text-xs font-body">
            <p>© {year} Blue Velvet Pastry House. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
