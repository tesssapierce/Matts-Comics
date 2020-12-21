import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import ComingSoon from "./pages/ComingSoon"
import ComicMain from "./pages/ComicMain"
import Login from "./pages/Login"

function App() {

  const [isAuth, setIsAuth] = useState(false)

  function setAuth(formEntry) {
    console.log(formEntry)
    if (formEntry.password === "mattscomics") {
      setIsAuth(true);
      window.location ="/comics"
    } else {
      alert("This is the wrong password")
      setIsAuth(false)
    }
  }

  React.useEffect(() => {
    const data = localStorage.getItem("isAuth");
    if (data) {
      setIsAuth(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    console.log(isAuth);
    saveToLocalStorage();
  }, [isAuth])

  function saveToLocalStorage() {
    localStorage.setItem("isAuth", JSON.stringify(isAuth))
  }

  return (
    <Router>
      <div>
        <Nav isAuth={isAuth} setAuth={setAuth} />
        <Switch>
          {isAuth ? (
            <>
              <Route exact path="/">
                <Login setAuth={setAuth} isAuth={isAuth}/>
              </Route>
              <Route exact path="/comics">
                <ComicMain />
              </Route>
            </>
          ) : (
              <>
                <Route exact path="/">
                  <Login setAuth={setAuth} />
                </Route>
              </>
            )}
          {/* How do I get this 404 to work! */}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
