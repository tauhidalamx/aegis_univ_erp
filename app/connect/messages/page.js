'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Mic, 
  Send, 
  Video, 
  Phone, 
  Monitor, 
  Terminal, 
  Compass, 
  MessageSquare, 
  Users, 
  FlaskConical, 
  Calendar, 
  Volume2, 
  Radio, 
  CheckSquare, 
  BarChart2, 
  Bookmark, 
  Bell, 
  Settings, 
  Plus, 
  LogOut, 
  MoreVertical, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  Cpu, 
  ShieldCheck, 
  Trash2, 
  FileCheck,
  Sparkles,
  Link2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectProvider, useConnect } from '../ConnectContext';
import '../connect.css';
import './messages.css';

// Mock list of chat channels/threads
const initialChatThreads = [
  { id: 'ai_copilot', name: 'Aegis AI Copilot', category: 'ai', role: 'System Engine', dept: 'AI Lab', lastMsg: 'I calculated a +12% performance factor improvement...', timestamp: '10:42 AM', unread: 0, status: 'online', type: 'ai', pinned: true },
  { id: 'usr_001', name: 'Dr. Raymond Park', category: 'faculty', role: 'Faculty HOD', dept: 'Computer Science', lastMsg: 'Please submit the consensus draft review by tonight.', timestamp: '10:30 AM', unread: 2, status: 'busy', type: 'user', pinned: true },
  { id: 'usr_005', name: 'Carlos Mendez', category: 'students', role: 'Student Delegate', dept: 'Electrical Eng', lastMsg: 'Carlos is typing...', timestamp: '9:15 AM', unread: 0, status: 'online', type: 'user', typing: true },
  { id: 'usr_002', name: 'Prof. Marcus Chen', category: 'faculty', role: 'Professor', dept: 'Computer Science', lastMsg: 'The midterm scores are posted to Aegis Chain.', timestamp: 'Yesterday', unread: 0, status: 'meeting', type: 'user', meetingActive: true },
  { id: 'dept_cs', name: 'CS Department Huddle', category: 'departments', role: 'Official Channel', dept: 'CS Department', lastMsg: 'Consensus review meeting scheduled on-chain.', timestamp: 'Yesterday', unread: 0, status: 'online', type: 'channel' },
  { id: 'class_cs202', name: 'CS202 - Data Structures', category: 'students', role: 'Class Group', dept: 'CS Cohort', lastMsg: 'Has anyone downloaded the binary tree prep PDF?', timestamp: 'June 11', unread: 1, status: 'online', type: 'channel' },
  { id: 'res_dl_models', name: 'AI Deep Learning Models', category: 'research', role: 'Research Group', dept: 'AI Research', lastMsg: 'Citation indicators paper draft updated.', timestamp: 'June 10', unread: 3, status: 'online', type: 'channel', voiceActive: true },
  { id: 'placement_leads', name: 'Placement Cell - Tech Leads', category: 'communities', role: 'Career Board', dept: 'Placements', lastMsg: 'Meta software intern applications closing soon.', timestamp: 'June 09', unread: 0, status: 'online', type: 'channel' },
  { id: 'lounge_voice', name: 'Aegis Stage Lounge', category: 'voice', role: 'Voice stage', dept: 'Lounge', lastMsg: 'Dr. Raymond started live stage stream.', timestamp: 'June 08', unread: 0, status: 'online', type: 'voice', voiceActive: true }
];

function MessagesIndexPageContent() {
  const { currentUser } = useConnect();
  
  // State management
  const [chatThreads, setChatThreads] = useState(initialChatThreads);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'dm', 'faculty', 'students', 'departments', 'research', 'communities', 'voice', 'meetings', 'ai'

  // Composer States
  const [composerText, setComposerText] = useState('');
  const [attachmentList, setAttachmentList] = useState([]);
  
  // Remote control states
  const [remoteControlActive, setRemoteControlActive] = useState(false);
  const [remoteControlStatus, setRemoteControlStatus] = useState('Idle'); // 'Idle' | 'Requesting' | 'Controlling'
  const [mouseTracePoints, setMouseTracePoints] = useState([]);
  
  // Custom WebRTC Meeting modal state
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [activeMeetingRoom, setActiveMeetingRoom] = useState(null);

  // Messages logs dictionary
  const [chatLogs, setChatLogs] = useState({
    'ai_copilot': [
      { sender: 'Aegis AI Copilot', text: 'Hello Aria! I am your research assistant. Ask me anything about university ledgers or citation details.', timestamp: '10:15 AM' },
      { sender: 'Aria Nakamura', text: 'Can you summarize the consensus parameter latency results?', timestamp: '10:18 AM' },
      { sender: 'Aegis AI Copilot', text: '🤖 **Aegis AI Research Summary**:\n• **Context**: Highlights core developments of university network parameters.\n• **Action Item**: Immediate updates to collaborative channels are recommended.\n• **Metric Projections**: Calculations indicate a potential +12% efficiency index increase.', timestamp: '10:20 AM' }
    ],
    'usr_001': [
      { sender: 'Dr. Raymond Park', text: 'Aria, we need to finalize the paper submission today.', timestamp: '10:00 AM' },
      { sender: 'Dr. Raymond Park', text: 'Please submit the consensus draft review by tonight.', timestamp: '10:30 AM' }
    ]
  });

  // Handle active thread selection
  const selectConversation = (thread) => {
    setSelectedChatId(thread.id);
    setSelectedChat(thread);
  };

  // Add message to chat log
  const handleSendMessage = () => {
    if (!composerText.trim() && attachmentList.length === 0) return;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      sender: 'Aria Nakamura',
      text: composerText,
      timestamp: timeStr,
      attachments: [...attachmentList]
    };

    setChatLogs(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg]
    }));
    setComposerText('');
    setAttachmentList([]);

    // Update last message in cards list
    setChatThreads(prev => prev.map(t => {
      if (t.id === selectedChatId) {
        return { ...t, lastMsg: composerText || 'Sent attachment' };
      }
      return t;
    }));

    // Trigger mock reply from AI
    if (selectedChatId === 'ai_copilot') {
      setTimeout(() => {
        const replyMsg = {
          sender: 'Aegis AI Copilot',
          text: '🤖 **Aegis Node Insights**:\nYour parameters have been logged and synced. Let me know if you would like me to output consensus telemetry metrics.',
          timestamp: 'Just now'
        };
        setChatLogs(prev => ({
          ...prev,
          [selectedChatId]: [...(prev[selectedChatId] || []), replyMsg]
        }));
      }, 1000);
    }
  };

  // Add dummy file attachments
  const attachMockFile = (fileName) => {
    setAttachmentList([...attachmentList, { name: fileName, size: '2.4 MB' }]);
  };

  // Remote Control Handlers
  const handleRequestControl = () => {
    setRemoteControlStatus('Requesting');
    setRemoteControlActive(true);
    setTimeout(() => {
      setRemoteControlStatus('Controlling');
    }, 1800);
  };

  const handleStopControl = () => {
    setRemoteControlActive(false);
    setRemoteControlStatus('Idle');
    setMouseTracePoints([]);
  };

  // Capture virtual mouse tracks
  const handleMouseOverScreen = (e) => {
    if (remoteControlStatus !== 'Controlling') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMouseTracePoints(prev => {
      const next = [...prev, { x, y, id: Date.now() }];
      if (next.length > 5) next.shift();
      return next;
    });
  };

  // Start Meeting UI
  const launchMeetingRoom = (roomName) => {
    setActiveMeetingRoom(roomName);
    setShowMeetingModal(true);
  };

  // Filters logic
  const filteredThreads = chatThreads.filter(thread => {
    // Search query match
    const queryMatch = thread.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       thread.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       thread.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!queryMatch) return false;

    // Category filter match
    if (activeCategory === 'all') return true;
    if (activeCategory === 'dm') return thread.type === 'user';
    if (activeCategory === 'faculty') return thread.category === 'faculty';
    if (activeCategory === 'students') return thread.category === 'students';
    if (activeCategory === 'departments') return thread.category === 'departments';
    if (activeCategory === 'research') return thread.category === 'research';
    if (activeCategory === 'communities') return thread.category === 'communities';
    if (activeCategory === 'voice') return thread.category === 'voice';
    if (activeCategory === 'meetings') return thread.meetingActive;
    if (activeCategory === 'ai') return thread.category === 'ai';

    return true;
  });

  return (
    <div className="messages-main-container select-none connect-font-inter">
      
      {/* 1. LEFT SIDEBAR (320px) - Fixed Positioning */}
      <aside className="w-[320px] bg-[#071126] border-r border-white/5 flex flex-col justify-between h-full fixed top-0 bottom-0 left-0 z-50 left-sidebar-navigation py-6 px-4">
        <div className="flex flex-col gap-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 mb-2 px-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-primary to-indigo-500 flex items-center justify-center glow-accent">
              <span className="font-display font-extrabold text-lg text-white">AC</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase large-branding-text">
              AEGIS CONNECT
            </span>
          </div>

          {/* Create New CTA */}
          <button 
            onClick={() => {
              const newName = prompt("Enter conversation recipient or channel name:");
              if (newName) {
                const newId = 'ch_' + Date.now();
                const newThread = {
                  id: newId,
                  name: newName,
                  category: 'students',
                  role: 'Direct Chat',
                  dept: 'Student Forum',
                  lastMsg: 'Thread initialized. Write a message.',
                  timestamp: 'Just now',
                  unread: 0,
                  status: 'online',
                  type: 'user'
                };
                setChatThreads([newThread, ...chatThreads]);
                setSelectedChatId(newId);
                setSelectedChat(newThread);
              }
            }}
            className="w-full h-16 rounded-[20px] bg-brand-primary hover:brightness-110 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer glow-accent cta-create-btn"
            style={{ boxShadow: '0 0 30px rgba(99,102,241,.35)' }}
          >
            <Plus className="w-5 h-5 shrink-0" />
            <span>New Conversation</span>
          </button>

          {/* Navigation link roster */}
          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[50vh] pr-1 chat-scroll text-xs">
            {[
              { id: 'feed', label: 'Feed', icon: Compass },
              { id: 'messages', label: 'Messages', icon: MessageSquare, active: true },
              { id: 'communities', label: 'Communities', icon: Users },
              { id: 'research', label: 'Research', icon: FlaskConical },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'calling', label: 'Video Calling', icon: Video },
              { id: 'voice', label: 'Voice Rooms', icon: Volume2 },
              { id: 'meetings', label: 'Meetings', icon: Radio },
              { id: 'tasks', label: 'Task Board', icon: CheckSquare },
              { id: 'polls', label: 'Campus Polls', icon: BarChart2 },
              { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((link) => {
              const LinkIcon = link.icon;
              return (
                <button
                  key={link.id}
                  className={`w-full py-3 px-4 rounded-[20px] flex items-center gap-3 transition-all relative font-bold text-left cursor-pointer border border-transparent ${
                    link.active 
                      ? 'bg-indigo-500/15 text-white font-extrabold' 
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {link.active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#6366F1] rounded-r-md" />
                  )}
                  <LinkIcon className={`w-5 h-5 shrink-0 ${link.active ? 'text-[#6366F1]' : 'text-slate-400'}`} />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Docked User Profile details */}
        <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-white/10 object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#071126]"></span>
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-xs font-extrabold text-white truncate">Aria Nakamura</span>
              <span className="text-[9px] text-slate-400 truncate font-semibold">Student Delegate • CS</span>
            </div>
          </div>

          <button 
            onClick={() => {
              if (confirm("Sign out of Aegis session?")) window.location.href = "/auth";
            }}
            className="p-2 bg-[#102043]/30 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 rounded-xl transition-all cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MIDDLE PANEL (420px): Conversation List */}
      <section 
        className="w-[420px] bg-[#0B1736] border-r border-white/5 flex flex-col h-full overflow-hidden shrink-0"
        style={{ marginLeft: '320px' }} // Offsets the fixed left sidebar
      >
        {/* Header Section */}
        <div className="p-4 border-b border-white/5 bg-[#102043]/20 flex flex-col gap-3 shrink-0">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Messages Workspace</h2>
            <span className="text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded font-mono font-bold">
              {filteredThreads.length} active
            </span>
          </div>

          {/* Custom Search Box */}
          <div className="h-14 bg-[#102043] rounded-[18px] px-3.5 flex items-center gap-2 border border-white/5">
            <Search className="w-4.5 h-4.5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 outline-none font-semibold"
            />
            <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors">
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable category pill list */}
        <div className="flex gap-2 overflow-x-auto p-3 border-b border-white/5 bg-[#071126]/30 scrollbar-none shrink-0 scroll-smooth">
          {[
            { id: 'all', label: 'All' },
            { id: 'dm', label: 'Direct Messages' },
            { id: 'faculty', label: 'Faculty' },
            { id: 'students', label: 'Students' },
            { id: 'departments', label: 'Departments' },
            { id: 'research', label: 'Research Groups' },
            { id: 'communities', label: 'Communities' },
            { id: 'voice', label: 'Voice Rooms' },
            { id: 'meetings', label: 'Meetings' },
            { id: 'ai', label: 'AI Assistant' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                activeCategory === cat.id 
                  ? 'bg-brand-primary text-white border-transparent' 
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vertical conversations scroll feed */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 chat-scroll">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">No conversations matched your search tags.</div>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = selectedChatId === thread.id;
              
              // Status ring helper
              let statusColor = 'border-slate-500';
              if (thread.status === 'online') statusColor = 'border-emerald-500';
              else if (thread.status === 'busy') statusColor = 'border-rose-500';
              else if (thread.status === 'meeting') statusColor = 'border-indigo-500 animate-pulse';

              return (
                <div
                  key={thread.id}
                  onClick={() => selectConversation(thread)}
                  className={`w-full h-[88px] p-4 rounded-[18px] flex items-center justify-between border cursor-pointer transition-all duration-150 ${
                    isActive 
                      ? 'bg-brand-primary/10 border-brand-primary/20 text-white' 
                      : 'bg-[#102043]/30 border-white/5 hover:bg-white/[0.02] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* User profile avatar / channel icon */}
                    <div className="relative shrink-0">
                      {thread.type === 'ai' ? (
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
                        </div>
                      ) : thread.type === 'channel' ? (
                        <div className="w-10 h-10 rounded-xl bg-[#102043] border border-white/5 text-slate-300 flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                      ) : (
                        <img 
                          src={`https://images.unsplash.com/photo-${thread.id === 'usr_001' ? '1534528741775-53994a69daeb' : (thread.id === 'usr_005' ? '1500648767791-00dcc994a43e' : '1507003211169-0a1dd7228f2d')}?w=150`} 
                          alt="" 
                          className="w-10 h-10 rounded-full object-cover border border-white/10" 
                        />
                      )}
                      
                      {thread.type !== 'channel' && (
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B1736] ${statusColor}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-white truncate pr-2">{thread.name}</span>
                        <span className="text-[9px] text-slate-500 font-medium shrink-0">{thread.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mt-0.5 text-[9px] font-semibold text-slate-400">
                        <span>{thread.role}</span>
                        <span className="text-white/30">•</span>
                        <span className="truncate">{thread.dept}</span>
                      </div>

                      {/* Msg text / typing state */}
                      <p className={`text-[10px] truncate mt-1 ${thread.typing ? 'text-[#6366F1] font-bold italic' : 'text-slate-400'}`}>
                        {thread.typing ? 'Carlos is typing...' : thread.lastMsg}
                      </p>
                    </div>
                  </div>

                  {/* Actions / indicators */}
                  <div className="flex flex-col gap-1 items-end shrink-0 pl-2">
                    {thread.unread > 0 && (
                      <span className="bg-brand-primary text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0">
                        {thread.unread}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      {thread.meetingActive && <Video className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />}
                      {thread.voiceActive && <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 3. MIDDLE CHAT STREAM AREA (Flexible 1fr) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#071126]/40 relative border-r border-white/5">
        <AnimatePresence mode="wait">
          {!selectedChatId ? (
            // Animated empty state
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 glow-accent">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h2 className="text-base font-extrabold text-white">Select a Conversation</h2>
              <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
                Collaborate with students, faculty, researchers, and campus communities using secure blockchain attestation channels.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-xs">
                <button 
                  onClick={() => selectConversation(chatThreads[0])}
                  className="py-2.5 px-4 bg-[#102043]/50 hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
                >
                  Start Chat
                </button>
                <button 
                  onClick={() => alert("Simulate Create Group")}
                  className="py-2.5 px-4 bg-[#102043]/50 hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
                >
                  Create Group
                </button>
                <button 
                  onClick={() => alert("Simulate Join Community")}
                  className="py-2.5 px-4 bg-[#102043]/50 hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
                >
                  Join Community
                </button>
                <button 
                  onClick={() => launchMeetingRoom('Consensus review')}
                  className="py-2.5 px-4 bg-brand-primary text-white rounded-xl text-xs font-bold cursor-pointer hover:brightness-110 transition-all"
                >
                  Schedule Meeting
                </button>
              </div>
            </motion.div>
          ) : (
            // Chat workspace
            <motion.div 
              key="chat-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              {/* Selected Conversation Header */}
              <header className="h-[70px] border-b border-white/5 bg-[#0B1736]/40 px-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    {selectedChat.type === 'ai' ? (
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-brand-primary" />
                      </div>
                    ) : selectedChat.type === 'channel' ? (
                      <div className="w-10 h-10 rounded-xl bg-[#102043] border border-white/5 text-slate-300 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                    ) : (
                      <img 
                        src={`https://images.unsplash.com/photo-${selectedChat.id === 'usr_001' ? '1534528741775-53994a69daeb' : (selectedChat.id === 'usr_005' ? '1500648767791-00dcc994a43e' : '1507003211169-0a1dd7228f2d')}?w=150`} 
                        alt="" 
                        className="w-10 h-10 rounded-full object-cover border border-white/10" 
                      />
                    )}
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">{selectedChat.name}</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5 truncate font-semibold">
                      {selectedChat.role} • {selectedChat.dept}
                    </p>
                  </div>
                </div>

                {/* Actions Header Bar */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert("Starting secure peer voice call...")}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 cursor-pointer transition-colors" 
                    title="Voice Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => launchMeetingRoom(`Meet: ${selectedChat.name}`)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 cursor-pointer transition-colors" 
                    title="Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert("Initializing video stream share...")}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 cursor-pointer transition-colors" 
                    title="Screen Share"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleRequestControl}
                    className={`p-2 rounded-xl transition-all cursor-pointer border ${
                      remoteControlActive 
                        ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' 
                        : 'bg-white/5 border-transparent text-slate-300 hover:bg-white/10'
                    }`}
                    title="Remote Control"
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                  <span className="w-[1px] h-6 bg-white/10 mx-1"></span>
                  <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                    <MoreVertical className="w-4.5 h-4.5" />
                  </button>
                </div>
              </header>

              {/* Viewport for Remote control if activated */}
              {remoteControlActive && (
                <div className="h-[220px] bg-black/40 border-b border-white/5 p-3 flex flex-col shrink-0">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 mb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Cpu className="w-3.5 h-3.5 animate-pulse" /> Remote Control status: {remoteControlStatus}
                    </span>
                    <button 
                      onClick={handleStopControl}
                      className="px-2 py-0.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded text-[9px] font-bold border border-rose-500/20 cursor-pointer"
                    >
                      Stop Session
                    </button>
                  </div>
                  
                  {/* Virtual coordinate capture screen */}
                  <div 
                    onMouseMove={handleMouseOverScreen}
                    className="flex-1 rounded-xl bg-black/80 border border-white/5 relative overflow-hidden flex items-center justify-center"
                    style={{ cursor: 'crosshair' }}
                  >
                    <span className="text-[9px] font-mono text-slate-500">Virtual screen viewport (move cursor over to sync)</span>
                    
                    {/* Render active coordinates dots */}
                    {mouseTracePoints.map(dot => (
                      <div 
                        key={dot.id}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        style={{ left: dot.x, top: dot.y }}
                      >
                        <span className="absolute left-2.5 top-0 text-[8px] bg-black text-cyan-300 px-1 rounded font-mono border border-cyan-400/20">
                          X:{dot.x} Y:{dot.y}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Stream message roster scroll area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 chat-scroll">
                {(chatLogs[selectedChatId] || []).map((msg, i) => {
                  const isSelf = msg.sender === 'Aria Nakamura';
                  return (
                    <div key={i} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex gap-2.5 max-w-[80%] items-start">
                        {!isSelf && (
                          <div className="w-7 h-7 rounded-full bg-[#102043] border border-white/5 flex items-center justify-center text-[10px] font-bold text-indigo-400 shrink-0">
                            {msg.sender.substring(0, 2)}
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-baseline text-[9px] text-slate-500 font-bold px-1">
                            <span>{msg.sender}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          
                          <div className={`p-3 rounded-2xl text-xs text-left leading-relaxed ${
                            isSelf 
                              ? 'bg-brand-primary text-white rounded-tr-none' 
                              : 'bg-[#102043] border border-white/5 text-slate-200 rounded-tl-none'
                          }`}>
                            {msg.text.split('\n').map((line, idx) => (
                              <p key={idx} className={idx > 0 ? 'mt-1' : ''}>{line}</p>
                            ))}

                            {/* Render attachment blocks */}
                            {msg.attachments && msg.attachments.map((file, fIdx) => (
                              <div key={fIdx} className="mt-2.5 p-2 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between text-[10px]">
                                <span className="font-bold flex items-center gap-1.5 truncate text-slate-200">
                                  <Paperclip className="w-3.5 h-3.5 text-indigo-400" /> {file.name}
                                </span>
                                <span className="text-[8px] text-slate-500 shrink-0 pl-2">{file.size}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Composer Area */}
              <div className="p-4 border-t border-white/5 bg-[#0B1736]/40 flex flex-col gap-2 shrink-0">
                {/* Active attachments panel */}
                {attachmentList.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1.5 border-b border-white/5 mb-1 text-[10px]">
                    {attachmentList.map((file, idx) => (
                      <div key={idx} className="bg-[#102043] p-1.5 rounded-xl border border-white/5 flex items-center gap-1.5 text-slate-300">
                        <span>{file.name}</span>
                        <button 
                          onClick={() => setAttachmentList(attachmentList.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold hover:text-white"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {/* Action attachments drop selectors */}
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <button 
                      onClick={() => attachMockFile('research_proposal.pdf')}
                      className="p-2 hover:bg-white/5 rounded-xl hover:text-white cursor-pointer transition-colors"
                      title="Upload PDF Files"
                    >
                      <Paperclip className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => attachMockFile('sensor_dataset.csv')}
                      className="p-2 hover:bg-white/5 rounded-xl hover:text-white cursor-pointer transition-colors"
                      title="Attach Research Data"
                    >
                      <ImageIcon className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => alert("Simulate Emoji Tray")}
                      className="p-2 hover:bg-white/5 rounded-xl hover:text-white cursor-pointer transition-colors"
                      title="Add Emoji"
                    >
                      <Smile className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => {
                        setComposerText(prev => prev + " 🤖 Aegis AI: [Latency verified at 12ms. block node confirm stable.]");
                      }}
                      className="p-2 hover:bg-indigo-500/10 hover:text-brand-primary rounded-xl cursor-pointer transition-colors flex items-center gap-1"
                      title="AI Copilot Assist"
                    >
                      <Sparkles className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Input field */}
                  <input 
                    type="text"
                    placeholder="Type message, press enter to send..."
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-[#102043] border border-white/5 rounded-[18px] py-3 px-4 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-primary/40 font-semibold"
                  />

                  {/* CTA Submit Button */}
                  <button 
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-[18px] bg-brand-primary hover:brightness-110 text-white flex items-center justify-center cursor-pointer transition-all shrink-0"
                  >
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. DETAILS SIDEBAR PANEL (360px) */}
      <aside className="w-[360px] bg-[#0B1736] border-l border-white/5 flex flex-col h-full overflow-hidden shrink-0 details-panel-sidebar">
        <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Details & Roster</span>
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 chat-scroll">
          {selectedChat ? (
            <>
              {/* Profile card summary */}
              <div className="flex flex-col items-center text-center p-4 bg-[#102043]/30 border border-white/5 rounded-[20px] gap-3">
                <div className="relative">
                  {selectedChat.type === 'ai' ? (
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-brand-primary" />
                    </div>
                  ) : (
                    <img 
                      src={`https://images.unsplash.com/photo-${selectedChat.id === 'usr_001' ? '1534528741775-53994a69daeb' : (selectedChat.id === 'usr_005' ? '1500648767791-00dcc994a43e' : '1507003211169-0a1dd7228f2d')}?w=150`} 
                      alt="" 
                      className="w-16 h-16 rounded-full object-cover border border-white/10" 
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">{selectedChat.name}</h4>
                  <p className="text-[10px] text-indigo-400 font-bold tracking-wide mt-1 uppercase bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                    {selectedChat.role}
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1.5">{selectedChat.dept}</p>
                </div>
              </div>

              {/* Shared Files list */}
              <div className="bg-[#102043]/30 border border-white/5 rounded-[20px] p-4 flex flex-col gap-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Shared documents</h4>
                <div className="flex flex-col gap-2 text-[10px] text-slate-300">
                  {[
                    { name: 'Consensus_Parameter_Review.pdf', size: '2.4 MB' },
                    { name: 'Study_Plan_CS202.pdf', size: '1.2 MB' }
                  ].map((file, idx) => (
                    <div key={idx} className="p-2.5 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="truncate pr-2">{file.name}</span>
                      <span className="text-[8px] text-slate-500 shrink-0">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shared Research project ledger files */}
              <div className="bg-[#102043]/30 border border-white/5 rounded-[20px] p-4 flex flex-col gap-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Blockchain Attestations</h4>
                <div className="flex flex-col gap-2 font-mono text-[9px] text-slate-300">
                  <div className="p-2.5 bg-black/20 rounded-xl border border-white/5 flex flex-col gap-1 text-left">
                    <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Identity Hash Verified</span>
                    <p className="truncate text-slate-500">did:aegis:usr_001</p>
                  </div>
                </div>
              </div>

              {/* Relationship visual graph - Animated nodes diagram */}
              <div className="bg-[#102043]/30 border border-white/5 rounded-[20px] p-4 flex flex-col gap-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Visual Network Nodes Map</h4>
                
                {/* SVG node graph mapping Aria to selected chat */}
                <div className="h-28 bg-black/20 rounded-xl relative border border-white/5 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full absolute inset-0 z-0">
                    {/* Connecting line */}
                    <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="rgba(99,102,241,0.4)" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>
                  
                  {/* Local node dot */}
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-8 h-8 rounded-full border border-indigo-400 bg-[#102043] flex items-center justify-center text-[9px] font-bold text-white shadow-lg shadow-indigo-900/30">
                      Aria
                    </div>
                  </div>

                  {/* Peer node dot */}
                  <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-8 h-8 rounded-full border border-cyan-400 bg-[#071126] flex items-center justify-center text-[9px] font-bold text-cyan-400 shadow-lg shadow-cyan-900/30">
                      Peer
                    </div>
                  </div>

                  {/* Sync status overlay */}
                  <span className="absolute bottom-2 text-[8px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Consensus verified peer-link active
                  </span>
                </div>
              </div>
            </>
          ) : (
            // Select view default details
            <div className="text-center py-8 text-slate-500 text-xs">Select a conversation thread to view detail properties.</div>
          )}
        </div>
      </aside>

      {/* 5. VIRTUAL WEBRTC MEETING MODAL INTERCEPT (Simulates Mediasoup call) */}
      <AnimatePresence>
        {showMeetingModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[1000] p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0B1736] border border-white/10 rounded-[20px] max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative"
            >
              {/* Meeting Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                <span className="text-xs font-extrabold text-white tracking-wide uppercase flex items-center gap-1.5">
                  <Video className="w-4.5 h-4.5 text-cyan-400 animate-pulse" /> Meeting room consensus session
                </span>
                <button 
                  onClick={() => setShowMeetingModal(false)}
                  className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Meeting body simulator */}
              <div className="p-6 flex flex-col gap-4 text-center">
                <div className="h-44 bg-[#050b1a] rounded-xl relative overflow-hidden border border-white/5 flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-1.5 items-end mb-2">
                    <span className="waveform-bar h-8 bg-indigo-500"></span>
                    <span className="waveform-bar h-12 bg-indigo-500"></span>
                    <span className="waveform-bar h-6 bg-indigo-500"></span>
                    <span className="waveform-bar h-10 bg-indigo-500"></span>
                  </div>
                  <span className="text-xs font-extrabold text-white">Consensus Peer Audio Room</span>
                  <span className="text-[9px] text-slate-500 font-mono">Broadcasting WebRTC SDP payload...</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      alert("Attestation certificate signed on Aegis Chain node ledger.");
                      setShowMeetingModal(false);
                    }}
                    className="px-6 py-2.5 bg-brand-primary hover:brightness-110 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Confirm & Join Securely
                  </button>
                  <button 
                    onClick={() => setShowMeetingModal(false)}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function MessagesIndexPage() {
  return (
    <ConnectProvider>
      <MessagesIndexPageContent />
    </ConnectProvider>
  );
}
