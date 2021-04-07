import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/Login";
import Layout from "./components/Layout";
// import DummyContent from "./components/DummyContent";
import Dashboard from "./pages/Dashboard";
import EventsTable from "./components/Events";
import Calidad from "./pages/Calidad";
import Planos from "./pages/Planos";
import Personal from "./pages/Personal";
import Inventario from "./pages/Inventario";

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("obras-token")
  );

  useEffect(() => {
    console.log("running Effect with token changed");
    console.log(token);
  }, [token]);

  if (!token) return <LoginPage setToken={setToken} />;

  return (
    <Router>
      <Layout setToken={setToken}>
        <Switch>
          <Route path="/planos">
            <Planos />
          </Route>
          <Route path="/qa">
            <Calidad />
          </Route>
          <Route path="/personal">
            <Personal />
          </Route>
          <Route path="/inventarios">
            <Inventario />
          </Route>
          <Route path="/">
            <Dashboard />
            {/* <EventsTable /> */}
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
