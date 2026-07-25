import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import ProductsSection from '@/components/landing/ProductsSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminPanel from '@/components/admin/AdminPanel';
import { Heart, Cake, Award, Clock } from 'lucide-react';

export default function App() {
  const { user, profile, loading: authLoading, isAdmin, signIn, signOut } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [view, setView] = useState<'shop' | 'admin'>('shop');

  async function handleLogin(email: string, password: string) {
    await signIn(email, password);
    setShowLoginModal(false);
    setView('admin');
  }

  function handleAdminClick() {
    if (user && isAdmin) {
      setView('admin');
    } else {
      setShowLoginModal(true);
    }
  }

  function handleSignOut() {
    signOut();
    setView('shop');
  }

  if (!authLoading && view === 'admin' && user && isAdmin && profile) {
    return (
      <AdminPanel
        profile={profile}
        onSignOut={handleSignOut}
        onBackToShop={() => setView('shop')}
      />
    );
  }

  return (
    <div className="bg-white">
      <Header onAdminClick={handleAdminClick} />

      <main>
        <Hero />

        {/* About strip */}
        <section id="nosotros" className="py-20 bg-cream-50">
          <div className="container-wide section-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-cream-200">
                  <Heart className="w-3.5 h-3.5 text-navy-700 fill-navy-700" />
                  <span className="text-navy-700 text-xs font-body font-medium tracking-wide">Nuestra historia</span>
                </div>
                <h2 className="font-display text-4xl font-semibold text-navy-800 leading-tight text-balance">
                  Holaa! Bienvenidos a <span className="italic text-navy-600">Blue Velvet</span>
                </h2>
                <p className="text-silver-600 font-body leading-relaxed">
                  Somos una pastelería artesanal con sede en Alta Gracia, Córdoba. Nos especializamos en tortas personalizadas, pastelería clásica y postres elaborados con ingredientes seleccionados y mucho amor.
                </p>
                <p className="text-silver-600 font-body leading-relaxed">
                  Cada pedido es único — lo diseñamos juntas para que sea exactamente lo que imaginás. Consultanos por Instagram o WhatsApp para crear tu pastel ideal 💙
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://wa.me/5493541000000?text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20Blue%20Velvet%20%F0%9F%92%99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Escribinos
                  </a>
                  <a href="#productos" className="btn-outline">Ver productos</a>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Cake className="w-6 h-6 text-navy-700" />, title: 'Pastelería clásica', desc: 'Recetas atemporales con técnica artesanal y calidad premium.' },
                  { icon: <Award className="w-6 h-6 text-navy-700" />, title: 'Tortas personalizadas', desc: 'Diseñamos y elaboramos la torta de tus sueños para cada ocasión.' },
                  { icon: <Heart className="w-6 h-6 text-navy-700" />, title: 'Con amor', desc: 'Cada detalle elaborado con dedicación y los mejores ingredientes.' },
                  { icon: <Clock className="w-6 h-6 text-navy-700" />, title: 'Pedidos anticipados', desc: 'Consultá disponibilidad y agendá tu pedido con anticipación.' },
                ].map(f => (
                  <div key={f.title} className="bg-white rounded-2xl p-5 border border-cream-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-cream-100 rounded-xl flex items-center justify-center mb-3">
                      {f.icon}
                    </div>
                    <h4 className="font-display text-base font-semibold text-navy-800 mb-1.5">{f.title}</h4>
                    <p className="text-silver-500 text-xs font-body leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProductsSection products={products} loading={productsLoading} />

        {/* Instagram CTA */}
        <section className="py-20 bg-navy-gradient text-white overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 blob" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-silver-300/10 blob" style={{ animationDelay: '3s' }} />
          </div>
          <div className="relative z-10 container-wide section-padding text-center">
            <div className="max-w-xl mx-auto">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
                Seguinos en Instagram
              </h2>
              <p className="text-silver-300 font-body text-base leading-relaxed mb-8">
                Acá vas a encontrar tartas, tortas personalizadas y mucho más. Consultá y pedí por DM — escribinos para diseñar tu pedido ideal 💙
              </p>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-navy-800 px-8 py-4 rounded-full font-body font-semibold text-sm hover:bg-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                @bluevelvetpastry
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer onAdminClick={handleAdminClick} />
      <WhatsAppButton />

      {showLoginModal && (
        <AdminLogin
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
