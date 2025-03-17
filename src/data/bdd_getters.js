
// Function to get the list of books for the recommendation system for ACM
export async function get_books_recom_acm(user_id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/livres/acm_recom/${user_id}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const books = await response.json(); // Récupère la réponse en JSON
        return books; // Retourne la liste des recommandations
    } catch (error) {
        console.error("Erreur lors de la requête ❌", error);
        return null; // Retourne null en cas d'erreur
    }
}

// Function to get the list of books for the recommendation system for ACP
export async function get_books_recom_acp(user_id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/livres/acp_recom/${user_id}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const books = await response.json(); // Récupère la réponse en JSON
        return books; // Retourne la liste des recommandations
    } catch (error) {
        console.error("Erreur lors de la requête ❌", error);
        return null; // Retourne null en cas d'erreur
    }
}

// Function to get the list of books for the recommendation system for ACP
export async function get_books_recom_sim(user_id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/livres/sim/${user_id}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const books = await response.json(); // Récupère la réponse en JSON
        return books; // Retourne la liste des recommandations
    } catch (error) {
        console.error("Erreur lors de la requête ❌", error);
        return null; // Retourne null en cas d'erreur
    }
}

// Function to get the list of books for the recommendation system

export async function get_Books_all_Details(book_id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/books_infos_all_list/${book_id}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const books_detail = await response.json(); // Récupère la réponse en JSON
        return books_detail[0]; // Retourne la liste des recommandations
    } catch (error) {
        console.error("Erreur lors de la requête ❌", error);
        return null; // Retourne null en cas d'erreur
    }
}

export async function get_Books_all_genres(book_id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/books_infos_list/${book_id}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const books_detail = await response.json(); // Récupère la réponse en JSON
        return books_detail[0]; // Retourne la liste des recommandations
    } catch (error) {
        console.error("Erreur lors de la requête ❌", error);
        return null; // Retourne null en cas d'erreur
    }
}

export async function get_all_books_in_saga(sagaName) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/books_saga/${sagaName}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const books_detail = await response.json(); // Récupère la réponse en JSON
        return books_detail; // Retourne la liste des recommandations
    } catch (error) {
        console.error("Erreur lors de la requête ❌", error);
        return null; // Retourne null en cas d'erreur
    }
}
