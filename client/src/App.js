import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./components/Layout/layout";
import BookSearch from "./containers/BookSearch/bookSearch";

const Cart = React.lazy(() => {
  return import("./containers/Cart/Cart");
});

const App = (props) => {
  let routes = (
    <Switch>
      <Route path="/cart" render={(props) => <Cart {...props} />} />
      <Route path="/" exact component={BookSearch} />
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
