import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // مراحل الطلب
  const steps = [
    { id: 1, title: "Order Placed", date: "Oct 24, 10:00 AM", icon: <Clock size={20} /> },
    { id: 2, title: "Processing", date: "Oct 24, 02:00 PM", icon: <Package size={20} /> },
    { id: 3, title: "Shipped", date: "Oct 25, 09:00 AM", icon: <Truck size={20} /> },
    { id: 4, title: "Delivered", date: "Expected Oct 27", icon: <CheckCircle size={20} /> },
  ];

  // دالة محاكاة البحث (للتجربة)
  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setOrderDetails(null);

    // محاكاة تأخير الشبكة (Scanning Effect)
    setTimeout(() => {
      setLoading(false);
      // بيانات وهمية للنتيجة
      setOrderDetails({
        id: orderId,
        status: 3, // يعني أن الطلب في المرحلة الثالثة (Shipped)
        date: "Oct 24, 2023",
        total: "$1,450.00",
        items: [
          { name: "Sony WH-1000XM5", price: "$350", image: "https://placehold.co/100x100/1e293b/white?text=Sony" },
          { name: "iPhone 15 Case", price: "$40", image: "https://placehold.co/100x100/1e293b/white?text=Case" }
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 relative overflow-hidden">
      
      {/* خلفية جمالية */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* العنوان */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Track Your <span className="text-cyan-400">Order</span></h1>
          <p className="text-slate-400">Enter your order ID to get real-time updates.</p>
        </div>

        {/* نموذج البحث */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 mb-12 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g., #ORD-4923)" 
            className="flex-1 bg-transparent text-white px-6 py-4 outline-none placeholder:text-slate-600 font-mono"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button 
            onClick={handleTrack}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>Scanning...</>
            ) : (
              <>Track Order <Search size={20} /></>
            )}
          </button>
        </div>

        {/* نتيجة البحث (تظهر فقط بعد البحث) */}
        {orderDetails && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 1. ملخص الحالة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase mb-1">Order ID</p>
                <p className="text-white font-mono text-xl">{orderDetails.id}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase mb-1">Expected Arrival</p>
                <p className="text-cyan-400 font-bold text-xl flex items-center gap-2">
                  <Calendar size={18} /> Oct 27, 2025
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-slate-400 text-xs uppercase mb-1">Shipping Via</p>
                <p className="text-white font-bold text-xl flex items-center gap-2">
                  <Truck size={18} className="text-purple-500" /> DHL Express
                </p>
              </div>
            </div>

            {/* 2. شريط التقدم (Timeline) */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20"></div>
              
              <div className="relative">
                {/* الخط الخلفي */}
                <div className="absolute left-4 top-4 bottom-4 w-1 bg-slate-800 md:hidden"></div>
                <div className="absolute top-5 left-0 right-0 h-1 bg-slate-800 hidden md:block"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {steps.map((step, index) => {
                    const isCompleted = index + 1 <= orderDetails.status;
                    const isCurrent = index + 1 === orderDetails.status;

                    return (
                      <div key={step.id} className="relative z-10 flex md:flex-col items-center gap-4 md:text-center group">
                        {/* الدائرة والأيقونة */}
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-slate-900 border-cyan-500 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                            : 'bg-slate-900 border-slate-700 text-slate-600'
                        }`}>
                          {step.icon}
                        </div>

                        <div className="flex-1 md:mt-2">
                          <h4 className={`font-bold transition ${isCompleted ? 'text-white' : 'text-slate-500'}`}>
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-500">{step.date}</p>
                          {isCurrent && (
                            <span className="inline-block px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] rounded mt-1 animate-pulse">
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. تفاصيل المنتجات */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
               <h3 className="text-white font-bold mb-4">Order Items</h3>
               <div className="space-y-4">
                 {orderDetails.items.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4 border-b border-slate-800 pb-4 last:pb-0 last:border-0">
                     <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                     </div>
                     <div>
                       <p className="text-white font-medium">{item.name}</p>
                       <p className="text-cyan-400">{item.price}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default TrackOrderPage;