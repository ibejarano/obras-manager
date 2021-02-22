import React from "react";
import { gql, useQuery } from "@apollo/client";

import InventarioObra from "./InventarioObra";

const GET_INVENTARIOS_DATA = gql`
  query {
    inventarios {
      obra {
        nombre
      }
      piping: materials(where: { tipo: "piping" }) {
        diametro_pulg
        cantidad
        num_serie
        material
      }
      welding: materials(where: { tipo: "welding" }) {
        diametro_pulg
        cantidad
        num_serie
        material
        descripcion
      }
      estructural: materials(where: { tipo: "estructural" }) {
        tipo_perfil
        cantidad
        num_serie
        material
      }
    }
  }
`;

export default function Inventarios() {
  const { loading, error, data } = useQuery(GET_INVENTARIOS_DATA);
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
