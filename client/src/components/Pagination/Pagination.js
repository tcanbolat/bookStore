import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="Pagination">
        {totalPosts === 0 ? null : <p>{"Total Results " + totalPosts}</p>}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className="PageNumber"
          >
            <a onClick={() => paginate(number)} href="!#">
              {"  " + number + "  "}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
