import React from "react";

import classes from "./pagination.module.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  loading,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {totalPosts === 0 ? null : <p>{"Total Results: " + totalPosts}</p>}
      {loading ? null : (
        <ul className={classes.Pagination}>
          {pageNumbers.map((number) => (
            <li
              onClick={() => paginate(number)}
              key={number}
              className={[
                classes.PageNumbers,
                currentPage === number ? classes.Active : null,
              ].join(" ")}
            >
              <soft>{number}</soft>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
