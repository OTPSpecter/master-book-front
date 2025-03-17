import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookCarousel from "./components/BookCarousel";
import {
  get_books_recom_acm,
  get_books_recom_acp,
  get_books_recom_sim,
} from "./data/bdd_getters.js";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search.js";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [readList, setReadList] = useState<string[]>([]);

  const [recommendedBooks, setRecommendedBooks] = useState<any[][]>([]);
  const [recommendedBooksACP, setRecommendedBooksACP] = useState<any[][]>([]);
  const [recommendedBooksSIM, setRecommendedBooksSIM] = useState<any[][]>([]);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingOthers, setLoadingOthers] = useState(true);

  useEffect(() => {
    const fetchFirstCarousel = async () => {
      const userId = "1";
      const books = await get_books_recom_acm(userId);

      if (books) {
        setRecommendedBooks(books);
        setLoadingFirst(false);
      }
    };

    fetchFirstCarousel();
  }, []);

  useEffect(() => {
    if (!loadingFirst) {
      const fetchOtherCarousels = async () => {
        const userId = "5";
        const booksACP = await get_books_recom_acp(userId);
        const booksSIM = await get_books_recom_sim(userId);

        if (booksACP) setRecommendedBooksACP(booksACP);
        if (booksSIM) setRecommendedBooksSIM(booksSIM);
        setLoadingOthers(false);
      };

      fetchOtherCarousels();
    }
  }, [loadingFirst]); // Exécute ce useEffect uniquement quand `loadingFirst` devient `false`

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleWishlist = (bookId: string) => {
    if (wishlist.includes(bookId)) {
      setWishlist(wishlist.filter((id) => id !== bookId));
    } else {
      setWishlist([...wishlist, bookId]);
    }
  };

  const toggleReadList = (bookId: string) => {
    if (readList.includes(bookId)) {
      setReadList(readList.filter((id) => id !== bookId));
    } else {
      setReadList([...readList, bookId]);
    }
  };

  const defaultHeroBook = {
    title: "Découvrez de nouveaux livres",
    description: "Explorez notre sélection et trouvez votre prochaine lecture.",
    author: "L'équipe Bookflix",
    id: "0",
    coverUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8A%3D%3D&auto=format&fit=crop&w=1470&q=80",
  };

  // Book use for the first hero section
  let firstBook =
    recommendedBooks.length > 0 &&
    recommendedBooks[0] &&
    recommendedBooks[0].length > 0 &&
    typeof recommendedBooks[0][4] === "string"
      ? {
          title: recommendedBooks[0][0] || "Titre inconnu",
          description:
            recommendedBooks[0][7] || "Pas de description disponible.",
          author: recommendedBooks[0][6] || "Auteur inconnu",
          id: recommendedBooks[0][5] || "0",
          coverUrl: recommendedBooks[0][4].startsWith("http")
            ? recommendedBooks[0][4]
            : defaultHeroBook.coverUrl,
        }
      : defaultHeroBook;

  return (
    <div className="bg-black text-white min-h-screen w-full">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginToggle={toggleLogin}
        onToggleWishlist={toggleWishlist}
        onToggleReadList={toggleReadList}
      />
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
      {firstBook && (
        <Hero
          title={firstBook.title}
          description={firstBook.description}
          author={firstBook.author}
          id={firstBook.id}
          coverUrl={firstBook.coverUrl}
        />
      )}
      <main className="container mx-auto px-4 pb-16">
        {loadingFirst ? (
          <div>Chargement du premier carrousel...</div>
        ) : (
          <>
            <BookCarousel
              title="Livres que vous pourriez aimer"
              books={recommendedBooks}
              wishlist={wishlist}
              readList={readList}
              onToggleWishlist={toggleWishlist}
              onToggleReadList={toggleReadList}
            />
          </>
        )}

        {loadingOthers ? (
          <div>Chargement des autres recommandations...</div>
        ) : (
          <>
            <BookCarousel
              title="Livres recommandés"
              books={recommendedBooksACP}
              wishlist={wishlist}
              readList={readList}
              onToggleWishlist={toggleWishlist}
              onToggleReadList={toggleReadList}
            />

            <BookCarousel
              title="Livres similaires à ceux que vous aimez"
              books={recommendedBooksSIM}
              wishlist={wishlist}
              readList={readList}
              onToggleWishlist={toggleWishlist}
              onToggleReadList={toggleReadList}
            />
          </>
        )}
      </main>
    </div>
  );
}
