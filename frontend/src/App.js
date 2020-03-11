import React from "react";
import history from "services/History";
import { Router, Switch } from "react-router-dom";
import AppRoute from "services/AppRoute";
import { Provider } from "react-redux";
import store from "./Store";

/** Layouts */
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import MasterLayout from "layouts/MasterLayout/MasterLayout";

/** Components */
import Login from "components/Login/Login";
import Dashboard from "components/Dashboard/Dashboard";
import Results from "components/Results/Results";
import PageNotFound from "components/PageNotFound/PageNotFound";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Login} layout={LoginLayout} />
          <AppRoute
            exact
            path="/dashboard"
            component={Dashboard}
            layout={MasterLayout}
          />
          <AppRoute
            exact
            path="/results"
            component={Results}
            layout={LoginLayout}
          />
          <AppRoute component={PageNotFound} layout={LoginLayout} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
