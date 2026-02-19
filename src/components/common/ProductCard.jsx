import React, { useContext } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; // 1. استيراد Link
import { ShopContext } from '../../context/ShopContext';

const ProductCard = ({ id, image, title, price, category }) => {
  const { addToCart, toggleWishlist, wishlist } = useContext(ShopContext);

  // التحقق من المفضلة
  const isInWishlist = wishlist ? wishlist.some((item) => item.id === id) : false;

  const productData = { id, image, title, price, category };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition group relative h-full flex flex-col">
      
      {/* حاوية الصورة */}
      <div className="h-48 w-full bg-slate-800 relative overflow-hidden p-4 flex items-center justify-center transform-gpu">
        
        {/* 👇 2. جعل الصورة رابطاً ينقل لصفحة التفاصيل */}
        <Link to={`/product/${id}`} className="w-full h-full flex items-center justify-center">
          <img 
            src={image} 
            alt={title} 
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-500" 
          />
        </Link>

        {/* زر المفضلة (يبقى مستقلاً ليعمل دون فتح الصفحة) */}
        <button 
          onClick={(e) => {
             e.preventDefault(); // منع الرابط من العمل عند الضغط على الزر
             toggleWishlist(productData);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition shadow-sm z-10
            ${isInWishlist 
              ? 'bg-red-500/10 text-red-500 opacity-100 translate-y-0' 
              : 'bg-slate-900/80 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0' 
            }`}
        >
          <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
        </button>
      </div>
      
      {/* المحتوى */}
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">{category}</span>
        
        {/* 👇 3. جعل العنوان رابطاً أيضاً */}
        <Link to={`/product/${id}`}>
          <h3 className="text-white font-bold text-base leading-tight mb-3 line-clamp-2 flex-1 hover:text-cyan-400 transition">
            {title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-white">{price} <span className="text-xs text-slate-500">USD</span></span>
          
          <button 
            onClick={() => addToCart(productData)} 
            className="bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 text-white p-2 rounded-lg transition shadow-lg active:scale-95"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;