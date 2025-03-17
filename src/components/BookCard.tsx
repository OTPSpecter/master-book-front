import React, { useState } from "react";
import { PlusIcon, CheckIcon, XIcon } from "lucide-react";
import BookModal from "./BookModal";

interface BookCardProps {
  id: string;
  coverUrl: string;
  title: string;
  author: string;
  description: string | null;
  isInWishlist: boolean;
  isRead: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleReadList: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  coverUrl,
  title,
  author,
  isInWishlist,
  isRead,
  onToggleWishlist,
  onToggleReadList,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="relative group min-w-[180px] h-[300px] transition-transform duration-300 transform hover:scale-105 hover:z-10 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover rounded-sm"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="text-white font-medium text-sm">{title}</h3>
          <p className="text-gray-300 text-xs mb-2">{author}</p>
          {/* Action buttons */}
          <div
            className="flex justify-between mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onToggleWishlist(id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isInWishlist ? "bg-red-600" : "bg-gray-700"}`}
            >
              {isInWishlist ? <XIcon size={16} /> : <PlusIcon size={16} />}
            </button>
            <button
              onClick={() => onToggleReadList(id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isRead ? "bg-red-600" : "bg-gray-700"}`}
            >
              <CheckIcon size={16} />
            </button>
          </div>
        </div>
      </div>
      <BookModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isInWishlist={isInWishlist}
        isRead={isRead}
        onToggleWishlist={onToggleWishlist}
        onToggleReadList={onToggleReadList}
      />
    </>
  );
};
export default BookCard;
