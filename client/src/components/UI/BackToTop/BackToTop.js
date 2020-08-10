import React, { useState } from "react";

import classes from "./backToTop.module.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibilityHandler = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisibilityHandler);

  return (
    <div className={classes.ToTop}>
      {visible && (
        <div onClick={() => scroll()}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns
            xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="80px"
            height="80px"
            viewBox="0 0 512 512"
            enable-background="new 0 0 512 512"
            space="preserve"
          >
            <path
              id="arrow-28-icon"
              fill="#b85240"
              transform="rotate(-90 256,256)"
              d="M90,256c0,91.755,74.258,166,166,166c91.755,0,166-74.259,166-166c0-91.755-74.258-166-166-166
                  C164.245,90,90,164.259,90,256z M462,256c0,113.771-92.229,206-206,206S50,369.771,50,256S142.229,50,256,50S462,142.229,462,256z
                  M199.955,168.598l32.263-32.107L352.154,257L232.218,377.51l-32.263-32.107L287.937,257L199.955,168.598z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
