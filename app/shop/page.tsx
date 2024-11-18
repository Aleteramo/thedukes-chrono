// app/shop/page.tsx
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Shop | The Dukes Chrono',
  description: 'La nostra collezione di orologi',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-white text-center text-4xl md:text-6xl font-serif mb-6">
          La nostra Collezione di Orologi
        </h1>
        
        <p className="text-gray-400 text-center text-lg md:text-xl mb-12">
          Scopri la nostra selezione di orologi di lusso e vintage
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Qui verranno aggiunti i componenti per gli orologi */}
        </div>
      </div>
    </div>
  );
}