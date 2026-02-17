import React, { useState, useContext } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 👇👇 التعديل هنا: أضفنا userData للقائمة
  const { getCartCount, wishlist, products, userData } = useContext(ShopContext);

  const filteredProducts = products.filter((product) => {
    if (searchTerm === "") return false;
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="bg-slate-950 text-slate-400 text-[10px] md:text-xs py-2 px-4 flex justify-between items-center">
        <p>🔥 Special Offer: Get 20% off on all Gaming Gear!</p>
        <div className="flex gap-4">
          <Link to="/sell" className="hover:text-cyan-400 transition">
            Sell With Us
          </Link>
          <Link to="/contact" className="hover:text-cyan-400 transition">
            Contact
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-8 relative">
        {/* الشعار */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-white flex items-center gap-1 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">M</span>
          </div>
          <span className="hidden sm:block">H-STORE</span>
        </Link>

        {/* --- منطقة البحث المباشر --- */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-full py-2 pl-5 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-500 rounded-full hover:bg-cyan-400 transition">
            <Search size={16} className="text-slate-900" />
          </button>

          {/* القائمة المنسدلة لنتائج البحث */}
          {searchTerm && filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-slate-900 border border-slate-700 rounded-xl mt-2 shadow-2xl overflow-hidden z-50 animate-fade-in">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="flex items-center gap-4 p-3 hover:bg-slate-800 transition border-b border-slate-800 last:border-none"
                  onClick={() => setSearchTerm("")}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 object-contain bg-slate-800 rounded"
                  />
                  <div>
                    <h4 className="text-white text-sm font-bold">
                      {product.title}
                    </h4>
                    <span className="text-cyan-400 text-xs">
                      {product.price} USD
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchTerm && filteredProducts.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-slate-900 border border-slate-700 rounded-xl mt-2 p-4 text-center text-slate-400 shadow-2xl z-50">
              No products found.
            </div>
          )}
        </div>

        {/* الأيقونات */}
        <div className="flex items-center gap-5 text-white">
          <Link
            to="/wishlist"
            className="relative cursor-pointer group hover:text-red-500 transition"
          >
            <Heart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative cursor-pointer group hover:text-cyan-400 transition"
          >
            <ShoppingBag />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {getCartCount()}
            </span>
          </Link>

          {userData ? (
            // 1. إذا مسجل دخول -> رابط للبروفايل
            <Link
              to="/profile"
              className="hidden md:flex items-center gap-2 hover:text-cyan-400 transition font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {userData.avatar}
              </div>
              <span className="text-sm">{userData.name.split(" ")[0]}</span>
            </Link>
          ) : (
            // 2. إذا غير مسجل -> رابط للدخول
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 hover:text-cyan-400 transition font-medium"
            >
              <User size={20} />
              <span className="text-sm">Login</span>
            </Link>
          )}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 absolute w-full left-0 animate-fade-in z-40">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 p-2 rounded mb-4 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
          />
          {searchTerm && (
            <div className="mb-4 max-h-40 overflow-y-auto bg-slate-800 rounded border border-slate-700">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    onClick={() => {
                      setSearchTerm("");
                      setIsOpen(false);
                    }}
                    className="block p-2 border-b border-slate-700 text-sm text-slate-300"
                  >
                    {product.title}
                  </Link>
                ))
              ) : (
                <div className="p-2 text-sm text-slate-500">No results</div>
              )}
            </div>
          )}

          <ul className="space-y-3 text-slate-300">
            <li className="hover:text-cyan-400 cursor-pointer">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="hover:text-cyan-400 cursor-pointer">Categories</li>
            <li className="hover:text-cyan-400 cursor-pointer">Offers</li>
            <li className="hover:text-cyan-400 cursor-pointer pt-2 border-t border-slate-800">
               {/* رابط تسجيل الدخول للموبايل */}
               <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login / Register
               </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;