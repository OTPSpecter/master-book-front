import { useState, useEffect } from "react";
import RegisterModal from "./RegisterModal"; // Assurez-vous d'importer votre modal d'inscription


interface LoginModalProps {
  isOpen: boolean; // 🔥 Ajout de la prop isOpen
  onClose: () => void;
  onLoginSuccess: (userId: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Ajoutez cet état pour gérer l'ouverture du RegisterModal

  // Réinitialiser les champs lorsque la modal est fermée (déconnexion)
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError(""); // Optionnel, si vous voulez réinitialiser aussi les erreurs
    }
  }, [isOpen]); // Effect se déclenche chaque fois que `isOpen` change

  if (!isOpen) return null; // 🔥 Empêche le rendu si isOpen est false

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/usr/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password }),
      });

      if (!response.ok) {
        // Vérification des codes d'erreur spécifiques, par exemple erreur de connexion
        setError("Email ou mot de passe incorrect."); // Affichage d'un message d'erreur
        throw new Error("Login échoué");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);

      const meResponse = await fetch("http://127.0.0.1:8000/usr/me", {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      if (!meResponse.ok) {
        setError("Impossible de récupérer l'utilisateur.");
        throw new Error("Impossible de récupérer l'utilisateur");
      }

      const userData = await meResponse.json();
      onLoginSuccess(userData.id_user); // 🔄 Met à jour `userId` dans App.tsx
      onClose();
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true); // Ouvre le modal d'inscription
  };

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-transparent border-none text-2xl font-semibold"
        >
          &times; {/* Icône de fermeture (x) */}
        </button>
        <h2 className="text-xl font-bold text-white">Connexion</h2>
        {error && <p className="text-red-500">{error}</p>}
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
        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Se connecter
        </button>
        <div className="mt-4 text-center">
            <p className="text-white">
              Pas encore inscrit ?{" "}
              <button 
                onClick={openRegisterModal} 
                className="text-blue-500 hover:underline"
              >
                S'inscrire
              </button>
            </p>
          </div>
      </div>
    </div>
    {/* Ouvrir le modal d'inscription */}
    <RegisterModal 
    isOpen={isRegisterModalOpen} 
    onClose={() => setIsRegisterModalOpen(false)} 
    onRegisterSuccess={onLoginSuccess} 
  />
  </>
  );
};

export default LoginModal;
