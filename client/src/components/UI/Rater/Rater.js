import React from "react";

import classes from "./rater.module.css";

const Rater = (props) => {
  const { rating } = props;
  let stars = null;
  console.log(rating);

  if (rating === undefined) {
    return stars;
  }

  const totalStars = Array(Math.round(rating)).fill("star");
  console.log(totalStars);

  stars = totalStars.map((star) => {
    return (
      <span className={classes.Star} key={star}>
        &#9733;
      </span>
    );
  });

  console.log(stars);

  return <div>{stars}</div>;
};

export default Rater;
