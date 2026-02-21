# KarlX AI — Setup Guide

## 1. Install dependencies
```bash
npm install
```

## 2. Setup environment variables
Copy `.env.example` ke `.env.local` dan isi:

```env
NEXTAUTH_SECRET=random-string-panjang-minimal-32-karakter
NEXTAUTH_URL=http://localhost:3000   # ganti ke domain vercel saat deploy

# Google OAuth → console.cloud.google.com
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# GitHub OAuth → github.com/settings/developers
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# Email (magic link) — pakai Resend.com atau Gmail SMTP
EMAIL_SERVER=smtp://user:pass@smtp.gmail.com:587
EMAIL_FROM=noreply@yourdomain.com
```

## 3. Setup OAuth

### Google:
1. Buka https://console.cloud.google.com
2. Buat project baru → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`

### GitHub:
1. Buka https://github.com/settings/developers
2. New OAuth App
3. Callback URL: `https://yourdomain.com/api/auth/callback/github`

### Email (Resend — gratis):
1. Daftar di https://resend.com
2. `EMAIL_SERVER=smtp://resend:YOUR_API_KEY@smtp.resend.com:587`
3. `EMAIL_FROM=noreply@yourdomain.com`

## 4. Deploy ke Vercel
```bash
vercel --prod
```
Tambah semua env vars di Vercel Dashboard → Settings → Environment Variables

## Struktur File
```
app/
  page.tsx          ← Landing page
  login/page.tsx    ← Login (Google, GitHub, Email)
  chat/page.tsx     ← Main chat interface
  history/page.tsx  ← Chat history
  faq/page.tsx      ← FAQ
  contact/page.tsx  ← Kontak & sosmed
  privacy/page.tsx  ← Privacy policy
  api/
    auth/[...nextauth]/route.ts  ← NextAuth (login)
    chat/route.ts                ← Gemini AI API
```
