'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Send, Plus, Trash2, Copy, Check, Code2, ImageIcon, X, ChevronLeft, ChevronRight, MessageSquare, PenSquare, HelpCircle, Mail, Github, LogOut, Sparkles } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { UserAvatar, AIAvatar } from '@/components/ui/Avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

function parseMarkdown(text: string): string {
  return text
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="code-block">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hupl])(.+)$/gm, (m) => m.startsWith('<') ? m : `<p>${m}</p>`);
}

function MessageBubble({ msg, onCopy }: { msg: Message; onCopy: (t: string) => void }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 px-5 py-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} msg-enter`}>
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? <UserAvatar size={28} /> : <AIAvatar size={28} />}
      </div>
      <div className={`flex flex-col gap-1.5 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Syne', sans-serif" }}>
          {isUser ? 'KAMU' : 'KARLX AI'}
        </span>
        {msg.image && (
          <img src={msg.image} alt="uploaded"
            className="rounded-xl max-w-xs max-h-52 object-cover border border-white/8 mb-1" />
        )}
        <div className={`text-sm leading-relaxed rounded-2xl ${isUser
          ? 'px-4 py-3 text-white rounded-tr-sm'
          : 'text-white/85 prose-ai'}`}
          style={isUser ? { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' } : {}}>
          {isUser
            ? <p className="whitespace-pre-wrap">{msg.content}</p>
            : <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />}
        </div>
        {!isUser && (
          <button
            onClick={() => { onCopy(msg.content); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="flex items-center gap-1.5 text-[11px] transition-colors mt-0.5 px-1"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? 'Disalin' : 'Salin'}
          </button>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 px-5 py-3.5 msg-enter">
      <div className="flex-shrink-0 mt-0.5"><AIAvatar size={28} /></div>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Syne', sans-serif" }}>KARLX AI</span>
        <div className="flex items-center gap-1.5 py-2 px-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30"
              style={{ animation: `typingBounce 1.2s ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const STORAGE_KEY = 'karlx-chats-v2';

function loadChats(): Chat[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((c: Chat) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      messages: c.messages.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })),
    }));
  } catch { return []; }
}

function saveChats(chats: Chat[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

function createNewChat(): Chat {
  return { id: Date.now().toString(), title: 'Chat Baru', messages: [], createdAt: new Date() };
}

function groupChatsByDate(chats: Chat[]) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const week = new Date(today); week.setDate(week.getDate() - 7);
  const groups: { label: string; chats: Chat[] }[] = [
    { label: 'Hari Ini', chats: [] },
    { label: 'Kemarin', chats: [] },
    { label: '7 Hari Terakhir', chats: [] },
    { label: 'Lebih Lama', chats: [] },
  ];
  chats.forEach(c => {
    const d = new Date(c.createdAt); d.setHours(0, 0, 0, 0);
    if (d >= today) groups[0].chats.push(c);
    else if (d >= yesterday) groups[1].chats.push(c);
    else if (d >= week) groups[2].chats.push(c);
    else groups[3].chats.push(c);
  });
  return groups.filter(g => g.chats.length > 0);
}

const SUGGESTIONS = [
  { icon: '✦', title: 'Debug kode', text: 'Bantu debug kode Python saya' },
  { icon: '✦', title: 'Tulis email', text: 'Tulis email profesional untuk klien' },
  { icon: '✦', title: 'Jelaskan konsep', text: 'Jelaskan konsep machine learning' },
  { icon: '✦', title: 'Analisis data', text: 'Analisis data dan buat kesimpulan' },
];

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<{ preview: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stored = loadChats();
    const activeId = localStorage.getItem('karlx-active-chat');
    if (activeId) localStorage.removeItem('karlx-active-chat');
    if (stored.length > 0) {
      setChats(stored);
      const target = activeId ? stored.find(c => c.id === activeId) : null;
      setActiveChatId(target ? target.id : stored[0].id);
    } else {
      const first = createNewChat();
      setChats([first]);
      setActiveChatId(first.id);
    }
  }, []);

  useEffect(() => { if (chats.length > 0) saveChats(chats); }, [chats]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chats, loading, activeChatId]);

  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat?.messages ?? [];
  const isEmpty = messages.length === 0;

  const handleNewChat = () => {
    const chat = createNewChat();
    setChats(prev => [chat, ...prev]);
    setActiveChatId(chat.id);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats(prev => {
      const updated = prev.filter(c => c.id !== id);
      if (id === activeChatId) {
        if (updated.length > 0) setActiveChatId(updated[0].id);
        else { const chat = createNewChat(); setActiveChatId(chat.id); return [chat]; }
      }
      return updated;
    });
  };

  const updateMessages = useCallback((id: string, msgs: Message[]) => {
    setChats(prev => prev.map(c => {
      if (c.id !== id) return c;
      const firstUser = msgs.find(m => m.role === 'user');
      const title = firstUser ? firstUser.content.slice(0, 40) + (firstUser.content.length > 40 ? '…' : '') : c.title;
      return { ...c, messages: msgs, title };
    }));
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage({ preview: reader.result as string });
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text && !image) return;
    if (loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, image: image?.preview, timestamp: new Date() };
    const updated = [...messages, userMsg];
    updateMessages(activeChatId, updated);
    setInput(''); setImage(null); setLoading(true);
    if (textRef.current) textRef.current.style.height = 'auto';
    try {
      const apiMessages = updated.map(m => ({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : '',
      }));
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: apiMessages }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      updateMessages(activeChatId, [...updated, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.choices?.[0]?.message?.content ?? 'Maaf, tidak ada respons.', timestamp: new Date() }]);
    } catch (err: unknown) {
      updateMessages(activeChatId, [...updated, { id: (Date.now() + 1).toString(), role: 'assistant', content: `⚠️ Gagal: ${err instanceof Error ? err.message : 'Error'}`, timestamp: new Date() }]);
    } finally { setLoading(false); }
  }, [input, image, loading, messages, activeChatId, updateMessages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const canSend = (input.trim() || !!image) && !loading;
  if (status === 'loading') {
     return (
       <div className="flex h-screen bg-black items-center justify-center">
       <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
    </div>
  );
}

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ animation: 'fadeIn 0.2s ease' }} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed md:relative top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 ease-out
        ${sidebarOpen ? 'w-[260px]' : 'w-0'} overflow-hidden flex-shrink-0`}
        style={{ background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.05)' }}>

        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 flex-shrink-0">
          <Logo size="sm" />
          <div className="flex items-center gap-0.5">
            <button onClick={handleNewChat}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all text-white/25 hover:text-white hover:bg-white/6"
              title="Chat baru">
              <PenSquare size={13} />
            </button>
            <button onClick={() => setSidebarOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all text-white/25 hover:text-white hover:bg-white/6">
              <ChevronLeft size={13} />
            </button>
          </div>
        </div>

        {/* New chat button */}
        <div className="px-3 pb-2 flex-shrink-0">
          <button onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all text-white/40 hover:text-white hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <Plus size={13} /> Chat Baru
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {groupChatsByDate(chats).map(group => (
            <div key={group.label} className="mb-4">
              <p className="text-[10px] font-bold tracking-widest px-3 py-2 text-white/20 uppercase"
                style={{ fontFamily: "'Syne', sans-serif" }}>{group.label}</p>
              {group.chats.map(chat => (
                <div key={chat.id}
                  onClick={() => { setActiveChatId(chat.id); setSidebarOpen(false); }}
                  className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all mb-0.5
                    ${chat.id === activeChatId ? 'bg-white/8 text-white' : 'text-white/40 hover:bg-white/4 hover:text-white/70'}`}>
                  <MessageSquare size={11} className="flex-shrink-0 opacity-50" />
                  <span className="text-[13px] truncate flex-1">{chat.title}</span>
                  <button onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all flex-shrink-0">
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom links */}
        <div className="flex-shrink-0 px-2 pb-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { href: '/faq', icon: <HelpCircle size={12} />, label: 'FAQ', external: false },
            { href: '/contact', icon: <Mail size={12} />, label: 'Kontak', external: false },
            { href: 'https://github.com', icon: <Github size={12} />, label: 'GitHub', external: true },
          ].map(item => (
            item.external
              ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-white/25 hover:text-white/60 hover:bg-white/4 transition-all mb-0.5 whitespace-nowrap">
                  {item.icon} {item.label}
                </a>
              : <Link key={item.label} href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-white/25 hover:text-white/60 hover:bg-white/4 transition-all mb-0.5 whitespace-nowrap">
                  {item.icon} {item.label}
                </Link>
          ))}
          {session && (
            <button onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-white/20 hover:text-red-400/70 hover:bg-white/4 transition-all whitespace-nowrap mt-0.5">
              <LogOut size={12} /> Keluar
            </button>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/history"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/25 hover:text-white hover:bg-white/6 transition-all flex-shrink-0">
            <ChevronLeft size={16} />
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/25 hover:text-white hover:bg-white/6 transition-all flex-shrink-0">
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
          <div className="flex-1 min-w-0 ml-1">
            <p className="text-sm font-semibold text-white/75 truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
              {activeChat?.title ?? 'KarlX AI'}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.5)', animation: 'glowPulse 2s infinite' }} />
              <span className="text-[11px] text-white/25">Gemini AI · Online</span>
            </div>
          </div>
          {session?.user?.image
            ? <img src={session.user.image} alt="User" className="w-7 h-7 rounded-full flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.12)' }} />
            : <UserAvatar size={28} />}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-7 px-4 pb-10 stagger">
              <Logo size="lg" />
              {session?.user?.name && (
                <p className="text-white/25 text-sm tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Halo, {session.user.name.split(' ')[0]}
                </p>
              )}
              <h1 className="text-2xl font-bold text-white/80 text-center tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Ada yang bisa saya bantu?
              </h1>
              <div className="grid grid-cols-2 gap-2.5 max-w-lg w-full">
                {SUGGESTIONS.map(s => (
                  <button key={s.text}
                    onClick={() => { setInput(s.text); textRef.current?.focus(); }}
                    className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all group"
                    style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                    <Sparkles size={13} className="text-white/25 mt-0.5 flex-shrink-0 group-hover:text-white/50 transition-colors" />
                    <div>
                      <p className="text-xs font-semibold text-white/55 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{s.title}</p>
                      <p className="text-xs text-white/25 leading-relaxed">{s.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full py-4">
              {messages.map(msg => (
                <MessageBubble key={msg.id} msg={msg} onCopy={t => navigator.clipboard.writeText(t).catch(() => {})} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} className="h-6" />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 pb-5 pt-2 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            {image && (
              <div className="mb-2 relative inline-block">
                <img src={image.preview} alt="preview" className="h-14 w-14 object-cover rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                <button onClick={() => setImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <X size={9} />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2 p-3.5 rounded-2xl transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0a0a' }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
              <textarea ref={textRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pesan kamu…"
                rows={1}
                className="bg-transparent outline-none resize-none text-sm leading-relaxed text-white/85 max-h-48"
                style={{ fontFamily: 'var(--font-body)', '::placeholder': { color: 'rgba(255,255,255,0.2)' } } as React.CSSProperties}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = Math.min(el.scrollHeight, 192) + 'px';
                }} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button onClick={() => fileRef.current?.click()}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-white/20 hover:text-white/60 hover:bg-white/6 transition-all">
                    <ImageIcon size={15} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  <button onClick={() => setInput(v => v + '\n```\n\n```')}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-white/20 hover:text-white/60 hover:bg-white/6 transition-all">
                    <Code2 size={15} />
                  </button>
                </div>
                <button onClick={handleSend} disabled={!canSend}
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
                  style={{
                    background: canSend ? '#ffffff' : 'transparent',
                    color: canSend ? '#000' : 'rgba(255,255,255,0.18)',
                    border: canSend ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                  <Send size={14} />
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.15)' }}>
              KarlX AI bisa membuat kesalahan. Verifikasi info penting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
