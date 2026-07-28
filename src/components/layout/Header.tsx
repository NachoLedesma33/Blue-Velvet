import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Nuestros Productos', href: '#productos' },
    { label: 'Personalizadas', href: '#personalizadas' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-silver-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${scrolled ? 'bg-navy-800' : 'bg-white/20 backdrop-blur-sm'}`}>
              <ShoppingBag className={`w-4 h-4 ${scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <div className={`font-display font-bold text-lg leading-none tracking-wide transition-colors duration-300 ${scrolled ? 'text-navy-800' : 'text-white'}`}>
                Blue Velvet
              </div>
              <div className={`text-[9px] tracking-[0.2em] uppercase font-body font-medium transition-colors duration-300 ${scrolled ? 'text-silver-500' : 'text-silver-200'}`}>
                Pastry House
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${scrolled ? 'text-navy-700' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
                  href={`https://wa.me/5493547650627?text=${encodeURIComponent('Hola! Me contacto desde la web de *Blue Velvet Pastry House*.\n\nMe gustaría consultar la disponibilidad y realizar un pedido.\n\nDesde ya, muchas gracias.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-navy-800 text-white hover:bg-navy-700'
                  : 'bg-white text-navy-800 hover:bg-white/90'
              }`}
            >
              Hacer pedido
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-navy-800' : 'text-white'}`}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl border border-silver-100 mb-4 overflow-hidden animate-scale-in">
            <div className="p-4 space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl font-body text-sm font-medium text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-silver-100">
                <a
              href={`https://wa.me/5493547650627?text=${encodeURIComponent('Hola! Me contacto desde la web de *Blue Velvet Pastry House*.\n\nMe gustaría consultar la disponibilidad y realizar un pedido.\n\nDesde ya, muchas gracias.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-navy-800 text-white px-4 py-3 rounded-xl text-sm font-medium"
                >
                  Hacer pedido por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
