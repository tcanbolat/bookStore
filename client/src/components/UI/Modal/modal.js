import React from "react";

import classes from "./modal.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import BackDrop from "../Backdrop/backdrop";

const Modal = (props) => {
  return (
    <Aux>
      <BackDrop show={props.show} clicked={props.clicked} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        className={classes.Modal}

      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
