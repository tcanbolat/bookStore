import React, { useState, useEffect } from "react";

import BookLogo from "../../assets/images/books-icon.jpg";
import classes from "./withErrorHandler.module.css";
import Modal from "../../components/UI/Modal/modal";
import Aux from "../Auxillary/Auxillary";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        setError(err.message);
        return Promise.reject(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} clicked={errorConfirmedHandler}>
          <div className={classes.ErrorBody}>
            <h3>Error!</h3>
            <img alt="book logo" style={{width: "25%"}} src={BookLogo} />
            <div>
              <strong>error message: </strong> {error ? error : null}
            </div>
            <div>
              please try refreshing the page or checking your network
              connection.
            </div>
          </div>
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
