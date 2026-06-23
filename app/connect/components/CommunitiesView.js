'use client';

import React, { useState } from 'react';
import { useConnect } from '../ConnectContext';
import { 
  Hash, 
  Users, 
  Plus, 
  Send, 
  Sparkles, 
  MessageSquare, 
  FolderGit, 
  ShieldAlert,
  Info,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunitiesView() {
  const { 
    currentUser, 
    users, 
    activeCommunityId, 
    setActiveCommunityId, 
    activeCommunityChannel, 
    setActiveCommunityChannel 
  } = useConnect();

  const [messageText, setMessageText] = useState('');
  
  // Local list of channel message logs
  const [channelConversations, setChannelConversations] = useState({
    'dept_cs_general': [
      { id: 'c1', senderName: 'Dr. Evelyn Sterling', senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'faculty', text: 'Welcome Computer Science cohort! The midterm lab assignments are open for submission.', time: 'Yesterday at 3:12 PM' },
      { id: 'c2', senderName: 'Alex Rivera', senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', role: 'student', text: 'Is there a specific template we should use for the database design schemas?', time: 'Yesterday at 4:05 PM' },
      { id: 'c3', senderName: 'Dr. Evelyn Sterling', senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'faculty', text: 'Yes Alex, refer to the pdf guides pinned in the resources tab.', time: 'Yesterday at 4:15 PM' }
    ],
    'ai_res_general': [
      { id: 'ca1', senderName: 'Prof. Alan Turing', senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', role: 'faculty', text: 'Welcome to the AI Research Lab. We will review co-author draft updates here.', time: '2 days ago' }
    ]
  });

  const communities = [
    { id: 'dept_cs', name: 'Computer Science', category: 'ACADEMIC', channels: ['general', 'labs', 'announcements', 'projects'] },
    { id: 'ai_res', name: 'AI Research Group', category: 'RESEARCH', channels: ['general', 'papers', 'grants', 'ml-gpu-queue'] },
    { id: 'blockchain', name: 'Blockchain Club', category: 'CLUBS', channels: ['general', 'hackathons', 'nodes', 'governance'] },
    { id: 'placement_cell', name: 'Placement Cell', category: 'OFFICIAL', channels: ['general', 'meta-leads', 'stripe-updates', 'resume-tips'] },
    { id: 'hostel', name: 'Hostel Community', category: 'CAMPUS', channels: ['general', 'maintenance', 'canteen-menu'] },
    { id: 'alumni', name: 'Alumni Network', category: 'CAMPUS', channels: ['general', 'referrals', 'events'] }
  ];

  const currentComm = communities.find(c => c.id === activeCommunityId) || communities[0];
  const activeChatKey = `${currentComm.id}_${activeCommunityChannel}`;
  const messages = channelConversations[activeChatKey] || [
    { id: 'empty', senderName: 'System Node', senderAvatar: '', role: 'system', text: `Welcome to the start of # ${activeCommunityChannel}! Send a message below to start the conversation.`, time: 'Just now' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      senderName: currentUser?.name || 'Aria Nakamura',
      senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: currentUser?.role || 'student',
      text: messageText,
      time: 'Just now'
    };

    setChannelConversations(prev => ({
      ...prev,
      [activeChatKey]: [...(prev[activeChatKey] || []), newMsg]
    }));
    setMessageText('');
  };

  return (
    <div className="w-full flex-1 flex bg-[#0B1736]/40 border border-white/5 rounded-3xl overflow-hidden h-[720px] max-w-[1100px] select-none text-left">
      
      {/* 1. Left Sidebar: Communities and Channel categories */}
      <div className="w-60 bg-[#0B1736] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#102043]/30">
          <span className="text-sm font-bold text-white tracking-wide">Communities</span>
          <span className="text-[9px] bg-brand-primary/20 text-brand-primary border border-brand-primary/10 px-2 py-0.5 rounded-md font-mono font-bold">DISCORD</span>
        </div>

        {/* Communities selector list */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-2">Select Server</span>
            <div className="flex flex-col gap-1">
              {communities.map((comm) => (
                <button
                  key={comm.id}
                  onClick={() => {
                    setActiveCommunityId(comm.id);
                    setActiveCommunityChannel('general');
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                    activeCommunityId === comm.id
                      ? 'bg-brand-primary/15 border-brand-primary/20 text-white font-bold'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span className="truncate">{comm.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 my-1" />

          {/* Current Community channels list */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-2">CHANNELS</span>
            <div className="flex flex-col gap-1">
              {currentComm.channels.map((chan) => (
                <button
                  key={chan}
                  onClick={() => setActiveCommunityChannel(chan)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                    activeCommunityChannel === chan
                      ? 'bg-white/[0.04] border-white/5 text-white font-bold'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  <Hash className="w-4 h-4 shrink-0 text-slate-500" />
                  <span>{chan}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Current user card at bottom */}
        {currentUser && (
          <div className="p-3 border-t border-white/5 bg-[#102043]/20 flex items-center gap-2.5">
            <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0" />
            <div className="flex flex-col text-left min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate">{currentUser.name}</span>
              <span className="text-[9px] font-semibold text-slate-400 truncate uppercase mt-0.5">{currentUser.role}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Middle Panel: Messages workspace */}
      <div className="flex-1 flex flex-col bg-[#071126]/40 overflow-hidden relative">
        
        {/* Chat Window Header */}
        <div className="p-4 border-b border-white/5 bg-[#0B1736]/50 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm text-white">
              {activeCommunityChannel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-[#102043] border border-white/5 px-2.5 py-1 rounded-md">
              {currentComm.category}
            </div>
          </div>
        </div>

        {/* Messages viewport */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={msg.id || i} className="flex gap-3 text-xs leading-normal">
              {msg.senderAvatar ? (
                <img src={msg.senderAvatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/5 mt-0.5" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-500/10 border border-white/5 flex items-center justify-center shrink-0 text-slate-400 font-bold">S</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-white hover:underline cursor-pointer">{msg.senderName}</span>
                  {msg.role && msg.role !== 'student' && (
                    <span className="text-[8px] font-bold bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded uppercase tracking-wider scale-90">
                      {msg.role}
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-slate-500 font-semibold">{msg.time}</span>
                </div>
                <p className="text-slate-300 mt-1 font-semibold leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input box */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#0B1736]/40 flex gap-2 items-center">
          <input 
            type="text" 
            placeholder={`Message # ${activeCommunityChannel}`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 bg-[#0B1736] border border-white/5 text-xs text-white placeholder-slate-500 p-3 rounded-xl outline-none"
          />
          <button type="submit" className="p-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl shadow-md shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* 3. Right Sidebar: Server Members Directory */}
      <div className="w-52 bg-[#0B1736]/80 border-l border-white/5 flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-white/5 bg-[#102043]/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Members</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4 text-left">
          {/* Online Faculty Category */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">FACULTY — 2</span>
            {users.filter(u => u.role === 'faculty').slice(0, 2).map((fac) => (
              <div key={fac.id} className="flex items-center gap-2 p-1 hover:bg-white/[0.02] rounded-lg cursor-pointer">
                <div className="relative shrink-0">
                  <img src={fac.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-white/10" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-[#0B1736]" />
                </div>
                <span className="text-xs text-slate-300 font-semibold truncate">{fac.name}</span>
              </div>
            ))}
          </div>

          {/* Online Students Category */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">STUDENTS — 4</span>
            {users.filter(u => u.role === 'student').slice(0, 4).map((stud) => (
              <div key={stud.id} className="flex items-center gap-2 p-1 hover:bg-white/[0.02] rounded-lg cursor-pointer">
                <div className="relative shrink-0">
                  <img src={stud.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-white/10" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-[#0B1736]" />
                </div>
                <span className="text-xs text-slate-300 font-semibold truncate">{stud.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
