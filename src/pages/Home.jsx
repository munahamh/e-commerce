import React, { useContext } from 'react'; 
import Hero from '../components/home/Hero';
import CategorySlider from '../components/home/CategorySlider';
// 👇 1. أعدنا استيراد بطاقة المنتج بدلاً من صفحة التفاصيل
import ProductCard from '../components/common/ProductCard'; 
import SectionTitle from '../components/common/SectionTitle';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { products, loading, allData } = useContext(ShopContext);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-cyan-400 font-bold animate-pulse">Loading amazing products...</p>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <CategorySlider />
      
      {/* --- قسم New Arrivals --- */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-end mb-6">
          <SectionTitle title="New Arrivals" />
          
          {/* زر View All بجانب العنوان */}
          <Link 
            to="/products" 
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition group mb-4 md:mb-0"
          >
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 👇 2. استخدمنا ProductCard هنا 👇 */}
          {products.slice(0, 8).map(product => (
             <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* زر إضافي أسفل المنتجات للموبايل والشاشات الكبيرة */}
        <div className="mt-10 flex justify-center">
          <Link 
            to="/products" 
            className="px-8 py-3 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 rounded-xl transition-all flex items-center gap-2"
          >
            Explore All Products
          </Link>
        </div>
      </section>
      
      {/* 5. قسم آخر (الأكثر مبيعاً) */}
      <section className="container mx-auto px-4 py-8 bg-slate-900/50">
        <SectionTitle title="Best Selling Gaming Gear" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allData.gaming && allData.gaming.length > 0 ? (
                // 👇 3. واستخدمنا ProductCard هنا أيضاً 👇
                allData.gaming.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))
            ) : (
                <p className="text-slate-500 col-span-full text-center">No gaming gear available at the moment.</p>
            )}
        </div>
      </section>
    </>
  );
};

export default HomePage;