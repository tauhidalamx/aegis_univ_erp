'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ConnectContext = createContext(null);

export function ConnectProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'explore' | 'communities' | 'research' | 'messages' | 'notifications' | 'bookmarks' | 'events' | 'achievements' | 'profile'
  
  // Database States
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [polls, setPolls] = useState([]);
  
  // Sub-feed tab
  const [activeSubFeed, setActiveSubFeed] = useState('all'); // 'all' | 'student' | 'faculty' | 'research' | 'campus' | 'placement' | 'club' | 'achievement'

  // Social Bookmarks
  const [savedPostIds, setSavedPostIds] = useState(new Set());

  // AI Summary States
  const [aiSummaries, setAiSummaries] = useState({});
  const [summarizingPostId, setSummarizingPostId] = useState(null);

  // Sharing states
  const [sharingPostId, setSharingPostId] = useState(null);

  // Discord Style Communities
  const [activeCommunityId, setActiveCommunityId] = useState('dept_cs'); // 'dept_cs', 'ai_res', 'blockchain', etc.
  const [activeCommunityTab, setActiveCommunityTab] = useState('chat'); // 'chat' | 'resources' | 'members'
  const [activeCommunityChannel, setActiveCommunityChannel] = useState('general');

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n1', type: 'like', text: 'Alex Rivera liked your research proposal.', userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', time: '10m ago', unread: true },
    { id: 'n2', type: 'cite', text: 'Your paper on Blockchain ERP was cited by Dr. Raymond Park.', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', time: '1h ago', unread: true },
    { id: 'n3', type: 'mention', text: 'Prof. Marcus Chen mentioned you in cs202-data-structures.', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', time: '3h ago', unread: false },
    { id: 'n4', type: 'invite', text: 'You have been invited to join the AI Research Community.', userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', time: 'Yesterday', unread: false },
    { id: 'n5', type: 'placement', text: 'Placement Cell uploaded a new opportunity at Meta.', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', time: '2 days ago', unread: false }
  ]);

  // Floating Messenger States
  const [messengerOpen, setMessengerOpen] = useState(false);
  const [activeChatChannel, setActiveChatChannel] = useState('channel_general'); // channel_general, ai_chat, user_id
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState({
    'channel_general': [
      { id: 'm1', senderName: 'Dr. Raymond Park', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', text: 'Welcome to the Aegis Connect central communications channel.', time: '10:15 AM', reactions: { '👍': 4, '🔥': 2 }, read: true },
      { id: 'm2', senderName: 'Aria Nakamura', senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', text: 'Has anyone downloaded the CS202 guidelines?', time: '10:18 AM', reactions: { '🙌': 2 }, read: true }
    ],
    'ai_chat': [
      { id: 'aim1', senderName: 'Aegis AI Bot', senderAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150', text: 'Hello! I am your research assistant. Ask me anything about university ledgers or citation details.', time: 'Just now', read: true }
    ]
  });

  // Call states
  const [activeCallUser, setActiveCallUser] = useState(null);
  const [callStatus, setCallStatus] = useState('Disconnected'); // 'Ringing' | 'Connecting' | 'Connected' | 'Disconnected'
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('post'); // 'post' | 'task' | 'poll'

  // Stories
  const [allStories, setAllStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // Load Session User
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('aegis_erp_session');
      if (session) {
        setCurrentUser(JSON.parse(session));
      } else {
        // Fallback demo user
        setCurrentUser({
          id: 'usr_003',
          name: 'Aria Nakamura',
          role: 'student',
          email: 'student@aegis.edu',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          dept: 'Computer Science'
        });
      }
    }
  }, []);

  // Fetch API Database
  const loadFeed = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error('Error fetching posts:', e);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error('Error fetching users:', e);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      console.error('Error fetching tasks:', e);
    }
  };

  const loadPolls = async () => {
    try {
      const res = await fetch('/api/polls');
      const data = await res.json();
      setPolls(data);
    } catch (e) {
      console.error('Error fetching polls:', e);
    }
  };

  useEffect(() => {
    loadUsers();
    loadFeed();
    loadTasks();
    loadPolls();
  }, []);

  // Sync Stories
  useEffect(() => {
    if (users.length > 0 && currentUser) {
      const images = [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600",
        "https://images.unsplash.com/photo-1498243691581-b148c3761a46?w=600"
      ];
      
      const storyTypes = ['Student', 'Faculty', 'Department', 'Research', 'Club', 'Event'];
      
      const mockStories = users
        .filter(u => u.id !== currentUser.id)
        .slice(0, 10)
        .map((u, index) => ({
          userId: u.id,
          userName: u.name,
          userAvatar: u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          mediaUrl: images[index % images.length],
          type: storyTypes[index % storyTypes.length] + ' Story',
          timestamp: `${(index + 1) * 2}h ago`
        }));
      setAllStories(mockStories);
    }
  }, [users, currentUser]);

  // Handle Post Likes
  const handleLike = async (postId) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id })
      });
      const data = await res.json();
      
      // Local state toggle update
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const currentLikes = post.likes || [];
          const updatedLikes = currentLikes.includes(currentUser.id)
            ? currentLikes.filter(uid => uid !== currentUser.id)
            : [...currentLikes, currentUser.id];
          return {
            ...post,
            likes: updatedLikes,
            likes_count: data.liked ? (post.likes_count + 1) : Math.max(0, post.likes_count - 1)
          };
        }
        return post;
      }));
    } catch (e) {
      console.error('Like failed:', e);
    }
  };

  // Add Comment
  const handleCommentSubmit = async (postId, content) => {
    if (!currentUser || !content.trim()) return;
    try {
      await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id, content })
      });
      loadFeed();
    } catch (e) {
      console.error('Comment failed:', e);
    }
  };

  // Save Bookmarks
  const handleSavePost = (postId) => {
    setSavedPostIds(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  // AI Summary Generator
  const runAiSummary = (postId) => {
    if (summarizingPostId) return;
    setSummarizingPostId(postId);

    setTimeout(() => {
      const summaryContent = `🤖 **Aegis AI Research Summary**:\n\n` +
        `• **Context**: Highlights core developments of university network parameters.\n` +
        `• **Action Item**: Immediate updates to collaborative channels are recommended.\n` +
        `• **Metric Projections**: Calculations indicate a potential +12% efficiency index increase.`;
      
      setAiSummaries(prev => ({
        ...prev,
        [postId]: summaryContent
      }));
      setSummarizingPostId(null);
    }, 1200);
  };

  // Chat Send Message
  const handleChatSend = () => {
    if (!chatInput.trim() || !currentUser) return;
    const msgId = 'm_' + Date.now();
    const newMsg = {
      id: msgId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: chatInput,
      time: 'Just now',
      reactions: {},
      read: false
    };

    setChatMessages(prev => ({
      ...prev,
      [activeChatChannel]: [...(prev[activeChatChannel] || []), newMsg]
    }));
    setChatInput('');

    // AI bot reply triggers
    if (activeChatChannel === 'ai_chat') {
      setTimeout(() => {
        const replyMsg = {
          id: 'ai_m_' + Date.now(),
          senderName: 'Aegis AI Bot',
          senderAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150',
          text: `🤖 **Aegis RAG Insights**:\nParsed your request regarding general university queries. If you need details about students, faculty workloads, or grades, please specify the courses or department name.`,
          time: 'Just now',
          reactions: {},
          read: true
        };
        setChatMessages(prev => ({
          ...prev,
          [activeChatChannel]: [...(prev[activeChatChannel] || []), replyMsg]
        }));
      }, 1000);
    }
  };

  return (
    <ConnectContext.Provider value={{
      currentUser,
      activeView,
      setActiveView,
      
      users,
      posts,
      tasks,
      polls,
      loadFeed,
      loadTasks,
      loadPolls,
      
      activeSubFeed,
      setActiveSubFeed,
      
      savedPostIds,
      handleLike,
      handleCommentSubmit,
      handleSavePost,
      
      aiSummaries,
      summarizingPostId,
      runAiSummary,
      
      sharingPostId,
      setSharingPostId,

      activeCommunityId,
      setActiveCommunityId,
      activeCommunityTab,
      setActiveCommunityTab,
      activeCommunityChannel,
      setActiveCommunityChannel,
      
      notifications,
      setNotifications,
      
      messengerOpen,
      setMessengerOpen,
      activeChatChannel,
      setActiveChatChannel,
      chatSearchQuery,
      setChatSearchQuery,
      chatInput,
      setChatInput,
      chatMessages,
      setChatMessages,
      handleChatSend,
      
      activeCallUser,
      setActiveCallUser,
      callStatus,
      setCallStatus,
      isMuted,
      setIsMuted,
      isCamOff,
      setIsCamOff,
      
      isModalOpen,
      setIsModalOpen,
      modalTab,
      setModalTab,
      
      allStories,
      activeStoryIndex,
      setActiveStoryIndex,
      storyProgress,
      setStoryProgress
    }}>
      {children}
    </ConnectContext.Provider>
  );
}

export function useConnect() {
  return useContext(ConnectContext);
}
