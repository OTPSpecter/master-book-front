import { useState, useEffect } from "react";
import Select from "react-select";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (userId: string) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedReadingSpeed, setSelectedReadingSpeed] = useState<
    number | null
  >(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedGenreSex, setSelectedGenreSex] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedBookCriteria, setSelectedBookCriteria] = useState<number[]>(
    []
  );
  const [favoriteAuthors, setFavoriteAuthors] = useState<number[]>([]);
  const [selectedPreference, setSelectedPreference] = useState<number | null>(null); // State for preference

  const [moods, setMoods] = useState<any[]>([]);
  const [readingSpeeds, setReadingSpeeds] = useState<any[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [bookCriteria, setBookCriteria] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [preferences, setPreferences] = useState<any[]>([]); // State for preferences

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    // Fetching all the necessary lists for the form
    fetch("http://127.0.0.1:8000/api/moods")
      .then((response) => response.json())
      .then((data) => setMoods(data));

    fetch("http://127.0.0.1:8000/api/reading-speeds")
      .then((response) => response.json())
      .then((data) => setReadingSpeeds(data));

    fetch("http://127.0.0.1:8000/api/sectors")
      .then((response) => response.json())
      .then((data) => setSectors(data));

    fetch("http://127.0.0.1:8000/api/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data));

    fetch("http://127.0.0.1:8000/api/book-criteria")
      .then((response) => response.json())
      .then((data) => setBookCriteria(data));

    fetch("http://127.0.0.1:8000/api/authors")
      .then((response) => response.json())
      .then((data) => setAuthors(data));

    fetch("http://127.0.0.1:8000/api/preferences")
      .then((response) => response.json())
      .then((data) => setPreferences(data));
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setAge("");
    setSelectedMood(null);
    setSelectedReadingSpeed(null);
    setSelectedSector(null);
    setSelectedGenreSex(null);
    setSelectedGenres([]);
    setSelectedBookCriteria([]);
    setFavoriteAuthors([]);
    setSelectedPreference(null); // Reset preference
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/usr/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          age,
          id_selection: selectedMood,
          id_vitesse_lecture: selectedReadingSpeed,
          id_secteur: selectedSector,
          id_genre_sex: selectedGenreSex,
          genres: selectedGenres,
          book_criteria: selectedBookCriteria,
          favorite_authors: favoriteAuthors,
          id_prefere_lire: selectedPreference,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const data = await response.json();
      onRegisterSuccess(data.id_user); // Mettre à jour l'état de l'utilisateur dans le parent
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

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

  const mapToSelectOptions = (
    items: any[],
    labelField: string,
    valueField: string
  ) =>
    items.map((item) => ({
      value: item[valueField],
      label: item[labelField],
    }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-transparent border-none text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-white">Inscription</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full px-3 py-2 bg-gray-800 text-white rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full px-3 py-2 bg-gray-800 text-white rounded"
        />
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-2 w-full px-3 py-2 bg-gray-800 text-white rounded"
        />
        <Select
          value={
            selectedMood !== null
              ? {
                  value: selectedMood,
                  label:
                    moods.find((mood) => mood.id_selection === selectedMood)
                      ?.nom_humeur || "",
                }
              : null
          }
          onChange={(option) => setSelectedMood(option ? option.value : null)}
          options={mapToSelectOptions(moods, "nom_humeur", "id_selection")}
          placeholder="Sélectionnez votre humeur"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />

        <Select
          value={
            selectedReadingSpeed !== null
              ? {
                  value: selectedReadingSpeed,
                  label:
                    readingSpeeds.find(
                      (speed) =>
                        speed.id_vitesse_lecture === selectedReadingSpeed
                    )?.nom_categorie || "",
                }
              : null
          }
          onChange={(option) =>
            setSelectedReadingSpeed(option ? option.value : null)
          }
          options={mapToSelectOptions(
            readingSpeeds,
            "nom_categorie",
            "id_vitesse_lecture"
          )}
          placeholder="Sélectionnez votre vitesse de lecture"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />

        <Select
          value={
            selectedSector !== null
              ? {
                  value: selectedSector,
                  label:
                    sectors.find(
                      (sector) => sector.id_secteur === selectedSector
                    )?.nom_secteur || "",
                }
              : null
          }
          onChange={(option) => setSelectedSector(option ? option.value : null)}
          options={mapToSelectOptions(sectors, "nom_secteur", "id_secteur")}
          placeholder="Sélectionnez votre secteur d'activité"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />

        <Select
          value={
            selectedGenreSex !== null
              ? {
                  value: selectedGenreSex,
                  label:
                    selectedGenreSex === 0
                      ? "Femme"
                      : selectedGenreSex === 1
                      ? "Homme"
                      : "Autre",
                }
              : null
          }
          onChange={(option) =>
            setSelectedGenreSex(option ? option.value : null)
          }
          options={[
            { value: 0, label: "Femme" },
            { value: 1, label: "Homme" },
            { value: 2, label: "Autre" },
          ]}
          placeholder="Sélectionnez votre genre"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />

        <Select
          isMulti
          value={selectedGenres.map((genre) => ({
            value: genre,
            label: genres.find((g) => g.id_genre === genre)?.nom_genre || "",
          }))}
          onChange={(selected) =>
            setSelectedGenres(selected.map((s) => s.value))
          }
          options={mapToSelectOptions(genres, "nom_genre", "id_genre")}
          placeholder="Sélectionnez vos genres préférés"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />

        <Select
          isMulti
          value={selectedBookCriteria.map((criteria) => ({
            value: criteria,
            label:
              bookCriteria.find((c) => c.id_critere === criteria)?.critere ||
              "",
          }))}
          onChange={(selected) =>
            setSelectedBookCriteria(selected.map((s) => s.value))
          }
          options={mapToSelectOptions(bookCriteria, "critere", "id_critere")}
          placeholder="Sélectionnez vos critères de livre"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />
        <Select
          isMulti
          value={favoriteAuthors.map((author) => ({
            value: author,
            label:
              authors.find((a) => a.id_auteur === author)?.nom_complet || "",
          }))}
          onChange={(selected) =>
            setFavoriteAuthors(selected.map((s) => s.value))
          }
          options={mapToSelectOptions(authors, "nom_complet", "id_auteur")}
          placeholder="Sélectionnez vos auteurs favoris"
          styles={customSelectStyles}
          className="mt-2 w-full"
        />
        <Select
          value={
            selectedPreference !== null
              ? {
                  value: selectedPreference,
                  label:
                    preferences.find(
                      (pref) => pref.id_preference === selectedPreference
                    )?.preference || "", // Assurez-vous que la valeur du label soit correcte
                }
              : null
          }
          onChange={
            (option) => setSelectedPreference(option ? option.value : null) // Mettez à jour la préférence sélectionnée
          }
          options={preferences.map((pref: { id_preference: number; preference: string }) => ({
            value: pref.id_preference, // Utilisez l'id_preference comme valeur
            label: pref.preference, // Utilisez le nom de la préférence comme label
          }))}
          placeholder="Sélectionnez votre préférence de lecture"
          styles={customSelectStyles} // Styles déjà définis
          className="mt-2 w-full" // Ajoutez vos classes ici pour la mise en forme
        />
        <button
          onClick={handleRegister}
          className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
