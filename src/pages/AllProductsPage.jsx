import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductCard from "../components/common/ProductCard";
 

const AllProductsPage = () => {
  
  const { products, loading } = useContext(ShopContext);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-cyan-400 font-bold animate-pulse">
          Loading amazing products...
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            All Products
          </h1>
          <p className="text-slate-400">
            Browse our complete collection of {products.length} tech gadgets.
          </p>
        </div>

        {/* عرض كل المنتجات بدون slice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
