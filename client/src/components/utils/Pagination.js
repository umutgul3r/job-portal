import React from "react";
const Pagination = ({ paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(4); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-12">
      <ul className="flex gap-2 bottom-3">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className="font-medium bg-slate-200 w-10 h-12 mb-10 rounded-full text-xl"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
