import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, getCartTotal } = useContext(ShopContext);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
        <p className="text-slate-400 mb-8">Looks like you haven't added any tech gear yet.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-cyan-500 text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-cyan-400 transition">
          <ArrowLeft size={20} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
        Shopping Cart <span className="text-lg text-slate-500 font-normal">({cartItems.length} items)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* قائمة المنتجات (يسار) */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex gap-4 items-center">
              {/* الصورة */}
              <div className="w-24 h-24 bg-slate-800 rounded-lg p-2 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
              </div>

              {/* التفاصيل */}
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-cyan-400 font-medium">{item.price} USD</p>
                <p className="text-slate-500 text-sm mt-1">{item.category}</p>
              </div>

              {/* التحكم */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-3 bg-slate-900 rounded-lg px-3 py-1 border border-slate-700">
                  <button onClick={() => updateQty(item.id, 'dec')} className="text-slate-400 hover:text-white"><Minus size={16} /></button>
                  <span className="text-white w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 'inc')} className="text-slate-400 hover:text-white"><Plus size={16} /></button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1 transition"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ملخص الطلب (يمين) */}
        <div className="lg:w-1/3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6 border-b border-slate-800 pb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white">{getCartTotal()} USD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (Estimated)</span>
                <span className="text-white">0 USD</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-cyan-400">{getCartTotal()} USD</span>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Proceed to Checkout
            </button>
            
            <div className="mt-4 flex justify-center gap-2">
                <span className="text-xs text-slate-500">We accept:</span>
                <img src="https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons@main/logo/visa.svg" className="h-4 bg-white px-1 rounded" alt="Visa" />
                <img src="https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons@main/logo/mastercard.svg" className="h-4 bg-white px-1 rounded" alt="Mastercard" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;