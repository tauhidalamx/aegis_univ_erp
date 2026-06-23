'use client';

import React from 'react';
import { useConnect } from '../ConnectContext';
import { Bell, Heart, Quote, MessageSquare, Briefcase, Plus, X } from 'lucide-react';

export default function NotificationsDrawer() {
  const { notifications, setNotifications } = useConnect();

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotifIcon = (type) => {
    switch(type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-current" />;
      case 'cite':
        return <Quote className="w-4 h-4 text-indigo-400" />;
      case 'mention':
        return <MessageSquare className="w-4 h-4 text-cyan-400" />;
      case 'invite':
        return <Plus className="w-4 h-4 text-emerald-400" />;
      case 'placement':
        return <Briefcase className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="w-full max-w-[650px] bg-[#102043]/40 border border-white/5 rounded-[20px] p-6 text-left">
      <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-primary" />
          Social Notifications Desk
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-brand-primary hover:underline bg-transparent border-none outline-none"
          >
            Mark all read
          </button>
          <button 
            onClick={handleClearAll}
            className="text-xs font-bold text-slate-500 hover:text-white bg-transparent border-none outline-none"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-3.5 border rounded-2xl flex items-start justify-between gap-4 transition-all duration-150 border-white/5 hover:border-white/10 ${
                notif.unread ? 'bg-brand-primary/5 border-l-2 border-l-brand-primary' : 'bg-[#102043]/20'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img 
                    src={notif.userAvatar} 
                    alt="" 
                    className="w-9 h-9 rounded-full object-cover border border-white/10" 
                  />
                  <div className="absolute -bottom-1.5 -right-1.5 p-1 bg-[#0B1736] rounded-full border border-white/10 flex items-center justify-center">
                    {getNotifIcon(notif.type)}
                  </div>
                </div>
                <div className="flex flex-col text-left min-w-0 mt-0.5">
                  <p className="text-xs font-bold text-slate-200 leading-normal">
                    {notif.text}
                  </p>
                  <span className="text-[10px] font-semibold text-slate-500 mt-1">{notif.time}</span>
                </div>
              </div>

              {notif.unread && (
                <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-1.5" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-500 flex flex-col items-center gap-3">
            <Bell className="w-10 h-10 text-slate-600" />
            <span className="text-xs font-semibold">Your Notification center is currently empty.</span>
          </div>
        )}
      </div>

    </div>
  );
}
