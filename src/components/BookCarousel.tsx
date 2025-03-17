import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import BookCard from "./BookCard";
// import { Book } from "../data/booksData";

interface BookCarouselProps {
  title: string;
  books: any[];
  wishlist: string[];
  readList: string[];
  onToggleWishlist: (id: string) => void;
  onToggleReadList: (id: string) => void;
}
const BookCarousel: React.FC<BookCarouselProps> = ({
  title,
  books,
  wishlist,
  readList,
  onToggleWishlist,
  onToggleReadList,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current: container } = carouselRef;
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div className="my-8">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div className="relative group">
        {/* Left scroll button */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeftIcon size={24} />
        </button>
        {/* Carousel container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll gap-2 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {books.map((book: any) => {
            let [title, rating, category, isbn, coverUrl, id, author, description] = book; // Extraction des données

            // Vérification si l'auteur est null ou undefined
            const authorName = author ?? "Pas d'auteur"; // Si author est null ou undefined, utiliser "Pas d'auteur"

            {title = decodeURIComponent(escape(title));}
            return (
              <BookCard
                key={id} // Utilisation d'une clé de secours
                id={id}
                coverUrl={coverUrl}
                title={title}
                author={authorName}
                description={description}
                isInWishlist={wishlist.includes(id)}
                isRead={readList.includes(id)}
                onToggleWishlist={onToggleWishlist}
                onToggleReadList={onToggleReadList}
              />
            );
          })}
        </div>
        {/* Right scroll button */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>
    </div>
  );
};
export default BookCarousel;
