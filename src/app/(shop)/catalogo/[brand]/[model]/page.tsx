// src/app/(shop)/catalogo/[brand]/[model]/page.tsx
"use client"
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface WatchDetails {
  name: string;
  brand: string;
  status: string;
  images: string[];
  description: {
    it: string;
    en: string;
  };
  specs: {
    ref: string;
    size: string;
    sku: string;
    movement: string;
    model: string;
    gender: string;
  };
}

export default function WatchDetailPage({ 
  params 
}: { 
  params: { brand: string; model: string } 
}) {
  const [currentImage, setCurrentImage] = useState(0)

  // Dati di esempio - in futuro verranno dal database
  const watch: WatchDetails = {
    name: 'Rolex Oyster Perpetual 36',
    brand: 'Rolex',
    status: 'PRIVATE COLLECTION',
    images: [
      '/images/watches/rolex/oyster-perpetual/1/main.jpg',
      '/images/watches/rolex/oyster-perpetual/2/detail.jpg',
      '/images/watches/rolex/oyster-perpetual/3/side.jpg',
      '/images/watches/rolex/oyster-perpetual/4/back.jpg'
    ],
    description: {
      it: "Questo magnifico esemplare non è in vendita, ma resta una pietra miliare per chi ama gli orologi intramontabili. Perfetto per ogni occasione, grazie alle sue dimensioni e al design unisex, incarna eleganza e precisione.",
      en: "This stunning piece is not for sale, but it remains a milestone for those who appreciate timeless watches. Perfect for any occasion, with its unisex design and versatile size, it embodies elegance and precision."
    },
    specs: {
      ref: '116000',
      size: '36mm',
      sku: 'V18526',
      movement: 'Automatico',
      model: 'Oyster Perpetual 36',
      gender: 'Unisex'
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galleria immagini */}
        <div className="space-y-4">
          <motion.div 
            className="aspect-square relative rounded-lg overflow-hidden bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image
              src={watch.images[currentImage]}
              alt={`${watch.name} - Vista ${currentImage + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {watch.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden bg-gray-900 ${
                  currentImage === index ? 'ring-2 ring-white' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${watch.name} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dettagli */}
        <div className="space-y-8">
          <div>
            <motion.span
              className="text-sm text-gray-400 block mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {watch.status}
            </motion.span>
            <motion.h1
              className="text-4xl font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {watch.name}
            </motion.h1>
          </div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-serif">Specifiche</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(watch.specs).map(([key, value]) => (
                <div key={key}>
                  <span className="text-sm text-gray-400 block capitalize">
                    {key}
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-serif">Descrizione</h2>
            <div className="space-y-4">
              <p>{watch.description.it}</p>
              <p className="text-gray-400">{watch.description.en}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}