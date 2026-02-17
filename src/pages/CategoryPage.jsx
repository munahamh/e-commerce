import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';
import SectionTitle from '../components/common/SectionTitle';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams(); // نأخذ الاسم من الرابط
  const { products, allData } = useContext(ShopContext);

  // دالة صغيرة لتوحيد النصوص (حذف المسافات وجعلها أحرف صغيرة للمقارنة)
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, '');

  // تجميع كل المنتجات من كل المصادر في مصفوفة واحدة ضخمة
  // هذا يضمن أننا نبحث في "وصل حديثاً" وفي "الأقسام الخاصة"
  const allProductsCombined = [
    ...products,
    ...(allData.beauty || []),
    ...(allData.tv || []),
    ...(allData.phones || []),
    ...(allData.gaming || []),
    ...(allData.headphones || []),
    ...(allData.fragrances || []),
    ...(allData.kitchen || []),
    ...(allData.speakers || [])
  ];

  // تصفية المنتجات بناءً على التصنيف المختار
  const categoryProducts = allProductsCombined.filter(product => {
    // 1. إذا كان المنتج يملك خاصية category مطابقة
    if (product.category && normalize(product.category) === normalize(categoryName)) return true;
    
    // 2. أو إذا كان اسم التصنيف موجود في عنوان المنتج (بحث ذكي)
    // مثلاً إذا اخترنا "Mobiles" والمنتج اسمه "iPhone"، قد لا يكون له تصنيف لكنه موبايل
    // (هذه الخطوة اختيارية حسب دقة بياناتك)
    return false; 
  });

  // حل بديل: بما أن بياناتك مقسمة لمصفوفات منفصلة، يمكننا عمل "خريطة" بسيطة
  // إذا لم يعثر الفلتر أعلاه على نتائج دقيقة، نستخدم هذه الخريطة
  let displayProducts = categoryProducts;
  
  if (displayProducts.length === 0) {
      const map = {
          'mobiles': allData.phones,
          'laptops': products.filter(p => p.category === 'Laptops'), // من مصفوفة New Arrivals
          'audio': [...(allData.headphones || []), ...(allData.speakers || [])], // دمج السماعات ومكبرات الصوت
          'gaming': allData.gaming,
          'beauty': allData.beauty, // أو allData.beautyHealth
          'furniture': products.filter(p => p.category === 'Home & Furniture'), // مثال
          'televisions': allData.tv,
          'accessories': products.filter(p => p.category === 'Accessories'),
          'kitchen': allData.kitchen,
          'fragrances': allData.fragrances,
          // أضيفي باقي التصنيفات هنا حسب الأسماء في السلايدر
      };
      
      // نستخدم الاسم من الرابط للوصول للمصفوفة المناسبة
      displayProducts = map[categoryName.toLowerCase()] || [];
  }

  // التمرير للأعلى عند فتح الصفحة
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-4">
            <ArrowLeft size={18} /> Back to Home
        </Link>
        <SectionTitle title={`${categoryName} Collection`} />
      </div>

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((item, index) => (
            // نستخدم index كجزء من المفتاح لأن بعض المنتجات قد تتكرر عند الدمج
            <ProductCard key={`${item.id}-${index}`} {...item} category={item.category || categoryName} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-slate-400">We couldn't find any products in the "{categoryName}" category right now.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;