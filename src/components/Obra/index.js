import React from "react";
import { useQuery } from "@apollo/client";

import { useParams, Link, Route, Switch } from "react-router-dom";

import Calidad from "./Calidad";
import PeopleObra from "./People";
import Planos from "./Planos";
import Inventario from "./Inventario";
import Gallery from "./Gallery";
import ShowGallery from "./Gallery/ShowGallery";

import { GET_OBRAS_WITH_ID } from "../../adapters/queries";

function PageInfo({ title, url, description }) {
  return (
    <Link to={url}>
      <div className="flex-initial bg-white shadow overflow-hidden sm:rounded-lg m-2">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
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
      <div className="w-full overflow-x-hidden border-t flex flex-col p-6">
        <div className="sticky top-0 p-4 w-full flex flex-row justify-between items-center bg-purple-600 text-white">
          <h1 className="text-3xl">Obra: {obra.nombre}</h1>
          <p className="text-xl ">Cliente: {obra.cliente}</p>
        </div>
        <Switch>
          <Route path="/:id/galeria/:idGaleria" children={<ShowGallery />} />
          <Route path="/:id/galeria" children={<Gallery />} />
          <Route path="/:id/personal" children={<PeopleObra />} />
          <Route path="/:id/inventario" children={<Inventario />} />
          <Route path="/:id/calidad" children={<Calidad />} />
          <Route path="/:id/planos" children={<Planos />} />
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
                description="Fotos de fases de la obra"
                url={`${id}/galeria`}
              />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
