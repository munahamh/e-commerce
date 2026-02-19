import React from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import CartPage from "./components/common/CartPage";
import WishlistPage from "./pages/WishlistPage";
import LoginRegister from "./pages/LoginRegister";
import ScrollToTop from "./components/common/ScrollToTop";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import SellWithUsPage from "./pages/SellWithUsPage";
import ContactPage from "./pages/ContactPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import AllProductsPage from "./pages/AllProductsPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900 flex flex-col">
      <Navbar />
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #334155",
            padding: "16px",
            borderRadius: "12px",
          },
          success: {
            iconTheme: {
              primary: "#06b6d4",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      
      {/* 👇 السحر هنا: قمنا بتغليف الصفحات بـ main يمنع خروج الأشكال للخارج 👇 */}
      <main className="relative overflow-hidden flex-1">
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
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/sell" element={<SellWithUsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;