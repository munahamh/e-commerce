import React, { useState, useContext } from 'react'; // 1. إضافة useContext
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  User, Package, MapPin, CreditCard, LogOut, 
  Settings, ChevronRight, Plus, X, Truck, Trash2, AlertTriangle 
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext'; 

// --- 1. مكون المودال العام (للإضافة) ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

// --- 2. مكون مودال التأكيد (للحذف) ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Are you sure?</h3>
        <p className="text-slate-400 text-sm mb-6">{message}</p>
        
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition">
            Yes, Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- 3. الأقسام الفرعية ---

// أ) قسم الطلبات
const OrdersSection = () => {
  const [orders, setOrders] = useState([
    { 
      id: "#ORD-7752", date: "Today, 10:30 AM", total: "$450.00", status: "In Transit", 
      items: ["Sony WH-1000XM5"] 
    },
    { 
      id: "#ORD-4923", date: "Oct 12, 2023", total: "$120.00", status: "Delivered", 
      items: ["Logitech Mouse"] 
    }
  ]);

  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = () => {
    setOrders(orders.filter(order => order.id !== deleteId));
    setDeleteId(null);
    toast.success("Order history deleted successfully", { icon: '🗑️' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>
      
      {orders.length === 0 && <p className="text-slate-500">No orders found.</p>}

      {orders.map((order) => (
        <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition group relative">
          
          <button 
            onClick={() => setDeleteId(order.id)}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
            title="Delete Order History"
          >
            <Trash2 size={18} />
          </button>

          <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pr-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl font-bold text-white">{order.id}</span>
                <span className={`text-xs px-2 py-1 rounded border ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{order.date} • {order.items.join(", ")}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">{order.total}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <Link 
              to="/track-order" 
              className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-500 px-4 py-2 rounded-lg transition"
            >
              <Truck size={16} /> Track Order
            </Link>
          </div>
        </div>
      ))}

      <ConfirmationModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={confirmDelete}
        message="This action will remove the order from your history. Are you sure?"
      />
    </div>
  );
};

// ب) قسم العناوين
const AddressesSection = () => {
  const [addresses, setAddresses] = useState([
    { type: "Home", street: "123 Tech Avenue, Silicon Valley", phone: "+1 234 567 890" },
    { type: "Office", street: "456 Innovation Blvd, Tech Park", phone: "+1 987 654 321" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: '', street: '', phone: '' });
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, newAddress]);
    setNewAddress({ type: '', street: '', phone: '' });
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setAddresses(addresses.filter((_, idx) => idx !== deleteIndex));
    setDeleteIndex(null);
    toast.success("Address removed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Saved Addresses</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-sm bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 transition"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-cyan-500/50 transition">
            
            <button 
              onClick={() => setDeleteIndex(idx)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                <MapPin size={20} />
              </div>
              <h3 className="text-white font-bold">{addr.type}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-2">{addr.street}</p>
            <p className="text-slate-500 text-xs">{addr.phone}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Address">
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1">Label (e.g. Home)</label>
            <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" 
              value={newAddress.type} onChange={(e) => setNewAddress({...newAddress, type: e.target.value})} />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Street Address</label>
            <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" 
              value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Phone Number</label>
            <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" 
              value={newAddress.phone} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-cyan-400 transition mt-4">Save Address</button>
        </form>
      </Modal>

      <ConfirmationModal 
        isOpen={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this address?"
      />
    </div>
  );
};

// ج) قسم المحفظة
const WalletSection = () => {
  const [cards, setCards] = useState([
    { number: "**** **** **** 4242", holder: "ALEX DOE", expiry: "12/25", type: "visa", color: "from-purple-600 to-indigo-600" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', holder: '', expiry: '' });
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddCard = (e) => {
    e.preventDefault();
    setCards([...cards, {
      ...newCard,
      type: "mastercard",
      color: "from-slate-700 to-slate-900"
    }]);
    setNewCard({ number: '', holder: '', expiry: '' });
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setCards(cards.filter((_, idx) => idx !== deleteIndex));
    setDeleteIndex(null);
    toast.success("Card removed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-sm bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 transition"
        >
          <Plus size={16} /> Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`relative overflow-hidden rounded-2xl p-6 h-48 flex flex-col justify-between bg-gradient-to-br ${card.color} shadow-lg group hover:scale-[1.02] transition-transform`}>
            
             <button 
              onClick={() => setDeleteIndex(idx)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-red-500 text-white rounded-lg transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>

            <div className="flex justify-between items-start">
              <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
              <span className="text-white/80 font-mono italic text-lg">{card.type.toUpperCase()}</span>
            </div>
            <div>
              <p className="text-white font-mono text-xl tracking-widest mb-4">{card.number}</p>
              <div className="flex justify-between text-white/80 text-xs uppercase">
                <span>Card Holder</span>
                <span>Expires</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm tracking-wider">
                <span>{card.holder}</span>
                <span>{card.expiry}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Card">
        <form onSubmit={handleAddCard} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1">Card Number</label>
            <input required placeholder="**** **** **** ****" maxLength="19" type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" 
              value={newCard.number} onChange={(e) => setNewCard({...newCard, number: e.target.value})} />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Card Holder Name</label>
            <input required placeholder="JOHN DOE" type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none uppercase" 
              value={newCard.holder} onChange={(e) => setNewCard({...newCard, holder: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-slate-400 text-xs mb-1">Expiry Date</label>
               <input required placeholder="MM/YY" maxLength="5" type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" 
                 value={newCard.expiry} onChange={(e) => setNewCard({...newCard, expiry: e.target.value})} />
            </div>
            <div>
               <label className="block text-slate-400 text-xs mb-1">CVV</label>
               <input required placeholder="123" maxLength="3" type="password" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-cyan-400 transition mt-4">Save Card</button>
        </form>
      </Modal>

      <ConfirmationModal 
        isOpen={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={confirmDelete}
        message="Are you sure you want to remove this card?"
      />
    </div>
  );
};

// --- 4. المكون الرئيسي ---
const ProfilePage = () => {
  const { userData, logout } = useContext(ShopContext); // 2. جلب البيانات من الكونتكست
  const [activeTab, setActiveTab] = useState('orders');

  // 3. تعريف المستخدم بناءً على البيانات القادمة من الكونتكست
  const user = {
    name: userData?.name || "Guest",
    email: userData?.email || "guest@example.com",
    avatar: userData?.avatar || "G"
  };

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'wallet', label: 'Wallet & Cards', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            {user.avatar}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Hello, {user.name} 👋</h1>
            <p className="text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  activeTab === tab.id 
                  ? 'bg-slate-900 border border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={activeTab === tab.id ? 'text-cyan-400' : ''}>{tab.icon}</div>
                  <span className="font-medium">{tab.label}</span>
                </div>
                {activeTab === tab.id && <ChevronRight size={16} className="text-cyan-400" />}
              </button>
            ))}
            
            <div className="pt-8 mt-8 border-t border-slate-800">
              <button onClick={logout}
               className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-xl transition">
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'orders' && <OrdersSection />}
                {activeTab === 'addresses' && <AddressesSection />}
                {activeTab === 'wallet' && <WalletSection />}
                {activeTab === 'settings' && (
                  <div className="text-slate-400 text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
                    <Settings size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-white font-bold text-xl">Account Settings</h3>
                    <p>Change password, email notifications, and privacy.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;