import React from 'react';

const Footer = () => (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20 text-slate-400">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold text-xl mb-4">MH-STORE</h3>
                    <p className="text-sm leading-relaxed">
                        Redefining the digital shopping experience with cutting-edge technology and premium gear.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">Gaming Zone</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Customer Care</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-cyan-400 transition">Track Order</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">Return Policy</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Stay Connected</h4>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Enter email" className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-cyan-500" />
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold px-4 rounded text-sm">→</button>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
                © 2026 Muna Hamsho Projects. All Rights Reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
