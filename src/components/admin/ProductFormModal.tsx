import { useState } from 'react';
import { X, Plus, Trash2, Image, ChevronDown } from 'lucide-react';
import type { Product, ProductFormData, Topping } from '@/types';

interface ProductFormModalProps {
  product?: Product | null;
  onSave: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
}

const defaultForm: ProductFormData = {
  name: '',
  short_description: '',
  description: '',
  price: 0,
  stock: 0,
  available: true,
  category: 'torta',
  images: [],
  toppings: [],
  options: [],
  tags: [],
  featured: false,
};

export default function ProductFormModal({ product, onSave, onClose }: ProductFormModalProps) {
  const [form, setForm] = useState<ProductFormData>(product ? {
    name: product.name,
    short_description: product.short_description ?? '',
    description: product.description ?? '',
    price: product.price,
    stock: product.stock,
    available: product.available,
    category: product.category,
    images: product.images ?? [],
    toppings: product.toppings ?? [],
    options: product.options ?? [],
    tags: product.tags ?? [],
    featured: product.featured,
  } : defaultForm);

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function updateField<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function addImage() {
    const url = newImageUrl.trim();
    if (!url) return;
    updateField('images', [...form.images, url]);
    setNewImageUrl('');
  }

  function removeImage(i: number) {
    updateField('images', form.images.filter((_, idx) => idx !== i));
  }

  function addTopping() {
    const newT: Topping = { name: '', included: true, extra_price: 0 };
    updateField('toppings', [...form.toppings, newT]);
  }

  function updateTopping(i: number, patch: Partial<Topping>) {
    const next = form.toppings.map((t, idx) => idx === i ? { ...t, ...patch } : t);
    updateField('toppings', next);
  }

  function removeTopping(i: number) {
    updateField('toppings', form.toppings.filter((_, idx) => idx !== i));
  }

  function addTag() {
    const tag = newTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (!tag || form.tags.includes(tag)) return;
    updateField('tags', [...form.tags, tag]);
    setNewTag('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError('El nombre es requerido.'); return; }
    setError('');
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center modal-backdrop bg-navy-900/70" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full sm:max-w-2xl sm:mx-4 sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-silver-100 shrink-0">
          <h2 className="font-display text-xl font-semibold text-navy-800">
            {product ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-silver-100 hover:bg-silver-200 flex items-center justify-center">
            <X className="w-4 h-4 text-navy-700" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto scrollbar-hide flex-1 p-6 space-y-5">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="field-label">Nombre del producto *</label>
              <input value={form.name} onChange={e => updateField('name', e.target.value)} required
                placeholder="Ej: Torta Blue Velvet"
                className="field-input" />
            </div>
            <div>
              <label className="field-label">Categoría</label>
              <div className="relative">
                <select value={form.category} onChange={e => updateField('category', e.target.value as ProductFormData['category'])}
                  className="field-input appearance-none pr-8">
                  <option value="torta">Torta</option>
                  <option value="tarta">Tarta</option>
                  <option value="postre">Postre</option>
                  <option value="cupcake">Cupcake</option>
                  <option value="otro">Otro</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="field-label">Precio (ARS)</label>
                <input type="number" min="0" value={form.price} onChange={e => updateField('price', Number(e.target.value))}
                  className="field-input" />
              </div>
              <div className="w-24">
                <label className="field-label">Stock</label>
                <input type="number" min="0" value={form.stock} onChange={e => updateField('stock', Number(e.target.value))}
                  className="field-input" />
              </div>
            </div>
          </div>

          {/* Short desc */}
          <div>
            <label className="field-label">Descripción corta</label>
            <input value={form.short_description ?? ''} onChange={e => updateField('short_description', e.target.value)}
              placeholder="Resumen en una línea"
              className="field-input" />
          </div>

          {/* Long desc */}
          <div>
            <label className="field-label">Descripción completa</label>
            <textarea value={form.description ?? ''} onChange={e => updateField('description', e.target.value)}
              rows={3} placeholder="Detallá ingredientes, ocasión, sabores..."
              className="field-input resize-none" />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => updateField('available', !form.available)}
                className={`w-10 h-5.5 rounded-full relative transition-colors duration-200 ${form.available ? 'bg-emerald-500' : 'bg-silver-200'}`}
                style={{ height: '1.375rem' }}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.available ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm font-body text-navy-700">Disponible</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => updateField('featured', !form.featured)}
                className={`w-10 rounded-full relative transition-colors duration-200 ${form.featured ? 'bg-cream-500' : 'bg-silver-200'}`}
                style={{ height: '1.375rem' }}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm font-body text-navy-700">Destacado</span>
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="field-label">Imágenes (URLs)</label>
            <div className="flex gap-2 mb-2">
              <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
                placeholder="https://..."
                className="field-input flex-1" />
              <button type="button" onClick={addImage}
                className="px-4 py-2.5 bg-navy-100 hover:bg-navy-200 text-navy-800 rounded-xl text-sm font-body transition-colors shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {form.images.map((url, i) => (
                  <div key={i} className="relative group w-16 h-16 rounded-xl overflow-hidden border border-silver-200">
                    <img src={url} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-red-500/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                    {i === 0 && <div className="absolute bottom-0 left-0 right-0 bg-navy-800/70 text-white text-[8px] text-center py-0.5 font-body">Principal</div>}
                  </div>
                ))}
                {!form.images.length && <div className="w-16 h-16 rounded-xl bg-silver-100 flex items-center justify-center"><Image className="w-5 h-5 text-silver-300" /></div>}
              </div>
            )}
          </div>

          {/* Toppings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="field-label mb-0">Componentes / Toppings</label>
              <button type="button" onClick={addTopping}
                className="flex items-center gap-1 text-xs font-body font-medium text-navy-600 hover:text-navy-800 transition-colors">
                <Plus className="w-3.5 h-3.5" />Agregar
              </button>
            </div>
            <div className="space-y-2">
              {form.toppings.map((t, i) => (
                <div key={i} className="flex items-center gap-2 bg-silver-50 rounded-xl p-2.5">
                  <input value={t.name} onChange={e => updateTopping(i, { name: e.target.value })}
                    placeholder="Nombre del componente"
                    className="flex-1 bg-transparent text-sm font-body text-navy-800 outline-none placeholder-silver-300 min-w-0" />
                  <input type="number" min="0" value={t.extra_price}
                    onChange={e => updateTopping(i, { extra_price: Number(e.target.value), included: Number(e.target.value) === 0 ? t.included : false })}
                    className="w-20 bg-white border border-silver-200 rounded-lg px-2 py-1 text-xs font-body text-navy-800 outline-none text-right"
                    placeholder="Extra $" />
                  <button
                    type="button"
                    onClick={() => updateTopping(i, { included: !t.included })}
                    title={t.included ? 'Incluido' : 'Extra'}
                    className={`text-[10px] font-body px-2 py-1 rounded-lg font-medium transition-colors ${t.included ? 'bg-emerald-100 text-emerald-700' : 'bg-cream-100 text-navy-600'}`}
                  >
                    {t.included ? 'Incluido' : 'Extra'}
                  </button>
                  <button type="button" onClick={() => removeTopping(i)}
                    className="text-red-400 hover:text-red-600 transition-colors shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {form.toppings.length === 0 && (
                <p className="text-silver-300 text-xs font-body italic text-center py-3">Sin componentes. Agregá ingredientes, rellenos y opciones de personalización.</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="field-label">Etiquetas</label>
            <div className="flex gap-2 mb-2">
              <input value={newTag} onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="ej: boda, chocolate..."
                className="field-input flex-1" />
              <button type="button" onClick={addTag}
                className="px-4 py-2.5 bg-navy-100 hover:bg-navy-200 text-navy-800 rounded-xl text-sm font-body transition-colors shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1 bg-silver-100 text-silver-600 text-xs px-2.5 py-1 rounded-full font-body">
                  #{tag}
                  <button type="button" onClick={() => updateField('tags', form.tags.filter((_, j) => j !== i))}
                    className="text-silver-400 hover:text-red-400 transition-colors ml-0.5">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm font-body">
              {error}
            </div>
          )}
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-silver-100 flex gap-3 shrink-0">
          <button type="button" onClick={onClose}
            className="flex-1 border border-silver-200 text-silver-600 py-3 rounded-xl font-body text-sm font-medium hover:bg-silver-50 transition-colors">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white py-3 rounded-xl font-body text-sm font-semibold transition-all duration-300">
            {saving ? 'Guardando...' : (product ? 'Guardar cambios' : 'Crear producto')}
          </button>
        </div>
      </div>
    </div>
  );
}
