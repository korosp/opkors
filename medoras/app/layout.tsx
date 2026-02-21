import type { Metadata } from 'next';
import '@/styles/globals.css';
import AuthProvider from '@/components/ui/SessionProvider';

export const metadata: Metadata = {
  title: 'KarlX AI',
  description: 'KarlX AI — Asisten kecerdasan buatan yang cerdas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased noise">
        <AuthProvider>
          <div className="page-enter">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
