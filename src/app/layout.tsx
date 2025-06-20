import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SaaS Project',
  description: 'Premium software subscriptions marketplace',
};

// The root layout is now just a simple wrapper
// The actual layout logic is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}