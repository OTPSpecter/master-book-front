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
import Dashboard from "./pages/Dashboard.tsx";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string>("5"); // Valeur initiale "5" avant connexion
  const [authenticating, setAuthenticating] = useState(true); // Pour vérifier si on est en train de vérifier l'authentification
  const [userRole, setUserRole] = useState<string>(""); // Rôle de l'utilisateur

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [readList, setReadList] = useState<string[]>([]);

  const [recommendedBooks, setRecommendedBooks] = useState<any[][]>([]);
  const [recommendedBooksACP, setRecommendedBooksACP] = useState<any[][]>([]);
  const [recommendedBooksSIM, setRecommendedBooksSIM] = useState<any[][]>([]);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingOthers, setLoadingOthers] = useState(true);

  const [loadingAuth, setLoadingAuth] = useState(true); // Indique si l'authentification est en cours


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
            setUserId(data.id_user); // Mettre à jour userId si l'utilisateur est connecté
            setIsLoggedIn(true); // Utilisateur connecté

            // Récupérer également le rôle de l'utilisateur
            const roleResponse = await fetch(
              "http://127.0.0.1:8000/usr/me/role",
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const roleData = await roleResponse.json();
            setUserRole(roleData.role); // Mettre à jour le rôle de l'utilisateur
            console.log(
              "🟢 Utilisateur connecté avec le rôle :",
              roleData.role
            );
          } else {
            console.warn("🔴 Token invalide, déconnexion...");
            localStorage.removeItem("token");
            setUserId("5"); // Revenir à userId = 5 si non connecté
            setIsLoggedIn(false); // Utilisateur non connecté
            setUserRole(""); // Réinitialiser le rôle
          }
        } catch (error) {
          console.error(
            "❌ Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      } else {
        setUserId("5"); // Aucun token, donc userId par défaut = 5
        setIsLoggedIn(false); // Utilisateur non connecté
      }

      setAuthenticating(false); // Authentification terminée, on peut maintenant charger les livres
      setLoadingAuth(false); // L'authentification est terminée
    };

    checkAuth();
  }, [userId]); // Effectuer une seule fois au chargement de la page

  // ⚡ Fetch des livres basé sur `userId` (initialement "5", puis mis à jour après connexion)
  useEffect(() => {
    if (authenticating || loadingAuth) return; // Ne pas faire le fetch avant d'avoir terminé l'authentification

    const fetchBooks = async () => {
      console.log("Fetching books for user:", userId); // Affichage du userId pour voir quel user est utilisé
      setLoadingFirst(true); // Début du chargement
      setLoadingOthers(true); // Début du chargement des autres livres

      const books = await get_books_recom_acm(userId); // Fetch des livres avec l'userId courant
      console.log("Books from ACM:", books); // Affiche les livres récupérés
      if (books) {
        setRecommendedBooks(books); // Stocker les livres dans l'état
        setLoadingFirst(false); // Fin du chargement du premier carrousel
      }

      const booksACP = await get_books_recom_acp(userId);
      const booksSIM = await get_books_recom_sim(userId);

      console.log("Books from ACP:", booksACP); // Affiche les livres ACP
      console.log("Books from SIM:", booksSIM); // Affiche les livres SIM

      setRecommendedBooksACP(booksACP);
      setRecommendedBooksSIM(booksSIM);
      setLoadingOthers(false); // Fin du chargement des autres recommandations
    };

    fetchBooks(); // Lancer le fetch
  }, [userId, authenticating, loadingAuth]); // Relancer lorsque `userId` change (quand un utilisateur se connecte)

  // 🔄 Fonction de connexion réussie
  const handleLoginSuccess = (newUserId: string) => {
    setUserId(newUserId); // Mettre à jour `userId` avec le nouvel utilisateur
    setIsLoggedIn(true); // Utilisateur connecté
  };

  // 🔄 Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserId("5"); // Revenir à l'ID par défaut après déconnexion
    setUserRole(""); // Réinitialiser le rôle
    setIsLoggedIn(false); // Utilisateur non connecté
  };

  // 🔄 Fetch wishlist et readList après connexion
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isLoggedIn) {
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
        const response = await fetch(`http://127.0.0.1:8000/a_lu/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setReadList(data.readList.map((book: any) => book.id_livre));
        }
      }
    };

    if (isLoggedIn) {
      fetchWishlist();
      fetchReadList();
    }
  }, [userId, isLoggedIn]); // Le useEffect dépend de `userId` et `isLoggedIn`

  const toggleWishlist = async (bookId: string) => {
    if (!isLoggedIn) return;

    try {
      if (wishlist.includes(bookId)) {
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
    if (!isLoggedIn) return;

    try {
      if (readList.includes(bookId)) {
        await fetch("http://127.0.0.1:8000/a_lu/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            book_id: bookId,
            genre_id: 1,
          }),
        });
        setReadList(readList.filter((id) => id !== bookId));
      } else {
        await fetch("http://127.0.0.1:8000/a_lu/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            book_id: bookId,
            genre_id: 1,
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
        userRole={userRole}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        wishlist={wishlist}
        readList={readList}
        onToggleWishlist={toggleWishlist}
        onToggleReadList={toggleReadList}
      />
            <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
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
