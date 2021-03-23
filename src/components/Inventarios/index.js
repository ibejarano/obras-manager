import React from "react";
import { gql, useQuery } from "@apollo/client";

import InventarioObra from "./InventarioObra";
import { GET_INVENTARIOS } from "../../adapters/queries";

export default function Inventarios() {
  const { loading, error, data } = useQuery(GET_INVENTARIOS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { inventarios } = data;
  return (
    <main>
      <h1>Inventario</h1>
      {inventarios.map((inventario) => (
        <InventarioObra key={inventario.obra.nombre} {...inventario} />
      ))}
    </main>
  );
}
