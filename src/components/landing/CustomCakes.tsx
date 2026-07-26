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
  {
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Red Velvet personalizada',
  },
  {
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Torta personalizada',
  },
  {
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Torta personalizada',
  },
  {
    image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Torta personalizada',
  },
  {
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Torta personalizada',
  },
  {
    image: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Torta personalizada',
  },
];

export default function CustomCakes() {
  const [sponge, setSponge] = useState('');
  const [filling, setFilling] = useState('');
  const [coverage, setCoverage] = useState('');
  const [layers, setLayers] = useState('1');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

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
    <section id="personalizadas" className="py-24 bg-cream-50">
      <div className="container-wide section-padding">
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

        {/* Gallery */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-navy-800 mb-6 text-center">Nuestras creaciones</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {customGallery.map((item, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl aspect-square bg-silver-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-body font-medium">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-cream-100 p-8">
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
    </section>
  );
}
