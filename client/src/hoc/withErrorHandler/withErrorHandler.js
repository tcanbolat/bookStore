import React, { useState, useEffect } from "react";

import BookLogo from "../../assets/images/books-icon.jpg";
import classes from "./withErrorHandler.module.css";
import Modal from "../../components/UI/Modal/modal";
import Aux from "../Auxillary/Auxillary";

// this hoc intercepts all axios request ands responses made from the front end of the app.
// this is wrapped around all containers that have axios calls being used.
// example: export default withErrorHandler(ContainerName, instance);
// instance is coming from the axios-instance.js file in the utils folder.

const withErrorHandler = (WrappedComponent, instance) => {
  return (props) => {
    // setting up an error state.
    const [error, setError] = useState(null);

    // setting up the interceptor for any requsts.
    const reqInterceptor = instance.interceptors.request.use((req) => {
      setError(null);
      // and sending it through with out doing anything.
      return req;
    });
    // setting up the interceptor for any responses.
    const resInterceptor = instance.interceptors.response.use(
      (res) => {
        // if no error, send the response through.
        return res;
      },
      (err) => {
        // if error set the error state to the error message.
        setError(err.message);
        // and send it as an error.
        return Promise.reject(err);
      }
    );

    // this is an effect that will close all requests and responses, preventing memory leaks.
    useEffect(() => {
      return () => {
        instance.interceptors.request.eject(reqInterceptor);
        instance.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    // handler used to set the error to null after clicking out of the error.
    const errorConfirmedHandler = () => {
      setError(null);
    };

    // show a modal with the error message if the error has happend.
    return (
      <Aux>
        <Modal show={error} clicked={errorConfirmedHandler}>
          <div className={classes.ErrorBody}>
            <h3>Error!</h3>
            <img alt="book logo" style={{ width: "25%" }} src={BookLogo} />
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
