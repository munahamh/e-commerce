import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Globe, Truck, DollarSign, CheckCircle, 
  ChevronDown, ChevronUp, ArrowRight 
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

const SellWithUsPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  // بيانات المميزات
  const benefits = [
    {
      id: 1,
      title: "List Your Products",
      desc: "Our self-serve tool makes it incredibly easy to upload and manage your inventory in minutes.",
      icon: <Store size={32} />,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      id: 2,
      title: "Reach Global Audience",
      desc: "Expand your business beyond borders. Sell to millions of tech enthusiasts across the region.",
      icon: <Globe size={32} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      id: 3,
      title: "Ship With Ease",
      desc: "Use our dedicated logistics network for hassle-free pickup and fast delivery to customers.",
      icon: <Truck size={32} />,
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      id: 4,
      title: "Maximize Earnings",
      desc: "Competitive commission rates and fast payouts directly to your bank account.",
      icon: <DollarSign size={32} />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    }
  ];

  // بيانات الأسئلة الشائعة
  const faqs = [
    {
      question: "How do I register as a seller on MH-STORE?",
      answer: "Simply fill out the registration form on this page with your valid ID and business details. Once verified, you can start listing products immediately."
    },
    {
      question: "What are the fees for selling?",
      answer: "Listing products is free. We only charge a small commission fee when your item is sold. There are no hidden monthly charges."
    },
    {
      question: "How does shipping work?",
      answer: "You have two options: 'Fulfilled by MH-Store' where we handle everything, or 'Self-Ship' where you deliver to the customer directly."
    },
    {
      question: "When will I get paid?",
      answer: "Payments are processed weekly and deposited directly into your registered bank account after a 7-day return period clearance."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      
      {/* خلفية جمالية */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* --- القسم الأول: الهيرو والفورم --- */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* النص الترحيبي (يسار) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
              Partner With Us
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Grow Your Business with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                MH-STORE
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Join thousands of sellers who trust MH-STORE to reach millions of customers. 
              Enjoy powerful tools, secure payments, and world-class support.
            </p>
            
            <ul className="space-y-4 mb-8">
              {['Zero listing fees', 'Secure & Fast Payments', '24/7 Seller Support'].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="text-green-400" size={20} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* نموذج التسجيل (يمين) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Become a Seller</h3>
            <p className="text-slate-400 text-sm mb-6">Create your account to start selling today.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:border-cyan-500 outline-none transition" />
                <input type="text" placeholder="Last Name" className="bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:border-cyan-500 outline-none transition" />
              </div>
              <input type="text" placeholder="Company Name" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:border-cyan-500 outline-none transition" />
              <input type="email" placeholder="Business Email" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:border-cyan-500 outline-none transition" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:border-cyan-500 outline-none transition" />
              <input type="password" placeholder="Password" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:border-cyan-500 outline-none transition" />
              
              <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0" />
                <span>I agree to the <a href="#" className="text-cyan-400 hover:underline">Terms & Conditions</a></span>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-900 font-bold py-4 rounded-xl transition shadow-lg mt-4 flex items-center justify-center gap-2 group">
                Create Seller Account <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* --- القسم الثاني: المميزات --- */}
      <div className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Sell on MH-STORE?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We provide the tools and support you need to scale your business effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => (
              <div key={item.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition group">
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- القسم الثالث: الأسئلة الشائعة --- */}
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <SectionTitle title="Frequently Asked Questions" />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition"
              >
                <span className={`font-bold ${activeAccordion === index ? 'text-cyan-400' : 'text-white'}`}>
                  {faq.question}
                </span>
                {activeAccordion === index ? <ChevronUp className="text-cyan-400" /> : <ChevronDown className="text-slate-500" />}
              </button>
              
              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SellWithUsPage;