import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import UploadCalidad from "./UploadCalidad";
import { GET_CALIDAD_WITH_ID } from "../../adapters/queries";

function TableRow({ name, url }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{name}</td>
      <td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>
          GET
        </a>
      </td>
    </tr>
  );
}

export default function Calidad() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CALIDAD_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { calidad },
  } = data;

  const { certificados } = calidad;

  return (
    <React.Fragment>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Nombre
            </th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Descargar
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {certificados.map((cert) => (
            <TableRow {...cert} key={cert.url} />
          ))}
        </tbody>
      </table>
      <UploadCalidad />
    </React.Fragment>
  );
}
