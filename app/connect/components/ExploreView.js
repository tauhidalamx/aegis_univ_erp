'use client';

import React, { useState } from 'react';
import { Search, Compass, Sparkles, Flame, Trophy, Quote } from 'lucide-react';
import { useConnect } from '../ConnectContext';

export default function ExploreView() {
  const { posts, setActiveView } = useConnect();
  const [query, setQuery] = useState('');

  // Filter posts with attachments to make an Instagram-style grid
  const gridPosts = posts.filter(p => p.media_url).slice(0, 6);

  const trendingCategories = [
    { name: 'Quantum Engineering', count: '14 research papers', icon: Sparkles },
    { name: 'Blockchain Hackathon', count: '32 students registered', icon: Trophy },
    { name: 'AI Fine-Tuning', count: '8 collaborations active', icon: Flame },
    { name: 'Neural Networks', count: '15 citations', icon: Quote }
  ];

  return (
    <div className="w-full max-w-[700px] flex flex-col gap-6 text-left">
      
      {/* Search Bar Container */}
      <div className="flex items-center bg-[#102043]/40 border border-white/5 rounded-2xl px-4 py-3 gap-3">
        <Search className="w-5 h-5 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search research topics, students, faculty, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none text-sm text-white outline-none w-full placeholder-slate-500 font-semibold"
        />
      </div>

      {/* Grid Highlights Banner */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Discover Campus Activity</span>
        
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gridPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setActiveView('home')}
                className="aspect-square bg-black/40 border border-white/5 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-200 hover:border-brand-primary"
              >
                <img 
                  src={post.media_url} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-350" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-200">
                  <span className="text-xs font-bold text-white">View Post</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#102043]/20 border border-white/5 rounded-2xl text-slate-500 text-xs font-semibold">
            No media attachments found to populate the media explorer.
          </div>
        )}
      </div>

      {/* Trending Categories Section */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Hot Trends Right Now</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {trendingCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div 
                key={i} 
                className="p-4 bg-[#102043]/30 border border-white/5 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-all duration-150 cursor-pointer"
              >
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white">{cat.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1">{cat.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
