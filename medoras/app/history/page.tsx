'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Plus, Trash2, MessageSquare, ChevronLeft, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface Message { id: string; role: string; content: string; timestamp: Date; }
interface Chat { id: string; title: string; messages: Message[]; createdAt: Date; }

const STORAGE_KEY = 'karlx-chats-v2';

function loadChats(): Chat[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((c: Chat) => ({
      ...c, createdAt: new Date(c.createdAt),
      messages: c.messages.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })),
    }));
  } catch { return []; }
}
function saveChats(chats: Chat[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}
function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Baru saja';
  if (mins < 60) return `${mins}m lalu`;
  if (hours < 24) return `${hours}j lalu`;
  if (days === 1) return 'Kemarin';
  return `${days} hari lalu`;
}
function groupChatsByDate(chats: Chat[]) {
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate()-1);
  const week = new Date(today); week.setDate(week.getDate()-7);
  const groups: { label: string; chats: Chat[] }[] = [
    { label: 'Hari Ini', chats: [] }, { label: 'Kemarin', chats: [] },
    { label: '7 Hari Terakhir', chats: [] }, { label: 'Lebih Lama', chats: [] },
  ];
  chats.forEach(c => {
    const d = new Date(c.createdAt); d.setHours(0,0,0,0);
    if (d >= today) groups[0].chats.push(c);
    else if (d >= yesterday) groups[1].chats.push(c);
    else if (d >= week) groups[2].chats.push(c);
    else groups[3].chats.push(c);
  });
  return groups.filter(g => g.chats.length > 0);
}

export default function HistoryPage() {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => { setChats(loadChats()); }, []);

  const filtered = query ? chats.filter(c => c.title.toLowerCase().includes(query.toLowerCase())) : chats;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = chats.filter(c => c.id !== id);
    setChats(updated); saveChats(updated);
  };

  const handleOpen = (id: string) => {
    localStorage.setItem('karlx-active-chat', id);
    router.push('/chat');
  };

  const handleNewChat = () => {
    const newChat: Chat = { id: Date.now().toString(), title: 'Chat Baru', messages: [], createdAt: new Date() };
    saveChats([newChat, ...chats]);
    localStorage.setItem('karlx-active-chat', newChat.id);
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ maxWidth: '500px', margin: '0 auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-10 pb-2">
        <button onClick={() => router.push('/chat')}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-white/30 hover:text-white hover:bg-white/6 transition-all -ml-2">
          <ChevronLeft size={19} />
        </button>
        <Logo size="sm" />
        <div className="w-9" />
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-5 stagger">
        <h1 className="font-bold text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem' }}>
          Obrolan
        </h1>
        <p className="text-white/25 text-sm mt-1">{chats.length} percakapan tersimpan</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search size={14} className="text-white/25 flex-shrink-0" />
          <input type="text" placeholder="Cari percakapan…" value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-white"
            style={{ fontFamily: 'var(--font-body)', '::placeholder': { color: 'rgba(255,255,255,0.2)' } } as React.CSSProperties} />
          {query && (
            <button onClick={() => setQuery('')} className="text-white/20 hover:text-white/50 transition-colors">
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 px-3 overflow-y-auto pb-36">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <MessageSquare size={20} className="text-white/15" />
            </div>
            <p className="text-white/25 text-sm">{query ? 'Tidak ditemukan' : 'Belum ada percakapan'}</p>
          </div>
        ) : query ? (
          <div className="space-y-1">
            {filtered.map(chat => <ChatItem key={chat.id} chat={chat} onOpen={handleOpen} onDelete={handleDelete} />)}
          </div>
        ) : (
          groupChatsByDate(filtered).map(group => (
            <div key={group.label} className="mb-6">
              <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase px-2 mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}>{group.label}</p>
              <div className="space-y-1">
                {group.chats.map(chat => <ChatItem key={chat.id} chat={chat} onOpen={handleOpen} onDelete={handleDelete} />)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5" style={{ width: '100%', maxWidth: '500px' }}>
        <button onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-semibold text-black text-sm transition-all hover:opacity-88 active:scale-98"
          style={{ background: '#ffffff', fontFamily: "'Syne', sans-serif', boxShadow: '0 8px 32px rgba(255,255,255,0.08)'" }}>
          <Plus size={17} /> Chat baru
        </button>
      </div>
    </div>
  );
}

function ChatItem({ chat, onOpen, onDelete }: { chat: Chat; onOpen: (id: string) => void; onDelete: (id: string, e: React.MouseEvent) => void }) {
  return (
    <div onClick={() => onOpen(chat.id)}
      className="group flex items-center gap-3.5 px-3.5 py-4 rounded-2xl cursor-pointer transition-all"
      style={{ background: 'transparent' }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <MessageSquare size={14} className="text-white/30" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white/75 truncate">{chat.title}</p>
        <p className="text-xs text-white/25 mt-0.5">{timeAgo(chat.createdAt)}</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={(e) => onDelete(chat.id, e)}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-white/25 hover:text-white/60 hover:bg-white/8 transition-all flex-shrink-0">
          <Trash2 size={13} />
        </button>
        <ArrowRight size={13} className="text-white/15 group-hover:text-white/35 transition-colors flex-shrink-0" />
      </div>
    </div>
  );
}
