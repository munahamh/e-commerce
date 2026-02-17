import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import { ShopContext } from '../context/ShopContext'; // استيراد الكونتكست
import toast from 'react-hot-toast'; // استيراد toast

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 👇 الحالات المفقودة التي تم إضافتها
  const [isLogin, setIsLogin] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(ShopContext); // استدعاء دالة login

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isLogin) {
      if(email && password) {
          login(email, password); // تنفيذ الدخول
      } else {
          toast.error("Please fill in all fields");
      }
    } else {
      // هنا كود التسجيل (يمكنك توجيهه للدخول حالياً)
      toast.success("Account created! Please login.");
      setIsLogin(true);
    }
  };

  // حركات الانيميشن
  const fadeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-20 relative overflow-hidden">
      
      {/* خلفية جمالية (دوائر نيون) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* القسم الأيسر: النموذج (Form) */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-slate-400 text-sm">
              {isLogin 
                ? 'Enter your details to access your account.' 
                : 'Join us today and experience the future of tech.'}
            </p>
          </div>

          <AnimatePresence mode='wait'>
            <motion.form 
              key={isLogin ? 'login' : 'register'}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
              onSubmit={handleSubmit} // 👇 تم الربط هنا بدلاً من e.preventDefault فقط
            >
              
              {/* حقل الاسم (يظهر فقط في التسجيل) */}
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  />
                </div>
              )}

              {/* حقل الإيميل */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email} // ربط الحالة
                  onChange={(e) => setEmail(e.target.value)} // تحديث الحالة
                  className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* حقل الباسورد */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={password} // ربط الحالة
                  onChange={(e) => setPassword(e.target.value)} // تحديث الحالة
                  className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-12 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* روابط مساعدة */}
              <div className="flex justify-between items-center text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0" />
                  <span>Remember me</span>
                </label>
                {isLogin && (
                  <a href="#" className="hover:text-cyan-400 transition">Forgot Password?</a>
                )}
              </div>

              {/* زر الإرسال */}
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-900 font-bold py-3 rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 group">
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>

            </motion.form>
          </AnimatePresence>

          {/* فاصل */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
          </div>

          {/* أزرار السوشيال */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white py-2.5 rounded-xl transition">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white py-2.5 rounded-xl transition">
              <Github size={18} /> GitHub
            </button>
          </div>

          {/* التبديل بين الصفحات */}
          <div className="mt-8 text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-cyan-400 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>

        {/* القسم الأيمن: صورة وشعار (يظهر فقط في الشاشات الكبيرة) */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614064641938-3bcee529741d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(147,51,234,0.5)]">
              <span className="text-white text-4xl font-bold">M</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">MH-STORE</h3>
            <p className="text-slate-400 max-w-xs mx-auto leading-relaxed">
              Unlock the best tech deals and manage your orders in one place. Join our community of gamers and professionals.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;