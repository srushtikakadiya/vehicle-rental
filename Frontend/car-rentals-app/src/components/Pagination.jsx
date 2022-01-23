import React from "react";
const Pagination = ({ currentPage, carsPerPage, carsCount, handlePageChange }) => {
  const pagesCount = Math.ceil(carsCount / carsPerPage);
  function buildPages() {
    const pagesArr = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagesArr.push(
        <li key={i} onClick={()=>handlePageChange(i)} className={currentPage === i ? "page-item active" : "page-item"}>
          <p className="page-link">
            {i}
          </p>
        </li>
      );
    }
    return pagesArr;
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li key="prev" onClick={()=>handlePageChange(currentPage - 1 === 0 ? currentPage : currentPage - 1)} className="page-item">
          <p className="page-link">
            Previous
          </p>
        </li>
        {buildPages()}
        <li key="next" onClick={()=>handlePageChange(currentPage + 1 > pagesCount ? currentPage : currentPage + 1)} className="page-item">
          <p className="page-link">
            Next
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
