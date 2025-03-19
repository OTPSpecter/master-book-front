import React, { useState } from "react";
import { PlayIcon, InfoIcon } from "lucide-react";
import BookModal from "./BookModal"; // Import du modal

interface HeroProps {
  title: string;
  description: string;
  author: string;
  id: string;
  coverUrl: string;
}

const safeDecode = (str: string) => {
  // Log de la chaîne brute pour diagnostic

  // Nettoyage de la chaîne avant de tenter le décodage
  const cleanedStr = str.trim().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

  try {
    // Décodage de l'URI (si elle a été encodée avec escape)
    const decodedStr = decodeURIComponent(escape(cleanedStr));
    return decodedStr;
  } catch (e) {
    console.error("Erreur de décodage URI :", e);
    return cleanedStr; // Retourne la chaîne brute si erreur
  }
};


const Hero: React.FC<HeroProps> = ({ title, description, author, id, coverUrl }) => {
  description = safeDecode(description);

  // État pour contrôler l'affichage du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-[70vh] w-full">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8A%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
          backgroundPosition: "50% 20%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-5xl font-bold">{safeDecode(title)}</h2>
          <p className="text-lg text-gray-300">{author}</p>
          <p className="text-gray-300 max-w-md">
            {description.split(' ').slice(0, 20).join(' ')}...
          </p>

          <div className="flex space-x-4 mt-4">
            <button
              className="bg-white text-black px-6 py-2 rounded flex items-center hover:bg-opacity-80"
              onClick={() => setIsModalOpen(true)}
            >
              <PlayIcon size={20} className="mr-2" /> Lire
            </button>
            <button
              className="bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded flex items-center hover:bg-opacity-100"
              onClick={() => setIsModalOpen(true)}
            >
              <InfoIcon size={20} className="mr-2" /> Plus d'infos
            </button>
          </div>
        </div>
      </div>

      {/* Affichage du modal si ouvert */}
      <BookModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isInWishlist={false} // Gérer ça dans ton état global si nécessaire
        isRead={false} // Idem
        onToggleWishlist={() => {}} // À compléter si tu veux gérer la wishlist
        onToggleReadList={() => {}} // À compléter si tu veux gérer la liste de lecture
      />
    </div>
  );
};

export default Hero;