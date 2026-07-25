import { useState } from 'react';
import {
  Plus, Edit2, Trash2, Package, CheckCircle, XCircle,
  LogOut, Cake, Crown, Search, ArrowLeft, Star
} from 'lucide-react';
import type { Product, ProductFormData, Profile } from '@/types';
import { useProducts } from '@/hooks/useProducts';
import ProductFormModal from './ProductFormModal';

interface AdminPanelProps {
  profile: Profile;
  onSignOut: () => void;
  onBackToShop: () => void;
}

const categoryLabels: Record<string, string> = {
  torta: 'Torta', tarta: 'Tarta', postre: 'Postre', cupcake: 'Cupcake', otro: 'Otro',
};

export default function AdminPanel({ profile, onSignOut, onBackToShop }: AdminPanelProps) {
  const { products, loading, createProduct, updateProduct, deleteProduct, toggleAvailability } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSave(data: ProductFormData) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await createProduct(data);
    }
    setEditingProduct(null);
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    setDeleteLoading(true);
    try {
      await deleteProduct(id);
      setConfirmDeleteId(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function openCreate() {
    setEditingProduct(null);
    setShowForm(true);
  }

  const stats = {
    total: products.length,
    available: products.filter(p => p.available && p.stock > 0).length,
    featured: products.filter(p => p.featured).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  return (
    <div className="min-h-screen bg-silver-50 font-body">
      {/* Top bar */}
      <div className="bg-navy-gradient text-white">
        <div className="container-wide section-padding py-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/15 rounded-2xl flex items-center justify-center">
                <Cake className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-white">Panel de Administración</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  {profile.role === 'super_admin' && <Crown className="w-3 h-3 text-cream-300" />}
                  <span className="text-silver-300 text-xs">
                    {profile.name} · {profile.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onBackToShop}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Ver tienda
              </button>
              <button onClick={onSignOut}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide section-padding py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total productos', value: stats.total, icon: <Package className="w-5 h-5 text-navy-600" />, bg: 'bg-navy-50' },
            { label: 'Disponibles', value: stats.available, icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50' },
            { label: 'Destacados', value: stats.featured, icon: <Star className="w-5 h-5 text-cream-600" />, bg: 'bg-cream-50' },
            { label: 'Sin stock', value: stats.outOfStock, icon: <XCircle className="w-5 h-5 text-red-400" />, bg: 'bg-red-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
              {s.icon}
              <div>
                <div className="font-display text-2xl font-semibold text-navy-800">{s.value}</div>
                <div className="text-silver-500 text-xs">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-silver-200 rounded-xl text-sm font-body text-navy-800 placeholder-silver-300 focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
            />
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Plus className="w-4 h-4" />
            Nuevo producto
          </button>
        </div>

        {/* Product list */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 h-20 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center">
            <Cake className="w-10 h-10 text-silver-200 mx-auto mb-3" />
            <p className="font-display text-lg text-silver-400">
              {search ? 'No hay resultados para esa búsqueda.' : 'No hay productos cargados aún.'}
            </p>
            {!search && (
              <button onClick={openCreate}
                className="mt-4 btn-primary text-sm">
                <Plus className="w-4 h-4" />
                Crear primer producto
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-silver-100 p-4 flex items-center gap-4 group hover:shadow-md transition-all">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-silver-100 shrink-0">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Cake className="w-6 h-6 text-silver-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-semibold text-navy-800 text-base truncate">{product.name}</h3>
                    {product.featured && <Star className="w-3.5 h-3.5 text-cream-500 fill-cream-500 shrink-0" />}
                    <span className="badge bg-silver-100 text-silver-600 text-[10px] shrink-0">{categoryLabels[product.category]}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-body text-sm font-semibold text-navy-700">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-silver-400 font-body">
                      <Package className="w-3 h-3" />
                      {product.stock} und.
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-body font-medium ${product.available && product.stock > 0 ? 'text-emerald-600' : 'text-red-400'}`}>
                      {product.available && product.stock > 0
                        ? <><CheckCircle className="w-3 h-3" />Disponible</>
                        : <><XCircle className="w-3 h-3" />No disponible</>
                      }
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleAvailability(product.id, !product.available)}
                    title={product.available ? 'Marcar no disponible' : 'Marcar disponible'}
                    className={`p-2 rounded-xl transition-colors text-sm ${product.available ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-400 hover:bg-red-100'}`}
                  >
                    {product.available ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(product)}
                    className="p-2 rounded-xl bg-silver-100 hover:bg-navy-100 text-silver-600 hover:text-navy-700 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setConfirmDeleteId(product.id)}
                    className="p-2 rounded-xl bg-silver-100 hover:bg-red-100 text-silver-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-navy-900/60">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 animate-scale-in text-center">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">Eliminar producto</h3>
            <p className="text-silver-500 text-sm font-body mb-6">Esta acción no se puede deshacer. ¿Confirmás la eliminación?</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)}
                className="flex-1 border border-silver-200 text-silver-600 py-3 rounded-xl font-body text-sm font-medium hover:bg-silver-50 transition-colors">
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-3 rounded-xl font-body text-sm font-semibold transition-colors">
                {deleteLoading ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}
