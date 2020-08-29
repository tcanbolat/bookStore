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

const instance = axios.create({
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});

export default instance;
