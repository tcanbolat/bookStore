import axios from "../../../functions/node_modules/axios";

// cancel token to cancel subsequent requests, coming from "/api/cart"
// the setTimout(); in Cart.js already catches all them, but this is here to use as well.
let cancel;
const CancelToken = axios.CancelToken;
if (cancel !== undefined) {
  cancel({
    message: "subsequent request cancelled",
  });
}

// this instance is used for each axios call in the API.js file located in the same root as this file.
// I use this in conjuction with the errorHandler.js file located in the hoc folder.
const instance = axios.create({
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});

export default instance;
