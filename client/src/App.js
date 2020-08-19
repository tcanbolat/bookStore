import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./components/Layout/layout";
import BookSearch from "./containers/BookSearch/bookSearch";

// React lazy loading.
// will load it as a chunk when the component first renders.
const Cart = React.lazy(() => {
  return import("./containers/Cart/Cart");
});

const Checkout = React.lazy(() => {
  return import("./components/Checkout/Checkout");
})

const App = (props) => {
  let routes = (
    <Switch>
      <Route exact path="/cart" render={(props) => <Cart {...props} />} />
      <Route exact path="/checkout" render={(props) => <Checkout {...props} />} />
      <Route exact path="/" component={BookSearch} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
