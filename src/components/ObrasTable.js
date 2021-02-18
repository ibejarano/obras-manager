import React from "react";
import { Link, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

// Query para obtener los datos de este componente
const GET_OBRAS_DATA = gql`
  query {
    obras {
      id
      nombre
      cliente
      ubicacion
      inicio
      fin
    }
  }
`;

function TableRow({ id, nombre, ubicacion, cliente, inicio, fin }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">
        <Link to={"/" + id}>{nombre}</Link>
      </td>
      <td className="w-1/3 text-left py-3 px-4">{cliente}</td>
      <td className="text-left py-3 px-4">{ubicacion}</td>
      <td className="text-left py-3 px-4">{inicio}</td>
      <td className="text-left py-3 px-4">{fin}</td>
    </tr>
  );
}

function Table({ obras }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Cliente
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Ubicacion
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Inicio
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Fin
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {obras.map((obra) => (
          <TableRow {...obra} key={obra.nombre} />
        ))}
      </tbody>
    </table>
  );
}

export default function ObrasTable({ extData = null }) {
  const { loading, error, data } = useQuery(GET_OBRAS_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obras } = data;
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Obras</h1>
          <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> Activas
            </p>
            <div className="bg-white overflow-auto">
              <Table obras={obras} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
