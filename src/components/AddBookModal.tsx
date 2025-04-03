import { useState, useEffect } from "react";
import Select from "react-select";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const [isbn, setIsbn] = useState("");
  const [isbnCheckMessage, setIsbnCheckMessage] = useState<string | null>(null);
  const [isCheckingIsbn, setIsCheckingIsbn] = useState(false); // Indique si la vérification est en cours
  const [isIsbnValid, setIsIsbnValid] = useState(false); // Indique si l'ISBN est valide
  const [genres, setGenres] = useState<{ id_genre: number; nom_genre: string }[]>([]); // Liste des genres
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null); // Genre sélectionné
  const [coverUrl, setCoverUrl] = useState<string | null>(null); // URL de la couverture
  const [error, setError] = useState("");

  // Réinitialiser les champs lorsque la modal est fermée
  useEffect(() => {
    if (!isOpen) {
      setIsbn("");
      setIsbnCheckMessage(null);
      setIsCheckingIsbn(false);
      setIsIsbnValid(false);
      setSelectedGenre(null);
      setCoverUrl(null);
      setError("");
    }
  }, [isOpen]);
  useEffect(() => {
    console.log("selectedGenre:", selectedGenre);
    console.log("isIsbnValid:", isIsbnValid);
    console.log("isCheckingIsbn:", isCheckingIsbn);
  }, [selectedGenre, isIsbnValid, isCheckingIsbn]);
  // Charger les genres depuis l'API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/genres");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des genres.");
        }
        const data = await response.json();
        setGenres(data); // Initialiser les genres
      } catch (error) {
        console.error("Erreur lors de la récupération des genres :", error);
      }
    };

    fetchGenres();
  }, []);

  const customSelectStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#2D2D2D", // Fond de la sélection
      borderColor: "#4A4A4A", // Bordure
      color: "#fff", // Texte dans la sélection
    }),
    option: (styles: any, { isSelected, isFocused }: any) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#E50914" // Couleur de fond quand sélectionné
        : isFocused
        ? "#E50914" // Couleur de fond quand survolé
        : undefined,
      color: "#fff", // Texte de l'option
      padding: "10px", // Espacement dans les options
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: "#fff", // Texte sélectionné
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: "#2D2D2D", // Fond du menu déroulant
    }),
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: "#E50914", // Fond de la valeur sélectionnée
      color: "#fff", // Texte des éléments sélectionnés
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "#fff", // Couleur du texte pour les éléments multi-sélectionnés
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "#fff", // Couleur du bouton de suppression des éléments
    }),
    input: (styles: any) => ({
      ...styles,
      color: "#fff", // Texte de l'input en blanc
    }),
  };

  const checkIsbn = async (isbn: string) => {
    if (!isbn || isbn.trim() === "") {
      setIsbnCheckMessage("Veuillez saisir un ISBN valide.");
      setIsIsbnValid(false);
      setCoverUrl(null); // Réinitialiser la couverture
      return;
    }
  
    setIsCheckingIsbn(true);
    try {
      // Appeler la route backend pour vérifier l'ISBN
      const response = await fetch(`http://127.0.0.1:8000/livres/check?isbn=${isbn}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la vérification de l'ISBN.");
      }
  
      const data = await response.json();
  
      if (data.exists) {
        if (data.on_site) {
          setIsbnCheckMessage("Le livre existe déjà et est associé à un auteur.");
          setIsIsbnValid(false);
          setCoverUrl(null); // Pas de couverture à afficher
        } else {
          setIsbnCheckMessage("Le livre existe dans la base de données mais n'est pas encore associé à un auteur.");
          setIsIsbnValid(true);
          setCoverUrl(null); // Pas de couverture à afficher
        }
      } else {
        if(data.google_books_data){
            setIsbnCheckMessage("Le livre n'existe pas dans la base de données mais existe.");
            setIsIsbnValid(true);
        }
        else{
            setIsbnCheckMessage("Le livre n'existe pas.");
            setIsIsbnValid(false);
        }
        
  
        // Appeler la route backend pour récupérer la couverture
        const coverResponse = await fetch(`http://127.0.0.1:8000/livres/cover?isbn=${isbn}`);
        if (coverResponse.ok) {
          const coverData = await coverResponse.json();
          console.log(coverData.cover_url)
          if (coverData.cover_url=="noExist") {
            setCoverUrl(null); // URL de l'image par défaut
          } else if(coverData.use_no_cover && data.google_books_data!==null) {
            
            setCoverUrl(coverData.cover_url); // URL de la couverture réelle
          }
          else{
            setCoverUrl(coverData.cover_url)
          }
        } else {
          setCoverUrl(null); // Pas de couverture disponible
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'ISBN :", error);
      setIsbnCheckMessage("Erreur : ISBN invalide ou problème de connexion.");
      setIsIsbnValid(false);
      setCoverUrl(null); // Pas de couverture à afficher
    } finally {
      setIsCheckingIsbn(false); // Fin de la vérification
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/livre/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbn, id_genre: selectedGenre }),
      });
    console.log(response)
      if (!response.ok) {
        setError("Erreur lors de l'ajout du livre.");
        throw new Error("Erreur lors de l'ajout du livre");
      }

      alert("Livre ajouté avec succès !");
      onClose(); // Ferme la modal après succès
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
      console.log()
      setError("Erreur lors de l'ajout du livre.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-transparent border-none text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Ajouter un Livre</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              onBlur={() => checkIsbn(isbn)} // Vérification lors du "onBlur"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-blue-500"
            />
            {isCheckingIsbn ? (
              <p className="text-blue-500 mt-2">Vérification en cours...</p>
            ) : (
              isbnCheckMessage && <p className="text-gray-400 mt-2">{isbnCheckMessage}</p>
            )}
          </div>
          {coverUrl && (
            <div className="flex justify-center">
              <img
                src={coverUrl}
                alt="Couverture du livre"
                className="w-40 h-60 object-cover rounded shadow-lg border-2 border-gray-700"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-300 font-medium mb-2">Genre</label>
            <Select
              value={
              selectedGenre !== null
                ? {
                  value: selectedGenre,
                  label:
                  genres.find((genre) => genre.id_genre === selectedGenre)
                    ?.nom_genre || "",
                }
                : null
              }
              onChange={(option) =>
              setSelectedGenre(option ? option.value : null)
              }
              options={genres.map((genre) => ({
              value: genre.id_genre,
              label: genre.nom_genre,
              }))}
              placeholder="Sélectionnez un genre"
              styles={customSelectStyles}
              className="w-full"
            />
            
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-3 rounded text-white ${
              isIsbnValid && !isCheckingIsbn && selectedGenre!==null
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 opacity-50 cursor-not-allowed"
            }`}
            disabled={!isIsbnValid || isCheckingIsbn ||  selectedGenre ==null} // Désactiver si ISBN invalide, vérification en cours ou genre non sélectionné
          >
            Ajouter le livre
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;