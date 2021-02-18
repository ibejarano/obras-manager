import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useParams, Link, Route, Switch } from "react-router-dom";

import Calidad from "./Calidad";
import PeopleObra from "./People";
import Planos from "./Planos";
import Inventario from "./Inventario";

const GET_OBRAS_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      nombre
      cliente
    }
  }
`;

function PageInfo({ title, url, description }) {
  return (
    <Link to={url}>
      <div class="flex-initial bg-white shadow overflow-hidden sm:rounded-lg m-2">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Obra() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OBRAS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obra } = data;

  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Obra: {obra.nombre}</h1>
          <p className="text-xl pb-3 flex items-center">
            Cliente: {obra.cliente}
          </p>
          <Switch>
            <Route path="/:id/personal">
              <PeopleObra />
            </Route>
            <Route path="/:id/inventario">
              <Inventario />
            </Route>
            <Route path="/:id/calidad">
              <Calidad />
            </Route>
            <Route path="/:id/planos">
              <Planos />
            </Route>
            <Route path="/:id">
              <div className="flex flex-wrap">
                <PageInfo
                  title="Personal"
                  description="Personal activo en obra e impresion de partes diarios"
                  url={`${id}/personal`}
                />
                <PageInfo
                  title="Inventario"
                  description="Materiales disponibles en obra"
                  url={`${id}/inventario`}
                />
                <PageInfo
                  title="Planos"
                  description="Planos mecanicos, piping y estructurales. PDF y DWG."
                  url={`${id}/planos`}
                />
                <PageInfo
                  title="Calidad"
                  description="Ceriticados de instrumentos, planillas y procedimientos"
                  url={`${id}/calidad`}
                />
                <PageInfo
                  title="Galeria de fotos"
                  description="No implementado"
                />
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}
