import "./App.css";
import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

import Layout from "./components/Layout";
import DummyContent from "./components/DummyContent";
import ObrasTable from "./components/ObrasTable";
import EventsTable from "./components/EventTable";

const GET_CALIDAD_IDS = gql`
  query {
    calidads {
      id
      obra {
        nombre
      }
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(GET_CALIDAD_IDS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.calidads.map(({ id, obra: { nombre } }) => (
    <div key={id}>
      <h1>Obra: {nombre}</h1>
      <p>IDS : {id} </p>
    </div>
  ));
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
      <ObrasTable />
      <EventsTable />
    </Layout>
  );
}

export default App;
