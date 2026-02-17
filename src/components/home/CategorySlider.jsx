import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'; // 1. استيراد Link
import { Smartphone, Monitor, Headphones, Watch, Zap, Camera, Home, ShoppingCart } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import 'swiper/css';

const categories = [
    // تأكدي أن الأسماء هنا (name) تطابق المفاتيح التي وضعناها في CategoryPage (في الـ map)
    { name: 'Mobiles', path: 'mobiles', icon: <Smartphone />, color: 'from-blue-600 to-cyan-500' },
    { name: 'Laptops', path: 'laptops', icon: <Monitor />, color: 'from-purple-600 to-pink-500' },
    { name: 'Audio', path: 'audio', icon: <Headphones />, color: 'from-orange-500 to-red-500' },
    { name: 'Televisions', path: 'televisions', icon: <Monitor />, color: 'from-blue-500 to-indigo-500' }, // أيقونة مؤقتة
    { name: 'Gaming', path: 'gaming', icon: <Zap />, color: 'from-yellow-400 to-orange-500' },
    { name: 'Kitchen', path: 'kitchen', icon: <Home />, color: 'from-green-500 to-emerald-500' },
    { name: 'Fragrances', path: 'fragrances', icon: <ShoppingCart />, color: 'from-pink-500 to-rose-500' },
    // يمكنك إضافة المزيد...
];

const CategorySlider = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <SectionTitle title="Shop By Category" />
      <Swiper
        spaceBetween={20}
        slidesPerView={2.5}
        breakpoints={{
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 4.5 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full py-4"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx}>
            {/* 👇 تحويل الـ div إلى Link */}
            <Link to={`/category/${cat.path}`} className="group cursor-pointer block">
              <div className={`h-28 rounded-2xl bg-gradient-to-br ${cat.color} p-[2px] transition-transform duration-300 group-hover:-translate-y-2`}>
                <div className="h-full w-full bg-slate-900 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-800 transition">
                  <div className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition">
                    {React.cloneElement(cat.icon, { size: 28 })}
                  </div>
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white">{cat.name}</span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategorySlider;