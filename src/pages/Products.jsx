import { useEffect, useRef } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { Search, Filter, ShoppingCart, Star, AlertCircle, Package } from 'lucide-react'

function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-surface-100 dark:bg-surface-700" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-surface-100 dark:bg-surface-700 rounded w-3/4" />
        <div className="h-3 bg-surface-100 dark:bg-surface-700 rounded w-1/2" />
        <div className="h-8 bg-surface-100 dark:bg-surface-700 rounded-lg mt-3" />
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const { addToCart, cart } = useCart()
  const inCart = cart.some(i => i.id === product.id)

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-100 dark:border-surface-700 hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-0.5 group flex flex-col">
      <div className="relative overflow-hidden bg-surface-50 dark:bg-surface-700 h-48">
        <img
          src={product.thumbnail} alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={e => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image' }}
        />
        {product.discountPercentage > 10 && (
          <span className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-lg font-body">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium font-body text-surface-700 dark:text-surface-300">{product.rating?.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-brand-500 font-body font-medium uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-body text-sm font-semibold text-surface-900 dark:text-white line-clamp-2 flex-1 mb-3">{product.title}</h3>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-surface-900 dark:text-white">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium font-body transition-all duration-200 ${
              inCart
                ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-700'
                : 'bg-brand-500 hover:bg-brand-600 text-white'
            }`}
          >
            <ShoppingCart size={14} />
            {inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { products, loading, error, search, setSearch, category, setCategory, categories, hasMore, loadMore, total } = useProducts()
  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)

  // Infinite scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && hasMore && !loading) loadMore() },
      { threshold: 0.1 }
    )
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current)
    return () => observerRef.current?.disconnect()
  }, [hasMore, loading, loadMore])

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-white mb-1">Products</h1>
        <p className="text-surface-400 font-body">{total > 0 ? `${total} products available` : 'Loading catalog...'}</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-300 dark:placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500 font-body text-sm transition"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
          <select
            value={category} onChange={e => setCategory(e.target.value)}
            className="pl-10 pr-8 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-body text-sm transition appearance-none min-w-[160px] capitalize"
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle size={18} />
          <span className="font-body text-sm">{error}</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && !error && (
        <div className="text-center py-20">
          <Package size={48} className="text-surface-200 dark:text-surface-700 mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-surface-500 dark:text-surface-400 mb-1">No products found</h3>
          <p className="text-surface-400 font-body text-sm">Try adjusting your search or filter.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {loading && Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10 mt-6" />

      {!hasMore && products.length > 0 && (
        <p className="text-center text-surface-400 font-body text-sm mt-4">All products loaded.</p>
      )}
    </div>
  )
}
