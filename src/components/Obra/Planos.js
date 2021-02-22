import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_PLANOS_WITH_ID } from "../../adapters/queries";

function TableRow({ name, url, tipo }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{name}</td>
      <td className="w-1/3 text-left py-3 px-4">{tipo}</td>
      <td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>
          GET
        </a>
      </td>
    </tr>
  );
}

export default function Planos() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PLANOS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { plano },
  } = data;

  const { civiles, mecanicos, piping } = plano;

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre del plano
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Tipo de plano
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descargar
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {civiles.map((plano) => (
          <TableRow {...plano} key={plano.name} tipo="Estructural" />
        ))}
        {mecanicos.map((plano) => (
          <TableRow {...plano} key={plano.name} tipo="Mecanico" />
        ))}
        {piping.map((plano) => (
          <TableRow {...plano} key={plano.name} tipo="Piping" />
        ))}
      </tbody>
    </table>
  );
}
