import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

import Layout from "./components/Layout";
// import DummyContent from "./components/DummyContent";
import ObrasTable from "./components/ObrasTable";
import EventsTable from "./components/EventTable";
import PeopleTable from "./components/PeopleTable";
import Inventarios from "./components/Inventarios";
import Obra from './components/Obra'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
        <Switch>
          <Route path="/personal">
            <PeopleTable />
          </Route>
          <Route path="/inventarios">
            <Inventarios />
          </Route>
          <Route path="/:id" children={<Obra />} />
          <Route path="/">
            <ObrasTable />
            <EventsTable />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
