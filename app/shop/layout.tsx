// app/shop/layout.tsx
import React from 'react';
import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <main>
        {children}
      </main>
    </div>
  );
}