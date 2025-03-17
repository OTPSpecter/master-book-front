// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   coverUrl: string;
//   rating: {
//     average: number;
//     votes: number;
//   };
//   category: string;
//   description: string;
//   characters: string[];
//   publisher: string;
//   pageCount: number;
//   genres: string[];
//   saga?: {
//     name: string;
//     volume: number;
//   };
//   awards: string[];
//   isbn: string;
//   reviewCount: number;
// }

export const booksData = {
  recommended: [
    {
      id: 'book1',
      title: 'Les Misérables',
      author: 'Victor Hugo',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.7, votes: 2845 },
      description: "Une épopée historique et sociale dans le Paris du XIXe siècle, suivant l'histoire de Jean Valjean, un ancien forçat en quête de rédemption.",
      characters: ['Jean Valjean', 'Cosette', 'Javert', 'Fantine', 'Marius'],
      publisher: "Éditions Gallimard",
      pageCount: 1488,
      genres: ['Classique', 'Drame historique', 'Roman social'],
      awards: ['Prix Universal de la Littérature', 'Prix du Bicentenaire'],
      isbn: "978-2070409228",
      reviewCount: 1523
    },
    {
      id: 'book2',
      title: 'Crime et Châtiment',
      author: 'Fyodor Dostoevsky',
      coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      rating: { average: 4.5, votes: 2234 },
      description: "Un roman de crime et de psychologie, suivant l'histoire de Ivan Ilych, un homme qui se demande pourquoi il est ici.",
      characters: ['Ivan Ilych', 'Ivan Karamazov', 'Fyodor Pavlovitch', 'Ivan Petrovitch'],
      publisher: "Éditions Gallimard",
      pageCount: 504,
      genres: ['Classique', 'Drame', 'Psychologie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 1234
    },
    {
      id: 'book3',
      title: 'Orgueil et Préjugés',
      author: 'Jane Austen',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.3, votes: 1876 },
      description: "Un roman de romance et de société, suivant l'histoire de Elizabeth Bennet et de Mr. Darcy.",
      characters: ['Elizabeth Bennet', 'Mr. Darcy', 'Jane Bennet', 'Mr. Bingley', 'Mr. Wickham'],
      publisher: "Éditions Gallimard",
      pageCount: 276,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 1023
    },
    {
      id: 'book4',
      title: 'L\'Étranger',
      author: 'Albert Camus',
      coverUrl: 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.2, votes: 1654 },
      description: "Un roman de philosophie et de psychologie, suivant l'histoire de Meursault, un homme qui ne ressent pas d'émotions.",
      characters: ['Meursault', 'Mme. Meursault', 'M. Meursault', 'Mme. Camus', 'M. Camus'],
      publisher: "Éditions Gallimard",
      pageCount: 180,
      genres: ['Classique', 'Philosophie', 'Psychologie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 923
    },
    {
      id: 'book5',
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.1, votes: 1432 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de le Petit Prince et de son voyage dans le monde.",
      characters: ['Le Petit Prince', 'Prince Charming', 'Prince Boreas', 'Prince Charming', 'Prince Boreas'],
      publisher: "Éditions Gallimard",
      pageCount: 100,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 823
    },
    {
      id: 'book6',
      title: 'Don Quichotte',
      author: 'Miguel de Cervantes',
      coverUrl: 'https://images.unsplash.com/photo-1531901219726-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.0, votes: 1210 },
      description: "Un roman de fantasy et de société, suivant l'histoire de Don Quichotte et de son voyage dans le monde.",
      characters: ['Don Quichotte', 'Sancho Panza', 'Sancho Panza', 'Sancho Panza', 'Sancho Panza'],
      publisher: "Éditions Gallimard",
      pageCount: 1000,
      genres: ['Classique', 'Fantasy', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 723
    },
  ],
  similar: [
    {
      id: 'book7',
      title: 'Madame Bovary',
      author: 'Gustave Flaubert',
      coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      rating: { average: 4.6, votes: 2567 },
      description: "Un roman de romance et de société, suivant l'histoire de Madame Bovary et de son voyage dans le monde.",
      characters: ['Madame Bovary', 'Emma Bovary', 'Emma Bovary', 'Emma Bovary', 'Emma Bovary'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 623
    },
    {
      id: 'book8',
      title: 'Anna Karénine',
      author: 'Léon Tolstoï',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80',
      rating: { average: 4.4, votes: 2345 },
      description: "Un roman de romance et de société, suivant l'histoire de Anna Karénine et de son voyage dans le monde.",
      characters: ['Anna Karénine', 'Alexandre Karénine', 'Alexandre Karénine', 'Alexandre Karénine', 'Alexandre Karénine'],
      publisher: "Éditions Gallimard",
      pageCount: 1000,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 523
    },
    {
      id: 'book9',
      title: 'Le Rouge et le Noir',
      author: 'Stendhal',
      coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
      rating: { average: 4.3, votes: 2123 },
      description: "Un roman de romance et de société, suivant l'histoire de Julien Sorel et de son voyage dans le monde.",
      characters: ['Julien Sorel', 'Julien Sorel', 'Julien Sorel', 'Julien Sorel', 'Julien Sorel'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 423
    },
    {
      id: 'book10',
      title: 'Guerre et Paix',
      author: 'Léon Tolstoï',
      coverUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: { average: 4.2, votes: 1901 },
      description: "Un roman de romance et de société, suivant l'histoire de Pierre et Natasha et de leur voyage dans le monde.",
      characters: ['Pierre', 'Natasha', 'Pierre', 'Natasha', 'Pierre'],
      publisher: "Éditions Gallimard",
      pageCount: 1000,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 323
    },
    {
      id: 'book11',
      title: 'Notre-Dame de Paris',
      author: 'Victor Hugo',
      coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.1, votes: 1700 },
      description: "Un roman de romance et de société, suivant l'histoire de Victor Hugo et de son voyage dans le monde.",
      characters: ['Victor Hugo', 'Victor Hugo', 'Victor Hugo', 'Victor Hugo', 'Victor Hugo'],
      publisher: "Éditions Gallimard",
      pageCount: 1000,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 223
    },
    {
      id: 'book12',
      title: 'Germinal',
      author: 'Émile Zola',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 4.0, votes: 1500 },
      description: "Un roman de romance et de société, suivant l'histoire de Germinal et de son voyage dans le monde.",
      characters: ['Germinal', 'Germinal', 'Germinal', 'Germinal', 'Germinal'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Romance', 'Société'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 123
    },
  ],
  mightLike: [
    {
      id: 'book13',
      title: 'Voyage au bout de la nuit',
      author: 'Louis-Ferdinand Céline',
      coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
      rating: { average: 3.9, votes: 1300 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Louis-Ferdinand Céline et de son voyage dans le monde.",
      characters: ['Louis-Ferdinand Céline', 'Louis-Ferdinand Céline', 'Louis-Ferdinand Céline', 'Louis-Ferdinand Céline', 'Louis-Ferdinand Céline'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 100
    },
    {
      id: 'book14',
      title: 'L\'Écume des jours',
      author: 'Boris Vian',
      coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      rating: { average: 3.8, votes: 1100 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Boris Vian et de son voyage dans le monde.",
      characters: ['Boris Vian', 'Boris Vian', 'Boris Vian', 'Boris Vian', 'Boris Vian'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 80
    },
    {
      id: 'book15',
      title: 'La Nausée',
      author: 'Jean-Paul Sartre',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 3.7, votes: 900 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Jean-Paul Sartre et de son voyage dans le monde.",
      characters: ['Jean-Paul Sartre', 'Jean-Paul Sartre', 'Jean-Paul Sartre', 'Jean-Paul Sartre', 'Jean-Paul Sartre'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 60
    },
    {
      id: 'book16',
      title: 'Bel-Ami',
      author: 'Guy de Maupassant',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80',
      rating: { average: 3.6, votes: 700 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Guy de Maupassant et de son voyage dans le monde.",
      characters: ['Guy de Maupassant', 'Guy de Maupassant', 'Guy de Maupassant', 'Guy de Maupassant', 'Guy de Maupassant'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 40
    },
    {
      id: 'book17',
      title: 'Les Fleurs du mal',
      author: 'Charles Baudelaire',
      coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      rating: { average: 3.5, votes: 500 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Charles Baudelaire et de son voyage dans le monde.",
      characters: ['Charles Baudelaire', 'Charles Baudelaire', 'Charles Baudelaire', 'Charles Baudelaire', 'Charles Baudelaire'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 20
    },
    {
      id: 'book18',
      title: 'Candide',
      author: 'Voltaire',
      coverUrl: 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 3.4, votes: 300 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Voltaire et de son voyage dans le monde.",
      characters: ['Voltaire', 'Voltaire', 'Voltaire', 'Voltaire', 'Voltaire'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 0
    },
  ],
  westernRomance: [
    {
      id: 'book19',
      title: 'Le Ranch des McCoy',
      author: 'Emma Wilson',
      coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
      rating: { average: 3.3, votes: 1000 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Emma Wilson et de son voyage dans le monde.",
      characters: ['Emma Wilson', 'Emma Wilson', 'Emma Wilson', 'Emma Wilson', 'Emma Wilson'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 100
    },
    {
      id: 'book20',
      title: 'Coeur Sauvage',
      author: 'Sarah Johnson',
      coverUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: { average: 3.2, votes: 800 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Sarah Johnson et de son voyage dans le monde.",
      characters: ['Sarah Johnson', 'Sarah Johnson', 'Sarah Johnson', 'Sarah Johnson', 'Sarah Johnson'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 80
    },
    {
      id: 'book21',
      title: 'Le Cowboy et la Citadine',
      author: 'John Smith',
      coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 3.1, votes: 600 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de John Smith et de son voyage dans le monde.",
      characters: ['John Smith', 'John Smith', 'John Smith', 'John Smith', 'John Smith'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 60
    },
    {
      id: 'book22',
      title: 'Passion dans le Montana',
      author: 'Lisa Brown',
      coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      rating: { average: 3.0, votes: 400 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Lisa Brown et de son voyage dans le monde.",
      characters: ['Lisa Brown', 'Lisa Brown', 'Lisa Brown', 'Lisa Brown', 'Lisa Brown'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 40
    },
    {
      id: 'book23',
      title: 'Le Secret du Ranch',
      author: 'Michael Davis',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: { average: 2.9, votes: 200 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Michael Davis et de son voyage dans le monde.",
      characters: ['Michael Davis', 'Michael Davis', 'Michael Davis', 'Michael Davis', 'Michael Davis'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 20
    },
    {
      id: 'book24',
      title: 'Amour sous les Étoiles',
      author: 'Jennifer Wilson',
      coverUrl: 'https://images.unsplash.com/photo-1531901599143-c9c1fbfc97c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1044&q=80',
      rating: { average: 2.8, votes: 100 },
      description: "Un roman de fantasy et de philosophie, suivant l'histoire de Jennifer Wilson et de son voyage dans le monde.",
      characters: ['Jennifer Wilson', 'Jennifer Wilson', 'Jennifer Wilson', 'Jennifer Wilson', 'Jennifer Wilson'],
      publisher: "Éditions Gallimard",
      pageCount: 500,
      genres: ['Classique', 'Fantasy', 'Philosophie'],
      awards: ['Prix Nobel de littérature'],
      isbn: "978-2070409228",
      reviewCount: 10
    },
  ]
};