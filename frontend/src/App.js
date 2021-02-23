import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import Images from "./components/Images";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route path='/' component={() => {
            return (<Images></Images>)
          }}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
