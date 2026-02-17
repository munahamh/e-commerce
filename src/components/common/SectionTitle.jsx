import React from 'react';

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-4 mb-8">
    {/* خط النيون الجانبي */}
    <div className="h-8 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
    <h2 className="text-2xl font-bold text-white tracking-wide uppercase">{title}</h2>
    {/* خط فاصل باهت */}
    <div className="flex-1 h-[1px] bg-slate-800"></div>
  </div>
);

export default SectionTitle;