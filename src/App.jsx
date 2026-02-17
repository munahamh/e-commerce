import React from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ProductCard from "./components/common/ProductCard";
import SectionTitle from "./components/common/SectionTitle";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import CartPage from "./components/common/CartPage";
import WishlistPage from "./pages/WishlistPage";
import LoginRegister from "./pages/LoginRegister"; // استيراد
import ScrollToTop from "./components/common/ScrollToTop"; // 1. استيراد المكون
import ProductDetailsPage from "./pages/ProductDetailsPage"; // 👈 1. استيراد الصفحة الجديدة
import CategoryPage from "./pages/CategoryPage"; // 1. استيراد الصفحة
import SellWithUsPage from "./pages/SellWithUsPage"; // 1. استيراد الصفحة
import ContactPage from "./pages/ContactPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from 'react-hot-toast'; // 1. استيراد المكتبة

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900">
      <Navbar />
      <ScrollToTop />
      <Toaster 
        position="bottom-right" // مكان الظهور (أسفل يمين)
        toastOptions={{
          style: {
            background: '#0f172a', // لون خلفية داكن (slate-900)
            color: '#fff',         // لون النص أبيض
            border: '1px solid #334155', // حدود رمادية
            padding: '16px',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#06b6d4', // لون الأيقونة (cyan-500)
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // لون الأحمر للخطأ
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/product/:id"
          element={<ProductDetailsPage key={window.location.pathname} />}
        />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/sell" element={<SellWithUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* 6. الفوتر */}
      <Footer />
    </div>
  );
}

export default App;
