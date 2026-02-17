import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ShoppingBag, Heart, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';

const ProductDetailsPage = () => {
 
  const { id } = useParams(); 
  const { products, addToCart, toggleWishlist, wishlist } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('description');
  
  // 1. إضافة حالة للصورة المختارة (تبدأ بـ null)
  const [selectedImage, setSelectedImage] = useState(null);

  // البحث عن المنتج
  const product = products.find((p) => p.id === parseInt(id));

  // حالة المفضلة
  const isInWishlist = product ? wishlist.some((item) => item.id === product.id) : false;



  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="text-cyan-400 hover:underline">Go Back Home</Link>
      </div>
    );
  }

  // 3. تحديد الصورة المعروضة (المختارة أو الأصلية) وتجهيز المعرض
  const currentImage = selectedImage || product.image;
  // إذا لم يكن هناك مصفوفة صور، نستخدم الصورة الأصلية مكررة كبديل مؤقت
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.image, product.image]; 

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="hover:text-cyan-400 transition cursor-pointer">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-white truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* 2. الشبكة الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* --- اليمين: قسم الصور (تم تعديله لإضافة المعرض) --- */}
        <div className="flex flex-col gap-4">
            <div className="relative group">
            <div className="aspect-square bg-slate-800 rounded-2xl border border-slate-700 p-8 flex items-center justify-center overflow-hidden relative z-10">
                {/* استخدام currentImage بدلاً من product.image مباشرة */}
                <img 
                src={currentImage} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-700 ease-in-out" 
                />
            </div>
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full -z-0 opacity-0 group-hover:opacity-50 transition duration-700"></div>
            </div>

            {/* 👇👇 هنا أضفنا شريط الصور المصغرة 👇👇 */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {galleryImages.map((img, index) => (
                    <button 
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 flex-shrink-0 rounded-xl border-2 bg-slate-900 p-2 transition-all ${
                        currentImage === img 
                        ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                    >
                    <img src={img} alt={`thumbnail-${index}`} className="w-full h-full object-contain" />
                    </button>
                ))}
            </div>
        </div>

        {/* --- اليسار: التفاصيل (كما هي تماماً) --- */}
        <div>
          <div className="mb-2">
             <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wider">
                {product.category}
             </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="text-slate-400 text-sm">(124 Reviews)</span>
          </div>

          <div className="text-3xl font-bold text-white mb-6 flex items-end gap-2">
            {product.price} <span className="text-lg text-cyan-400 font-medium mb-1">USD</span>
          </div>

          <p className="text-slate-400 leading-relaxed mb-8 border-b border-slate-800 pb-8">
            {product.description || "Experience the next level of technology with this premium product. Designed for performance and durability, it fits perfectly into your modern lifestyle."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className={`flex-none p-4 rounded-xl border-2 transition flex items-center justify-center ${
                isInWishlist 
                ? 'border-red-500 text-red-500 bg-red-500/10' 
                : 'border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <Heart size={24} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex flex-col items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
              <Truck size={20} className="text-purple-500" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
              <ShieldCheck size={20} className="text-purple-500" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
              <RefreshCw size={20} className="text-purple-500" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. التبويبات (كما هي تماماً) */}
      <div className="mb-16">
        <div className="flex gap-8 border-b border-slate-800 mb-6">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-lg font-bold transition relative ${activeTab === 'description' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}
          >
            Description
            {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-lg font-bold transition relative ${activeTab === 'reviews' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}
          >
            Reviews (124)
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-t-full"></div>}
          </button>
        </div>

        <div className="text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          {activeTab === 'description' ? (
            <div>
              <p className="mb-4">
                Elevate your daily routine with the {product.title}. Crafted with precision and utilizing state-of-the-art materials, this product offers unparalleled performance in its class.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400">
                <li>High-quality build suitable for professional use.</li>
                <li>Seamless integration with your existing ecosystem.</li>
                <li>Energy efficient and environmentally friendly design.</li>
                <li>Includes premium accessories out of the box.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">A</div>
                  <span className="font-bold text-white">Ahmed S.</span>
                  <div className="flex text-yellow-400 text-xs"><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/></div>
                </div>
                <p className="text-sm">Absolutely amazing product! The delivery was super fast too.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white">M</div>
                  <span className="font-bold text-white">Muna H.</span>
                  <div className="flex text-yellow-400 text-xs"><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/></div>
                </div>
                <p className="text-sm">Love the design and the build quality. Highly recommended for anyone looking for an upgrade.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. منتجات ذات صلة (كما هي تماماً) */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white uppercase">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetailsPage;