import React, { useState } from "react";

import classes from "./searchForm.module.css";

const SearchForm = ({ submitForm }) => {
  const [input, setInput] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    submitForm(input);
    setInput("");
  };

  return (
    <div className={classes.SearchContainer}>
      <form onSubmit={submitHandler}>
        <input
          className={classes.Input}
          placeholder="Search..."
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          required
        />
        <button type="submit" className={classes.Icon}>
          <svg className={classes.Icon} xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth="2" stroke="#6c6c6c" fill="none">
              <path d="M11.29 11.71l-4-4" />
              <circle cx="5" cy="5" r="4" />
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
