import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginator({ phrase = "", totalPages = 0 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const colors = [
    "text-blue-500",
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-1">
        {phrase.split("").map((letter, index) => (
          <span
            key={index}
            className={`${colors[index % colors.length]} text-3xl font-medium`}
          >
            {letter}
          </span>
        ))}
      </div>
      <nav className="flex items-center gap-4 text-sm" aria-label="Pagination">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 text-[#4285F4] hover:underline disabled:text-gray-400 disabled:no-underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-1 hover:underline ${
                currentPage === i + 1
                  ? "text-black pointer-events-none"
                  : "text-[#4285F4]"
              }`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 text-[#4285F4] hover:underline disabled:text-gray-400 disabled:no-underline"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
