import { useState } from 'react';
import { Sparkles, Send, Cake } from 'lucide-react';

const spongeOptions = [
  'Vainilla', 'Chocolate', 'Red Velvet',
];

const fillingOptions = [
  'Crema (sola o con topping)', 'Dulce de leche', 'Ganache de chocolate', 'Crema Bariloche', 'Cream cheese',
];

const coverageOptions = ['Crema', 'Ganache', 'Buttercream'];

const customGallery = [
  { image: '/Tortas-images/Personalizadas/1personalzada.webp', name: 'Torta personalizada' },
  { image: '/Tortas-images/Personalizadas/2personalizada.webp', name: 'Torta personalizada' },
  { image: '/Tortas-images/Personalizadas/3personalizada.webp', name: 'Torta personalizada' },
  { image: '/Tortas-images/Personalizadas/4personalizada.webp', name: 'Torta personalizada' },
];

interface ZoomOrigin {
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
}

export default function CustomCakes() {
  const [sponge, setSponge] = useState('');
  const [filling, setFilling] = useState('');
  const [coverage, setCoverage] = useState('');
  const [layers, setLayers] = useState('1');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState<ZoomOrigin | null>(null);
  const [zoomPhase, setZoomPhase] = useState<'open' | 'full' | null>(null);

  const WA_NUMBER = '5493547650627';

  function toggleFilling(f: string) {
    setFilling(prev => prev === f ? '' : f);
  }

  function buildMessage(): string {
    const separator = '________________________';
    const lines = [
      'PEDIDO PERSONALIZADO — Blue Velvet',
      separator,
      '',
      sponge ? `Tipo de torta: ${sponge}` : '',
      filling ? `Relleno: ${filling}` : '',
      coverage ? `Cobertura: ${coverage}` : '',
      layers !== '1' ? `Pisos: ${layers}` : '',
      eventDate ? `Fecha del evento: ${eventDate}` : '',
      message ? `Mensaje adicional: ${message}` : '',
      '',
      separator,
      'La decoración la coordinamos por WhatsApp.',
      '',
      'bluevelvetpastry.com',
    ];
    return lines.filter(Boolean).join('\n');
  }

  function handleSend() {
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  }

  function handlePreview() {
    setShowPreview(!showPreview);
  }

  return (
    <section id="personalizadas" className="py-16 sm:py-24 bg-cream-50">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-5 shadow-sm border border-cream-200">
            <Sparkles className="w-4 h-4 text-navy-700" />
            <span className="text-navy-700 text-xs font-body font-medium tracking-wide">Tortas Personalizadas</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy-800 mb-4 text-balance">
            Creá tu <span className="italic">torta soñada</span>
          </h2>
          <p className="text-silver-500 font-body text-base max-w-xl mx-auto leading-relaxed">
            Elegí el biscochuelo y los rellenos que más te gusten. La coordinación de decoración la hacemos directamente por WhatsApp.
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-navy-800 mb-1 text-center">Nuestras creaciones</h3>
          <p className="text-silver-500 text-sm font-body text-center mb-8">Personalizadas a nuestros clientes</p>
          <div className="relative w-full group/carousel">
            <div className={`flex animate-scroll gap-3 sm:gap-4 w-max group-hover/carousel:[animation-play-state:paused] ${zoomOrigin ? '[animation-play-state:paused]' : ''}`}>
              {[...customGallery, ...customGallery, ...customGallery].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setZoomOrigin({ x: rect.left, y: rect.top, width: rect.width, height: rect.height, image: item.image });
                    requestAnimationFrame(() => setZoomPhase('open'));
                    requestAnimationFrame(() => setTimeout(() => setZoomPhase('full'), 40));
                  }}
                  className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-silver-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy-400 focus:ring-offset-2 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-cream-100 p-5 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-navy-800 mb-2 text-center">Armá tu torta</h3>
            <p className="text-silver-500 text-sm font-body text-center mb-8">Armá tu pedido y lo enviamos por WhatsApp para coordinar los detalles</p>

            <div className="space-y-6">
              {/* Sponge */}
              <div>
                <label className="block text-sm font-body font-medium text-navy-700 mb-2">Tipo de bizcochuelos *</label>
                <div className="flex gap-2">
                  {spongeOptions.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSponge(s)}
                      className={`flex-1 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                        sponge === s
                          ? 'bg-navy-800 text-white'
                          : 'bg-silver-100 text-silver-600 hover:bg-silver-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fillings */}
              <div>
                <label className="block text-sm font-body font-medium text-navy-700 mb-2">Tipo de rellenos *</label>
                <div className="flex flex-wrap gap-2">
                  {fillingOptions.map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFilling(f)}
                      className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
                        filling === f
                          ? 'bg-navy-800 text-white'
                          : 'bg-silver-100 text-silver-600 hover:bg-silver-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coverage */}
              <div>
                <label className="block text-sm font-body font-medium text-navy-700 mb-2">Tipo de coberturas</label>
                <div className="flex flex-wrap gap-2">
                  {coverageOptions.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCoverage(coverage === c ? '' : c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
                        coverage === c
                          ? 'bg-navy-800 text-white'
                          : 'bg-silver-100 text-silver-600 hover:bg-silver-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layers */}
              <div>
                <label className="block text-sm font-body font-medium text-navy-700 mb-2">Cantidad de pisos</label>
                <div className="flex gap-2">
                  {['1', '2'].map(l => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLayers(l)}
                      className={`w-12 h-12 rounded-xl text-sm font-body font-medium transition-all ${
                        layers === l
                          ? 'bg-navy-800 text-white'
                          : 'bg-silver-100 text-silver-600 hover:bg-silver-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event date */}
              <div>
                <label className="block text-sm font-body font-medium text-navy-700 mb-2">Fecha del evento</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full bg-silver-50 border border-silver-200 rounded-xl px-4 py-3 text-sm font-body text-navy-800 focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
                />
              </div>

              {/* Additional message */}
              <div>
                <label className="block text-sm font-body font-medium text-navy-700 mb-2">Mensaje adicional</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Algo más que quieras contarnos..."
                  rows={2}
                  className="w-full bg-silver-50 border border-silver-200 rounded-xl px-4 py-3 text-sm font-body text-navy-800 placeholder-silver-400 focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100 resize-none"
                />
              </div>

              {/* Decoration notice */}
              <div className="bg-cream-50 border border-cream-200 rounded-xl px-4 py-3">
                <p className="text-sm font-body text-navy-700">
                  <span className="font-medium">¿Decoración?</span> La coordinamos directamente por WhatsApp para que quede exactamente como la soñás.
                </p>
              </div>

              {/* Preview + Send */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="flex-1 flex items-center justify-center gap-2 border border-silver-200 text-silver-600 py-3.5 rounded-2xl font-body text-sm font-medium hover:bg-silver-50 transition-colors"
                >
                  <Cake className="w-4 h-4" />
                  {showPreview ? 'Ocultar preview' : 'Ver preview del mensaje'}
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!sponge}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-2xl font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Enviar pedido por WhatsApp
                </button>
              </div>

              {/* Preview */}
              {showPreview && (
                <div className="bg-silver-50 border border-silver-200 rounded-2xl p-5 mt-2">
                  <p className="text-xs font-body font-medium text-silver-400 uppercase tracking-wider mb-3">Preview del mensaje</p>
                  <pre className="text-sm font-body text-navy-800 whitespace-pre-wrap leading-relaxed">{buildMessage()}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom overlay */}
      {zoomOrigin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12"
          style={{
            backgroundColor: zoomPhase === 'full' ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
            backdropFilter: zoomPhase === 'full' ? 'blur(12px)' : 'blur(0px)',
            transition: 'all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)',
          }}
          onClick={() => { setZoomPhase(null); setTimeout(() => setZoomOrigin(null), 500); }}
        >
          <img
            src={zoomOrigin.image}
            alt="Vista ampliada"
            className="max-w-full max-h-full object-contain rounded-2xl"
            style={{
              position: 'fixed',
              left: zoomPhase === 'full' ? '50%' : `${zoomOrigin.x + zoomOrigin.width / 2}px`,
              top: zoomPhase === 'full' ? '50%' : `${zoomOrigin.y + zoomOrigin.height / 2}px`,
              width: zoomPhase === 'full' ? 'min(85vw, 56rem)' : `${zoomOrigin.width}px`,
              height: zoomPhase === 'full' ? 'min(85vh, 56rem)' : `${zoomOrigin.height}px`,
              transform: 'translate(-50%, -50%)',
              boxShadow: zoomPhase === 'full' ? '0 25px 60px -12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.15)',
              transition: zoomPhase === 'full'
                ? 'all 0.55s cubic-bezier(0.34, 1.3, 0.64, 1)'
                : 'all 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)',
            }}
          />
        </div>
      )}
    </section>
  );
}
