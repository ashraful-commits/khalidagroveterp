import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';
import { GlobalErrorBoundary } from '@/components/layout/GlobalErrorBoundary';

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AgroVet ERP | Manufacturing & Distribution',
  description: 'Enterprise resource planning for AgroVet Manufacturing and Distribution.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${plusJakartaSans.variable} ${syne.variable} ${jetBrainsMono.variable} font-body antialiased bg-primary-subtle text-text-primary min-h-screen`}
      >
        <StoreProvider>
          <GlobalErrorBoundary>
            {children}
          </GlobalErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
}
