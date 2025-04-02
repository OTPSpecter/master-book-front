import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, UserIcon, ChevronDownIcon } from "lucide-react";
import LoginModal from "./LoginModal";
import BookModal from "./BookModal";
import AuthorModal from "./AuthorModal";

interface NavbarProps {
  isLoggedIn: boolean;
  userId: string;
  userRole: string;
  onLoginSuccess: (userId: string) => void;
  onLogout: () => void;
  wishlist: string[];
  readList: string[];
  onToggleWishlist: any;
  onToggleReadList: any;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  userId,
  userRole,
  onLoginSuccess,
  onLogout,
  wishlist,
  readList,
  onToggleWishlist,
  onToggleReadList,
}) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"title" | "author">("title");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fetch suggestions en temps réel
  useEffect(() => {
    if (query.length > 1) {
      fetch(
        `http://127.0.0.1:8000/api/search_deux/suggestions?query=${encodeURIComponent(
          query
        )}&type=${searchType}`
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data.results))
        .catch((err) => console.error("❌ Erreur suggestions :", err));
    } else {
      setSuggestions([]);
    }
  }, [query, searchType]);

  console.log("User Role in Navbar:", userRole);

  return (
    <header className="bg-black sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Menu */}
          <div className="flex items-center">
            <h1 className="text-red-600 text-2xl font-bold mr-8">BOOKFLIX</h1>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-gray-300">
                Home
              </Link>
              <Link to="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
              {/* Afficher "Dashboard" uniquement si le rôle est "manager" */}
              {userRole === "manager" && (
                <Link to="/dashboard" className="text-white hover:text-gray-300">
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="relative flex items-center space-x-3">
            {/* 🌟 Switch entre Titre et Auteur */}
            <button
              onClick={() =>
                setSearchType(searchType === "title" ? "author" : "title")
              }
              className={`relative w-24 h-8 flex items-center rounded-full border border-gray-600 p-1 transition ${
                searchType === "title" ? "bg-blue-600" : "bg-red-600"
              }`}
            >
              <span
                className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  searchType === "title" ? "translate-x-0" : "translate-x-16"
                }`}
              />
              <span
                className={`absolute left-8 text-sm font-bold text-white transition-opacity ${
                  searchType === "title" ? "opacity-100" : "opacity-0"
                }`}
              >
                Titre
              </span>
              <span
                className={`absolute right-8 text-sm font-bold text-white transition-opacity ${
                  searchType === "author" ? "opacity-100" : "opacity-0"
                }`}
              >
                Auteur
              </span>
            </button>

            {/* 🔍 Barre de recherche */}
            <div className="relative">
              <div className="relative w-48 md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 pl-8 w-48 md:w-64 focus:outline-none"
                />
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* 📌 Suggestions sous la barre de recherche */}
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-gray-800 text-white border border-gray-700 rounded mt-1 z-50">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => {
                        if (searchType === "title") {
                          setSelectedBookId(item.id);
                        } else {
                          setSelectedAuthor({ id: item.id, name: item.name });
                        }
                      }}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 🔑 Connexion / Déconnexion */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="flex items-center text-white"
                  onClick={toggleMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
                    <UserIcon size={18} />
                  </div>
                  <ChevronDownIcon size={16} />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded shadow-lg py-1">
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/read"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Déjà lu
                    </Link>
                    <button
                      className="block px-4 py-2 text-white hover:bg-gray-800 w-full text-left"
                      onClick={onLogout}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Me connecter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Affichage du Modal de Connexion */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />

      {/* Modals pour Livres et Auteurs */}
      {selectedBookId && (
        <BookModal
          id={selectedBookId}
          isOpen={true}
          onClose={() => setSelectedBookId(null)}
          isInWishlist={wishlist.includes(selectedBookId)} // Utiliser l'état de wishlist
          isRead={readList.includes(selectedBookId)} // Utiliser l'état de readList
          onToggleWishlist={onToggleWishlist}
          onToggleReadList={onToggleReadList}
        />
      )}
      {selectedAuthor && (
        <AuthorModal
          authorId={selectedAuthor.id}
          authorName={selectedAuthor.name}
          isOpen={true}
          onClose={() => setSelectedAuthor(null)}
        />
      )}
    </header>
  );
};

export default Navbar;
