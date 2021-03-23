import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
// import DummyContent from "./components/DummyContent";
import Dashboard from "./pages/Dashboard";
import EventsTable from "./components/Events";
import Personal from "./pages/Personal";
import Inventario from "./pages/Inventario";

function App() {
  return (
    <Router>
      <Layout>
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
