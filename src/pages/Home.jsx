import {React , useContext} from 'react';
import Hero from '../components/home/Hero';
import CategorySlider from '../components/home/CategorySlider';
import ProductCard from '../components/common/ProductCard';
import SectionTitle from '../components/common/SectionTitle';
import { ShopContext } from '../context/ShopContext'; // استيراد الكونتكست





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
      <section className="container mx-auto px-4 py-8">
        <SectionTitle title="New Arrivals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
             <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
     
      {/* 5. قسم آخر (مثلاً الأكثر مبيعاً) */}
    <section className="container mx-auto px-4 py-8 bg-slate-900/50">
    <SectionTitle title="Best Selling Gaming Gear" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* استخدمنا allData.gaming مباشرة لأننا جهزناها في الكونتكست
            أضفنا .slice(0, 4) لعرض أول 4 منتجات فقط في الصفحة الرئيسية
        */}
        {allData.gaming && allData.gaming.length > 0 ? (
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