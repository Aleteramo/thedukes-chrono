import React from 'react';
import Image from 'next/image';

export default function MyComponent() {
 return (
   <div className="container mx-auto py-8">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* Galleria immagini */} 
       <div className="space-y-4">
       <Image 
  src="/immagine-placeholder.jpg"
  alt="Immagine di esempio"
  width={500}  // specifica una larghezza appropriata
  height={300} // specifica un'altezza appropriata
  className="w-full rounded-lg shadow-md"
/>
       </div>

       {/* Dettagli */}
       <div className="space-y-6">
         <h1 className="text-3xl font-bold">Titolo</h1>
         
         <p className="text-gray-600">Sottotitolo</p>
         
         <p className="text-2xl font-bold">€199</p>
         
         <div className="space-y-4">
           <div>
             <h2 className="text-xl font-semibold mb-2">Dettagli</h2>
             <ul className="space-y-2">
               <li>Dettaglio 1</li>
               <li>Dettaglio 2</li>
               <li>Dettaglio 3</li>
               <li>Dettaglio 4</li>
             </ul>
           </div>

           <div>
             <h2 className="text-xl font-semibold mb-2">Specifiche</h2>
             <ul className="space-y-2">
               <li>Specifica 1</li>
               <li>Specifica 2</li>
               <li>Specifica 3</li>
             </ul>
           </div>

           <div>
             <h2 className="text-xl font-semibold mb-2">Descrizione</h2>
             <p className="text-gray-700">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
               molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
               numquam blanditiis harum quisquam eius sed odit fugiat.
             </p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}