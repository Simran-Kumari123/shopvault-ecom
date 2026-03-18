import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700 animate-slide-up">
      <div className="w-20 h-20 rounded-xl bg-surface-50 dark:bg-surface-700 flex-shrink-0 overflow-hidden">
        <img
          src={item.thumbnail} alt={item.title}
          className="w-full h-full object-contain p-2"
          onError={e => { e.target.src = 'https://via.placeholder.com/80x80?text=?' }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-brand-500 font-body font-medium uppercase tracking-wide mb-0.5">{item.category}</p>
        <h3 className="font-body text-sm font-semibold text-surface-900 dark:text-white line-clamp-2 mb-2">{item.title}</h3>
        <p className="font-display text-base font-bold text-surface-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
        <p className="text-xs text-surface-400 font-body">${item.price.toFixed(2)} each</p>
      </div>
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-surface-300 hover:text-red-500 dark:text-surface-600 dark:hover:text-red-400 transition-colors p-1"
        >
          <Trash2 size={16} />
        </button>
        <div className="flex items-center gap-2 bg-surface-50 dark:bg-surface-700 rounded-xl p-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-white dark:bg-surface-600 flex items-center justify-center text-surface-600 dark:text-surface-200 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-500 transition-all shadow-sm"
          >
            <Minus size={12} />
          </button>
          <span className="font-mono text-sm font-bold text-surface-900 dark:text-white w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-white dark:bg-surface-600 flex items-center justify-center text-surface-600 dark:text-surface-200 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-500 transition-all shadow-sm"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Cart() {
  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    toast.success('Order placed! (Demo mode)', { icon: '🎉' })
    clearCart()
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-white mb-8">Your Cart</h1>
        <div className="text-center py-24 bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700">
          <ShoppingCart size={56} className="text-surface-200 dark:text-surface-700 mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-surface-500 dark:text-surface-400 mb-2">Cart is empty</h2>
          <p className="text-surface-400 font-body text-sm mb-6">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium font-body text-sm transition-all"
          >
            <ShoppingBag size={16} />
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const tax = cartTotal * 0.08
  const shipping = cartTotal > 50 ? 0 : 5.99
  const total = cartTotal + tax + shipping

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-white mb-1">Your Cart</h1>
          <p className="text-surface-400 font-body">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-500 font-body font-medium flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => <CartItem key={item.id} item={item} />)}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700 p-6 sticky top-6">
            <h2 className="font-display text-lg font-bold text-surface-900 dark:text-white mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm font-body">
                  <span className="text-surface-500 dark:text-surface-400 truncate flex-1 pr-2">
                    {item.title.substring(0, 22)}{item.title.length > 22 ? '…' : ''} ×{item.quantity}
                  </span>
                  <span className="text-surface-700 dark:text-surface-300 font-medium flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-surface-100 dark:border-surface-700 pt-4 space-y-2 mb-5">
              <div className="flex justify-between text-sm font-body">
                <span className="text-surface-400">Subtotal</span>
                <span className="text-surface-700 dark:text-surface-300">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-surface-400">Tax (8%)</span>
                <span className="text-surface-700 dark:text-surface-300">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-surface-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-500 font-medium' : 'text-surface-700 dark:text-surface-300'}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-surface-400 font-body">Add ${(50 - cartTotal).toFixed(2)} more for free shipping</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6 py-3 border-t border-surface-100 dark:border-surface-700">
              <span className="font-body font-semibold text-surface-900 dark:text-white">Total</span>
              <span className="font-display text-2xl font-bold text-surface-900 dark:text-white">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium font-body flex items-center justify-center gap-2 transition-all duration-200"
            >
              Checkout
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full py-3 mt-2 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 text-sm font-body font-medium rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
