import React, { useState } from "react";

import classes from "./searchForm.module.css";

const SearchForm = ({submitForm}) => {
  const [input, setInput] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(input);
    submitForm(input);
    setInput("");
  };

  console.log("SEARCHFORM>JS : RENDERING...");

  return (
    <div className={[classes.SearchContainer, ]}>
      <form onSubmit={submitHandler}>
        <input
        className={classes.Input}
        placeholder="Search..."
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          required
        />
        <button type="submit" className={classes.Icon} />
      </form>
    </div>
  );
};

export default SearchForm;
