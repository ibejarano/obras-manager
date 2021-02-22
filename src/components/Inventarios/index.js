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
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Inventario</h1>
          {inventarios.map((inventario) => (
            <InventarioObra key={inventario.obra.nombre} {...inventario} />
          ))}
        </main>
      </div>
    </div>
  );
}
