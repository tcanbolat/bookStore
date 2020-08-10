import React from "react";

import classes from "./rater.module.css";

const Rater = (props) => {
  const { rating } = props;
  let stars = null;

  if (rating === undefined) {
    return stars;
  }

  const totalStars = Array(Math.round(rating)).fill("star");
  console.log(totalStars);

  stars = totalStars.map((star, index) => {
    return (
      <span className={classes.Star} key={index}>
        &#9733;
      </span>
    );
  });

  return <div>{stars}</div>;
};

export default Rater;
