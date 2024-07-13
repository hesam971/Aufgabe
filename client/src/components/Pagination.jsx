import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, index) => ( // create a list of page numbers with Array.from, and Render each one with a unique key.
          <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
  );
};

export default Pagination;
