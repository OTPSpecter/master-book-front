import React, { useState, useEffect } from "react";
import { X, Star, PlusIcon, CheckIcon, XIcon } from "lucide-react";
import { createPortal } from "react-dom";
import {
  get_Books_all_Details,
  get_Books_all_genres,
  get_all_books_in_saga,
} from "../data/bdd_getters.js";

interface BookModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  isRead: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleReadList: (id: string) => void;
}

const safeDecode = (str: string) => {
  // Log de la chaîne brute pour diagnostic

  // Nettoyage de la chaîne avant de tenter le décodage
  const cleanedStr = str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  try {
    // Décodage de l'URI (si elle a été encodée avec escape)
    const decodedStr = decodeURIComponent(escape(cleanedStr));

    return decodedStr;
  } catch (e) {
    console.error("Erreur de décodage URI :", e);
    return cleanedStr; // Retourne la chaîne brute si erreur
  }
};

const BookModal: React.FC<BookModalProps> = ({
  id,
  isOpen,
  onClose,
  isInWishlist,
  isRead,
  onToggleWishlist,
  onToggleReadList,
}) => {
  // États pour stocker les données récupérées
  const [description, setDescription] = useState<string>("");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isbn, setIsbn] = useState<string>("");
  const [saga, setSaga] = useState<string | null>(null);
  const [sagaBooks, setSagaBooks] = useState<string[] | null>(null);
  const [opus, setOpus] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [ratingCount, setRatingCount] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [characters, setCharacters] = useState<string[] | null>(null);
  const [awards, setAwards] = useState<string[] | null>(null);
  const [publisher, setPublisher] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[] | null>(null);

  const [bookId, setBookId] = useState(id);
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  {
    /* Awards avec accordéon */
  }
  const [showAllAwards, setShowAllAwards] = useState(false);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  useEffect(() => {
    if (isOpen) {
      setBookId(id); // 🔄 Réinitialise le livre affiché quand le modal s'ouvre
    }
  }, [isOpen, id]); // Dépendance sur isOpen et id
  

  // useEffect pour récupérer les données à l'ouverture
  useEffect(() => {
    if (!bookId || !isOpen) return;

    // Réinitialisation des données avant le chargement
    setTitle("");
    setCoverUrl("");
    setAuthor("");
    setDescription("");
    setPageCount(null);
    setIsbn("");
    setSaga(null);
    setOpus(null);
    setReviewCount(null);
    setRatingCount(null);
    setAverageRating(null);
    setCharacters(null);
    setAwards(null);
    setPublisher(null);
    setGenres(null);
    setSagaBooks(null);

    get_Books_all_Details(bookId)
      .then((data) => {
        if (data.length > 0) {
          const book = data[0];

          console.log(book);

          setTitle(safeDecode(book[1]));
          setCoverUrl(book[10]);
          setAuthor(book[15]);
          setDescription(
            book[2] ? safeDecode(book[2]) : "Aucune description disponible."
          );
          setPageCount(book[3] || null);
          setIsbn(book[4] ? safeDecode(book[4]) : "ISBN inconnu");
          setSaga(book[5] ? safeDecode(book[5]) : null);
          setOpus(book[6] || null);
          setReviewCount(book[7] || null);
          setRatingCount(book[8] || null);
          setAverageRating(book[9] || null);
          setCharacters(book[12] ? book[12].split(",").map(safeDecode) : null);
          setAwards(book[13] ? book[13].split(",").map(safeDecode) : null);
          setPublisher(book[14] ? safeDecode(book[14]) : null);
        }
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des détails :", err)
      );

    get_Books_all_genres(id)
      .then((data) => {
        if (data.length > 0) {
          setGenres(data || null);
        }
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des genres :", err)
      );
  }, [bookId, isOpen]); // 🔥 bookId mis à jour pour chaque changement de livre

  useEffect(() => {
    if (saga) {
      get_all_books_in_saga(saga.replace(/\s+/g, "%20"))
        .then((data) => {
          setSagaBooks(data);
        })
        .catch((err) =>
          console.error("Erreur lors de la récupération des livres de la saga :", err)
        );
    }
  }, [saga]); // 🔥 Dès que `saga` est mis à jour, on récupère `sagaBooks`
  

  if (!isOpen) return null;

  return createPortal(
    <div
      key={bookId}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-zinc-900 max-w-7xl w-full rounded-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left side - Image */}
          <div className="md:w-1/3">
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-auto rounded-md shadow-lg"
            />
            {/* Rating system */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => handleRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={`${
                        (hoverRating ?? userRating ?? 0) >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {/* Action buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onToggleWishlist(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200 ${
                    isInWishlist
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {isInWishlist ? <XIcon size={16} /> : <PlusIcon size={16} />}
                  {isInWishlist ? "Dans la wishlist" : "Ajouter wishlist"}
                </button>
                <button
                  onClick={() => onToggleReadList(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200 ${
                    isRead
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <CheckIcon size={16} />
                  {isRead ? "Lu" : "Marquer comme lu"}
                </button>
              </div>
            </div>
          </div>
          {/* Right side - Content */}
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-xl text-gray-400">{author}</p>
            {/* Rating info */}
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="text-lg">
                {averageRating ? averageRating.toFixed(1) : "Pas de note"} (
                {ratingCount || 0} votes)
              </span>
            </div>
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-300">{description}</p>
            </div>
            {/* Genres */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres &&
                  genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-red-600 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
            </div>
            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div>
                <h3 className="font-semibold">Éditeur</h3>
                <p>{publisher}</p>
              </div>
              <div>
                <h3 className="font-semibold">Pages</h3>
                <p>{pageCount}</p>
              </div>
              <div>
                <h3 className="font-semibold">ISBN</h3>
                <p>{isbn}</p>
              </div>
              <div>
                <h3 className="font-semibold">Nombre d'avis</h3>
                <p>{reviewCount}</p>
              </div>
            </div>
            {/* Saga information if available */}
            {saga && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Saga</h3>
                <p className="text-gray-300">
                  {saga} - Volume {opus}
                </p>
              </div>
            )}
            {/* Characters */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {characters && "Personnages"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {characters &&
                  characters.map((character: any) => (
                    <span
                      key={character}
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {character}
                    </span>
                  ))}
              </div>
            </div>
            {/* Awards */}
            {awards && awards.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">🏆 Récompenses</h3>
                <ul className="list-disc list-inside">
                  {awards
                    .slice(0, showAllAwards ? awards.length : 6)
                    .map((award) => (
                      <li key={award} className="text-sm font-semibold">
                        {award}
                      </li>
                    ))}
                </ul>
                {awards.length > 6 && (
                  <button
                    onClick={() => setShowAllAwards(!showAllAwards)}
                    className="mt-2 text-blue-400 hover:underline"
                  >
                    {showAllAwards ? "Voir moins" : "Voir plus"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {sagaBooks && (
          <div className="p-6 border-t border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Livres similaires</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {sagaBooks.map((similarBook) => (
                <img
                  key={similarBook[8]}
                  src={similarBook[4]}
                  alt={similarBook[0]}
                  className="w-40 h-auto rounded-md shadow-md hover:opacity-75 cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => {
                    setBookId(similarBook[8]); // 🔄 Met à jour le livre affiché
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default BookModal;
