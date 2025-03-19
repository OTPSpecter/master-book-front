import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import BookCard from "./BookCard";

interface AuthorModalProps {
  authorId: string;
  authorName: string;
  isOpen: boolean;
  onClose: () => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({ authorId, authorName, isOpen, onClose }) => {
  const [books, setBooks] = useState<any[]>([]);
  // const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch(`http://127.0.0.1:8000/api/author_books?author_id=${authorId}`)
        .then((res) => res.json())
        .then((data) => setBooks(data.books))
        .catch((err) => console.error("Erreur lors de la récupération des livres :", err));
    }
  }, [authorId, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 max-w-4xl w-full rounded-lg relative max-h-[90vh] overflow-y-auto p-6">
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white z-10">
          <X size={24} />
        </button>

        {/* Titre */}
        <h2 className="text-3xl font-bold text-center mb-4">{authorName}</h2>

        {/* Grille des livres */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              coverUrl={book.cover}
              title={book.title}
              author={book.author}
              description={book.description}
              isInWishlist={false}
              isRead={false}
              onToggleWishlist={() => {}}
              onToggleReadList={() => {}}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthorModal;
