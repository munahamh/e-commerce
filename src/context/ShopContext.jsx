/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom'; // 1. استيراد useNavigate

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  // 👇👇 هام جداً: هذا السطر كان ناقصاً وهو سبب توقف التوجيه
  const navigate = useNavigate(); 

  // --- 1. حالات البيانات (Data States) ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. حالات السلة والمفضلة (من اللوكال ستوريج) ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- 3. حالة المستخدم (User State) ---
  // (نقلناها للأعلى لتكون مرتبة مع باقي الحالات)
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null; 
  });

  // --- 4. جلب البيانات من الـ API ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const [phonesRes, laptopsRes, accessoriesRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/smartphones'),
          fetch('https://dummyjson.com/products/category/laptops'),
          fetch('https://dummyjson.com/products/category/mobile-accessories')
        ]);

        const phonesData = await phonesRes.json();
        const laptopsData = await laptopsRes.json();
        const accessoriesData = await accessoriesRes.json();

        const combinedProducts = [
          ...phonesData.products, 
          ...laptopsData.products, 
          ...accessoriesData.products
        ];

        const formattedProducts = combinedProducts.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category, 
          image: item.thumbnail,   
          images: item.images,     
          description: item.description,
          rating: item.rating
        }));

        setProducts(formattedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 5. حفظ البيانات عند التغيير ---
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // --- 6. دوال السلة والمفضلة ---
  const addToCart = (product) => {
    // الرسالة أولاً لمنع التكرار
    toast.success(`${product.title.substring(0, 15)}... added to cart! 🛒`);

    setCartItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart 🗑️");
  };

  const updateQty = (id, type) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = type === 'inc' ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.qty, 0);
  };

  const toggleWishlist = (product) => {
    const isExist = wishlist.find((item) => item.id === product.id);

    if (isExist) {
      toast.error("Removed from wishlist 💔");
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      toast.success("Added to wishlist ❤️");
      setWishlist((prev) => [...prev, product]);
    }
  };

  // --- 7. تقسيم البيانات (allData) ---
  const allData = {
    phones: products.filter(p => p.category === 'smartphones'),
    laptops: products.filter(p => p.category === 'laptops'),
    fragrances: products.filter(p => p.category === 'fragrances'),
    decoration: products.filter(p => p.category === 'home-decoration'),
    gaming: products.filter(p => p.category === 'laptops' || p.title.toLowerCase().includes('gaming')),
  };

  // --- 8. دوال تسجيل الدخول والخروج ---
  const login = (email, password) => {
    // محاكاة تسجيل الدخول
    const fakeUser = {
      name: "Muna Hamsho",
      email: email,
      password:password,
      avatar: "MH",
      token: "fake-jwt-token"
    };

    setUserData(fakeUser);
    localStorage.setItem('userData', JSON.stringify(fakeUser));
    toast.success(`Welcome back, ${fakeUser.name}! 👋`);
    navigate('/profile'); // الآن ستعمل لأننا عرفنا navigate في الأعلى
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <ShopContext.Provider
      value={{
        products,    
        allData,      
        loading,      
        error,        
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        getCartTotal,
        getCartCount,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        userData, // بيانات المستخدم
        login,    // دالة الدخول
        logout    // دالة الخروج
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;