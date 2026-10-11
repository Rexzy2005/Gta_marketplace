import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Legend Lane | GTA Online Services',
  description: 'A curated catalogue for GTA Online services and account support.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}