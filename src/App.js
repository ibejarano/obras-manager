import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/Login";
import Layout from "./components/Layout";
// import DummyContent from "./components/DummyContent";
import Dashboard from "./pages/Dashboard";
import EventsTable from "./components/Events";
import Personal from "./pages/Personal";
import Inventario from "./pages/Inventario";

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("obras-token")
  );

  if (!token) return <LoginPage setUser={setToken} />;

  return (
    <Router>
      <Layout token={token}>
        <Switch>
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
