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
      {totalPosts === 0 || totalPosts === undefined || loading ? null : <p>{"Total Results: " + totalPosts}</p>}
      {loading ? null : (
        <div className={classes.Pagination}>
          {pageNumbers.map((number) => (
            <span
              onClick={() => paginate(number)}
              key={number}
              className={[
                classes.PageNumbers,
                currentPage === number ? classes.Active : null,
              ].join(" ")}
            >
              <span>{number}</span>
            </span>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Pagination;
