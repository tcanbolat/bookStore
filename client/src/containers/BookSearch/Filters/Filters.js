import React, { useState, useEffect } from "react";

import classes from "./filters.module.css";

const Filters = ({ filterBy, loading }) => {
  const [selectedInput, setSetlectedInput] = useState("all");

  useEffect(() => {
    if (loading) {
      setSetlectedInput("all");
    }
    filterBy(selectedInput);
  }, [selectedInput, loading]);

  return (
    <div className={classes.Container}>
      <h3>Filter</h3>
      <form>
        <input
          onChange={() => setSetlectedInput("available")}
          checked={selectedInput === "available"}
          type="radio"
          value="available"
        />
        <label>availabe</label>
        <input
          type="radio"
          value="na"
          onChange={() => setSetlectedInput("na")}
          checked={selectedInput === "na"}
        />
        <label>not availabe</label>
        <input
          type="radio"
          value="all"
          onChange={() => setSetlectedInput("all")}
          checked={selectedInput === "all"}
        />
        <label>show all</label>
      </form>
    </div>
  );
};

export default Filters;
