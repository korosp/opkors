export function UserAvatar({ size = 32, src }: { size?: number; src?: string }) {
  if (src) {
    return <img src={src} alt="User" width={size} height={size} style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.12)' }} />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#1a1a1a"/>
      <rect width="32" height="32" rx="16" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
      <circle cx="16" cy="12.5" r="4.5" fill="rgba(255,255,255,0.75)"/>
      <path d="M7 27c0-4.97 4.03-9 9-9s9 4.03 9 9" fill="rgba(255,255,255,0.45)"/>
    </svg>
  );
}

export function AIAvatar({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="#0f0f0f"/>
      <rect width="32" height="32" rx="16" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none"/>
      <rect x="7" y="7" width="8" height="8" rx="1.5" fill="white" opacity="0.9"/>
      <rect x="17" y="17" width="8" height="8" rx="1.5" fill="white" opacity="0.3"/>
      <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.95"/>
    </svg>
  );
}
