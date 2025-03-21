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
  const [userId, setUserId] = useState<string>("5");

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [readList, setReadList] = useState<string[]>([]);

  const [recommendedBooks, setRecommendedBooks] = useState<any[][]>([]);
  const [recommendedBooksACP, setRecommendedBooksACP] = useState<any[][]>([]);
  const [recommendedBooksSIM, setRecommendedBooksSIM] = useState<any[][]>([]);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingOthers, setLoadingOthers] = useState(true);

  // 🔄 Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://127.0.0.1:8000/usr/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUserId(data.id_user);
            setIsLoggedIn(true);
          } else {
            console.warn("🔴 Token invalide, déconnexion...");
            localStorage.removeItem("token");
            setUserId("5"); // Remettre userId = 5
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error(
            "❌ Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      }
    };

    checkAuth();
  }, []); // Exécuter une seule fois au chargement de la page

  // ⚡ Fetch des livres basés sur `userId`
  useEffect(() => {
    const fetchBooks = async () => {
      setLoadingFirst(true);
      setLoadingOthers(true);

      const books = await get_books_recom_acm(userId);
      if (books) {
        setRecommendedBooks(books);
        setLoadingFirst(false);
      }

      const booksACP = await get_books_recom_acp(userId);
      const booksSIM = await get_books_recom_sim(userId);

      if (booksACP) setRecommendedBooksACP(booksACP);
      if (booksSIM) setRecommendedBooksSIM(booksSIM);
      setLoadingOthers(false);
    };

    fetchBooks();
  }, [userId]); // 🔄 Recharger les livres quand `userId` change

  const handleLoginSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserId("5");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isLoggedIn) {
        // Vérifie si l'utilisateur est connecté
        const response = await fetch(
          `http://127.0.0.1:8000/wishlist/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setWishlist(data.wishlist.map((book: any) => book.id_livre));
        }
      }
    };

    const fetchReadList = async () => {
      if (isLoggedIn) {
        // Vérifie si l'utilisateur est connecté
        const response = await fetch(`http://127.0.0.1:8000/a_lu/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setReadList(data.readList.map((book: any) => book.id_livre));
        }
      }
    };

    if (isLoggedIn) {
      // Exécuter seulement si l'utilisateur est connecté
      fetchWishlist();
      fetchReadList();
    }
  }, [userId, isLoggedIn]); // Le useEffect dépend aussi de l'état de connexion

  const toggleWishlist = async (bookId: string) => {
    if (!isLoggedIn) return; // Ne faire aucune action si l'utilisateur n'est pas connecté

    try {
      if (wishlist.includes(bookId)) {
        // Supprimer du wishlist en BDD
        await fetch("http://127.0.0.1:8000/wishlist/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: userId,
            id_livre: bookId,
          }),
        });
        setWishlist(wishlist.filter((id) => id !== bookId));
      } else {
        // Ajouter au wishlist en BDD
        await fetch("http://127.0.0.1:8000/wishlist/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: userId,
            id_livre: bookId,
          }),
        });
        setWishlist([...wishlist, bookId]);
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la wishlist", error);
    }
  };

  const toggleReadList = async (bookId: string) => {
    if (!isLoggedIn) return; // Ne faire aucune action si l'utilisateur n'est pas connecté

    try {
      if (readList.includes(bookId)) {
        // Supprimer du ReadList en BDD
        await fetch("http://127.0.0.1:8000/a_lu/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId, // Assurez-vous que les noms de clés sont corrects
            book_id: bookId, // Id du livre à supprimer
            genre_id: 1, // Genre que vous pouvez adapter
          }),
        });
        setReadList(readList.filter((id) => id !== bookId));
      } else {
        // Ajouter au ReadList en BDD
        await fetch("http://127.0.0.1:8000/a_lu/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            book_id: bookId,
            genre_id: 1, // Vous pouvez adapter le genre ou l'envoyer dynamiquement
          }),
        });
        setReadList([...readList, bookId]);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la liste de lecture",
        error
      );
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
        userId={userId}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        wishlist={wishlist} // Passer la wishlist à Navbar
        readList={readList} // Passer la readList à Navbar
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
