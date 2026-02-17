import React from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

const ContactPage = () => {

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Headquarters",
      text: "Istanbul Atlas University, Vadi Campus, Kagithane/Istanbul",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone Number",
      text: "+90 555 123 45 67",
      subText: "Mon-Fri 9am-6pm",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Address",
      text: "support@mh-store.com",
      subText: "We reply within 24 hours",
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20"
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      text: "Monday - Friday: 9:00 AM - 6:00 PM",
      subText: "Weekend: Closed",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      
      {/* خلفية جمالية */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* العنوان */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Get in <span className="text-cyan-400">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Have a question or just want to say hi? We'd love to hear from you. Fill out the form below or reach us through our contact details.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- اليسار: معلومات الاتصال --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <div key={index} className={`p-6 rounded-2xl border ${item.color} backdrop-blur-sm transition hover:scale-105`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${item.color.split(' ')[0]} ${item.color.split(' ')[1]}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.text}</p>
                    {item.subText && <p className="text-slate-500 text-xs mt-1">{item.subText}</p>}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media Links */}
            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- اليمين: نموذج المراسلة --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">First Name</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition placeholder:text-slate-600" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">Last Name</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition placeholder:text-slate-600" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 ml-1">Email Address</label>
                <input type="email" className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition placeholder:text-slate-600" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 ml-1">Subject</label>
                <select className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition text-slate-400">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Returns & Refunds</option>
                  <option>Business Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 ml-1">Message</label>
                <textarea rows="5" className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition placeholder:text-slate-600" placeholder="How can we help you?"></textarea>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-900 font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 group">
                Send Message <Send size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </form>
          </motion.div>

        </div>

        {/* --- الخريطة (اختياري) --- */}
        <div className="mt-16 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-80 grayscale hover:grayscale-0 transition duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.175657864317!2d28.97652397656689!3d41.06456721595168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab650897c1125%3A0x633d7b4b72f5f148!2sIstanbul%20Atlas%20University!5e0!3m2!1sen!2str!4v1708290000000!5m2!1sen!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;