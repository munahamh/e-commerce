import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingBag, Trash2, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useContext(ShopContext);

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block p-6 rounded-full bg-slate-800 mb-6">
            <Heart size={48} className="text-slate-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          You haven't saved any items yet. Browse our catalog and click the heart icon to save gear for later.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-cyan-500 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <ArrowLeft size={20} /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <Heart className="text-red-500 fill-red-500" size={28} />
        <h1 className="text-3xl font-bold text-white">
          My Wishlist <span className="text-lg text-slate-500 font-normal">({wishlist.length} items)</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-red-500/30 transition duration-300">
            {/* صورة المنتج */}
            <div className="h-48 bg-slate-800 p-4 relative flex items-center justify-center">
              <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500" />
              
              {/* زر الحذف من المفضلة */}
              <button 
                onClick={() => toggleWishlist(item)}
                className="absolute top-3 right-3 p-2 bg-slate-900/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
                title="Remove from wishlist"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-4">
              <span className="text-xs text-cyan-400 font-semibold uppercase">{item.category}</span>
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-xl font-bold text-white mb-4">{item.price} <span className="text-xs text-slate-500">USD</span></p>
              
              {/* زر النقل للسلة */}
              <button 
                onClick={() => {
                    addToCart(item);
                    toggleWishlist(item); // اختياري: هل تريدين حذفه من المفضلة عند إضافته للسلة؟
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 text-white py-2 rounded-lg transition font-medium"
              >
                <ShoppingBag size={18} /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;