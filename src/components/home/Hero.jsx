import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import HeroFoto from "../../assets/imgs/headphone.jpg"

const Hero = () => {
  return (
    <div className="relative h-[400px] md:h-[500px] w-full bg-slate-950 overflow-hidden flex items-center">
      {/* طبقة التدرج اللوني */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10"></div>

      {/* المحتوى */}
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="px-3 py-1 text-xs font-bold text-slate-900 bg-cyan-400 rounded-sm mb-4 inline-block">
            NEW COLLECTION 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            DISCOVER THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              FUTURE OF TECH
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-lg">
            Upgrade your setup with the latest high-performance gear designed
            for professionals and gamers.
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-full transition shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
            Shop Now
          </button>
        </motion.div>
      </div>

      {/* صورة الخلفية */}
      <img
        src={HeroFoto}
        alt="Hero BG"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />
    </div>
  );
};

export default Hero;
