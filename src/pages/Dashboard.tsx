import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Download,
  Plus,
  Library,
  BookMarked,
  X,
  Loader2,
  BookPlus,
  ListPlus,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Book {
  id_livre: number;   // ID du livre
  title: string;      // Titre du livre
  author: string;     // Auteur du livre
  isbn: string | null; // ISBN du livre, il peut être null
  occurrences: number; // Nombre d'occurrences du livre
  cover?: string;      // Optionnel, si vous souhaitez afficher la couverture
  description?: string; // Optionnel, si vous avez une description du livre
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [booksToBuy, setBooksToBuy] = useState<Book[]>([]); // Liste des livres à acheter
  const [catalogBooks, setCatalogBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"catalog" | "tobuy">("catalog");
  const [isManager, setIsManager] = useState(false); // Pour vérifier si l'utilisateur est un manager
  const [userId, setUserId] = useState<string | null>(null);

  // Vérifier si l'utilisateur est connecté et s'il est un manager
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Si pas de token, rediriger vers la page de connexion
      return;
    }

    // Récupérer le rôle de l'utilisateur via la route /me/role
    fetch("http://127.0.0.1:8000/usr/me/role", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "manager") {
          setIsManager(true); // Si l'utilisateur est un manager, on met à jour l'état
          setUserId(data.id_user);
        } else {
          setIsManager(false);
          navigate("/forbidden"); // Rediriger vers une page d'accès interdit si ce n'est pas un manager
        }
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la récupération des informations utilisateur :",
          err
        );
        setIsManager(false);
        navigate("/login"); 
      });
  }, [navigate]);

  // Fonction pour récupérer la liste des livres à acheter
  useEffect(() => {
    if (!isManager) return; // Ne pas récupérer les livres si l'utilisateur n'est pas manager


    fetch("http://127.0.0.1:8000/manager/getRecommendedBooks")
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur de chargement des livres à acheter");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setBooksToBuy(data);
        } else {
          throw new Error("Pas de livres à afficher");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la récupération des livres à acheter :",
          err
        );
        setError(err.message);
        setLoading(false);
      });
  }, [isManager]);

  // Fonction pour exporter les livres en CSV
  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Titre", "Auteur", "Description"],
      ...booksToBuy.map((book) => [
        book.id_livre,
        book.title,
        book.author,
        book.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "livres_a_acheter.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return isManager ? (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* En-tête avec statistiques */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total des livres</p>
                <p className="text-2xl font-bold">{catalogBooks.length}</p>
              </div>
              <BookOpen className="text-red-600" size={24} />
            </div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">À acheter</p>
                <p className="text-2xl font-bold">{booksToBuy.length}</p>
              </div>
              <Library className="text-red-600" size={24} />
            </div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Genres</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <BookMarked className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des sections */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "catalog"
              ? "bg-red-600 text-white"
              : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
          }`}
        >
          <BookPlus size={20} />
          Catalogue
        </button>
        <button
          onClick={() => setActiveTab("tobuy")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "tobuy"
              ? "bg-red-600 text-white"
              : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
          }`}
        >
          <ListPlus size={20} />
          Liste d'achat
        </button>
      </div>

      {/* Section principale */}
      {activeTab === "catalog" ? (
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Catalogue des livres</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                <Plus size={18} />
                Ajouter au catalogue
              </button>
            </div>
          </div>
          {/* Liste des livres du catalogue */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogBooks.map((book) => (
              <div
                key={book.id_livre}
                className="bg-zinc-800 rounded-lg p-4 flex items-start gap-4"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-gray-400">{book.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-xs bg-zinc-700 px-2 py-1 rounded hover:bg-zinc-600">
                      Modifier
                    </button>
                    <button className="text-xs bg-red-900 px-2 py-1 rounded hover:bg-red-800">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Liste des livres à acheter
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <Download size={18} />
                Exporter CSV
              </button>
            </div>
          </div>
          {/* Liste des livres à acheter */}
          {error && (
            <div className="bg-red-900/50 border border-red-600 text-red-100 p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
              <span className="ml-2">Chargement des livres...</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {booksToBuy.map((book) => (
                <li
                  key={book.id_livre}
                  className="bg-zinc-800 p-4 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-gray-400">{book.author}</p>
                      {book.isbn && (
                        <p className="text-sm text-gray-400">
                          ISBN: {book.isbn}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">
                        Occurrences: {book.occurrences}
                      </p>
                    </div>
                    <button className="text-red-500 hover:text-red-400">
                      <X size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Modal commun */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {activeTab === "catalog"
                  ? "Ajouter un livre au catalogue"
                  : "Ajouter un livre à acheter"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-md border-zinc-700 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Auteur</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-md border-zinc-700 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full bg-zinc-800 rounded-md border-zinc-700 px-3 py-2"
                  rows={3}
                />
              </div>
              {activeTab === "catalog" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    URL de la couverture
                  </label>
                  <input
                    type="url"
                    className="w-full bg-zinc-800 rounded-md border-zinc-700 px-3 py-2"
                  />
                </div>
              )}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Dashboard;
