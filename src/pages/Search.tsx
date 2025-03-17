import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";

const Search: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";
  const searchType = params.get("type") || "title";

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetch(`http://127.0.0.1:8000/api/search_deux?query=${query}&type=${searchType}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results);
          setLoading(false);
        })
        .catch((err) => console.error("Erreur de recherche :", err));
    }
  }, [query, searchType]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Résultats pour "{query}"</h1>

      {loading ? (
        <p>Chargement des résultats...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length > 0 ? (
            results.map((book) => (
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
            ))
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
