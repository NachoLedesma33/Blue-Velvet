import { useEffect, useRef, useState } from 'react';
import { Heart, CheckCircle, MessageCircle, Clock, Gift } from 'lucide-react';

/* Fecha límite Argentina: Día de la Madre 2026-10-18 23:59:59 ART */
const EXPIRY_ISO = '2026-10-18T23:59:59-03:00';
const WA_NUMBER = '5493547650627';

function isExpired(now: number = Date.now()): boolean {
  return now > new Date(EXPIRY_ISO).getTime();
}

function daysLeft(now: number = Date.now()): number {
  const ms = new Date(EXPIRY_ISO).getTime() - now;
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

interface MothersBox {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  headline: string;
  includes: string[];
  closing: string;
  price: number;
  waMessage: string;
}

const BOXES: MothersBox[] = [
  {
    id: 'mini-box-mama',
    name: 'Mini Box Mamá',
    image: '/Dia%20de%20la%20madres/primera.jpg',
    imageAlt: 'Mini Box Mamá — Día de la Madre Blue Velvet',
    headline: 'Regalale un mimo a tu mamá',
    includes: [
      'Mini cake de dulce de leche',
      '8 mini alfajores',
      'Botella de jugo de naranja',
      'Mini ramo de flores',
    ],
    closing: 'No dudes y encargá el tuyo',
    price: 23000,
    waMessage:
      'Hola! Me contacto desde la web de *Blue Velvet Pastry House*.\n\nQuiero encargar por el *Día de la Madre*:\n➤ *MINI BOX MAMÁ* — $23.000\nIncluye: mini cake de dulce de leche, 8 mini alfajores, botella de jugo de naranja y mini ramo de flores.\n\nQuedo atenta/o a disponibilidad y coordinación. Desde ya, muchas gracias.',
  },
  {
    id: 'box-dia-de-la-madre',
    name: 'Box Día de la Madre',
    image: '/Dia%20de%20la%20madres/segunda.jpg',
    imageAlt: 'Box Día de la Madre Blue Velvet',
    headline: 'Regalale un mimo a tu mamá con estos box',
    includes: [
      'Mini brownie o mini pavlova',
      '2 chipá',
      'Mafalda',
      '2 mini alfajores',
      'NY cookie',
      'Botella de jugo',
      'Mini ramo de flores',
    ],
    closing: 'No te quedes sin el tuyo y encargá por WhatsApp',
    price: 30000,
    waMessage:
      'Hola! Me contacto desde la web de *Blue Velvet Pastry House*.\n\nQuiero encargar por el *Día de la Madre*:\n➤ *BOX DÍA DE LA MADRE* — $30.000\nIncluye: mini brownie o mini pavlova, 2 chipá, mafalda, 2 mini alfajores, NY cookie, botella de jugo y mini ramo de flores.\n\nQuedo atenta/o a disponibilidad y coordinación. Desde ya, muchas gracias.',
  },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

function BoxCard({ box, index }: { box: MothersBox; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(box.waMessage)}`;

  return (
    <article
      ref={ref}
      aria-label={box.name}
      className={`card-organic group bg-white overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Imagen con marco doble sutil */}
      <div className="p-2 pb-0">
        <div className="relative overflow-hidden rounded-[1.4rem] h-64 sm:h-80 bg-cream-100">
          <img
            src={box.image}
            alt={box.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-navy-800 text-[10px] font-body font-semibold tracking-wide px-3 py-1.5 rounded-full">
            <Gift className="w-3 h-3" />
            Edición limitada
          </span>
          <span className="absolute bottom-3 right-3 bg-navy-800/90 backdrop-blur-sm text-white font-display text-lg font-semibold px-4 py-1.5 rounded-full">
            ${box.price.toLocaleString('es-AR')}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold text-navy-800 leading-snug mb-1.5">
          {box.name}
        </h3>
        <p className="text-silver-600 text-sm font-body leading-relaxed mb-4">
          {box.headline}. {box.closing}.
        </p>

        <p className="text-[10px] font-body font-medium text-silver-400 uppercase tracking-wider mb-2">
          ¿Qué incluye?
        </p>
        <ul className="space-y-1.5 mb-5">
          {box.includes.map(item => (
            <li key={item} className="flex items-center gap-2 text-sm font-body text-navy-700">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-silver-100 mb-4">
          <div>
            <div className="font-display text-2xl font-semibold text-navy-800">
              ${box.price.toLocaleString('es-AR')}
            </div>
            <div className="text-[10px] text-silver-400 font-body">ARS · Encargo anticipado</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-navy-700 text-xs font-body font-medium bg-navy-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Hasta el 18/10
          </span>
        </div>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Encargar ${box.name} por WhatsApp`}
          className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-2xl font-body font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5" />
          Encargar por WhatsApp
        </a>
      </div>
    </article>
  );
}

/* Sección temporal: se autodestruye pasada la fecha (retorna null). */
export default function MothersDay() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (isExpired()) return;
    const t = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  if (isExpired(now)) return null;

  const left = daysLeft(now);
  const urgency =
    left <= 0 ? '¡Hoy es el día!' : left === 1 ? '¡Último día para encargar!' : `¡Solo quedan ${left} días!`;

  return (
    <section id="dia-de-la-madre" aria-label="Día de la Madre" className="py-16 sm:py-24 bg-cream-50">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        {/* Header evento */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-5 shadow-sm border border-cream-200">
            <Heart className="w-4 h-4 text-navy-700 fill-navy-700" />
            <span className="text-navy-700 text-xs font-body font-medium tracking-wide">
              Edición limitada · Día de la Madre
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy-800 mb-4 text-balance">
            Un mimo para <span className="italic">mamá</span>
          </h2>
          <p className="text-silver-500 font-body text-base max-w-xl mx-auto leading-relaxed mb-5">
            Dos box armados con amor para celebrar. Encargá por WhatsApp antes del 18 de octubre.
          </p>
          <span className="inline-flex items-center gap-1.5 bg-navy-800 text-white text-xs font-body font-semibold px-4 py-2 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {urgency}
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {BOXES.map((box, i) => (
            <BoxCard key={box.id} box={box} index={i} />
          ))}
        </div>

        <p className="text-center text-silver-400 text-xs font-body mt-8">
          Stock limitado · Los pedidos se confirman por WhatsApp según disponibilidad.
        </p>
      </div>
    </section>
  );
}
