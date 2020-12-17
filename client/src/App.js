import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import ComingSoon from "./pages/ComingSoon"

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <ComingSoon />
        </Route>
        {/* <Nav />
        <Switch>
          <Route exact path={["/", "/books"]}>
            <Books />
          </Route>
          <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;
