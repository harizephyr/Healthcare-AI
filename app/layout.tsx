import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'HealthAI Management - AI-Powered Healthcare Assistant',
  description: 'Advanced healthcare management with AI-powered insights, patient care, and smart analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen`}>
        {children}
        <Toaster />
        <footer className="fixed bottom-4 right-4 z-50">
          <div className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-xs text-white/60">Powered by Bolt.new</span>
          </div>
        </footer>
      </body>
    </html>
  );
}