import React from "react";

import Aux from "../../hoc/Auxillary/Auxillary";

const bookDetails = (props) => {
  return (
    <Aux>
  <h3>Title: {props.title}</h3>
  <h3>subtitle: {props.subtitle}</h3>
  <h3>page count: {props.pageCount}</h3>
  <h3>previewLink:{props.previewLink}</h3>
  <h3>Pub Date: {props.publishedDate}</h3>
  <h3>description: {props.description}</h3>

    </Aux>
  );
};

export default bookDetails;
