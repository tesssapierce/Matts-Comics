import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import ComingSoon from "./pages/ComingSoon"
import ComicMain from "./pages/ComicMain"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <ComingSoon />
          </Route>
          <Route exact path="/comics">
            <ComicMain />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
