import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_PERSONAS_WITH_ID } from "../../adapters/queries";

export default function PeopleObra() {
  const RowPersona = ({ nombre, apellido, cargo }) => (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{nombre}</td>
      <td className="w-1/3 text-left py-3 px-4">{apellido}</td>
      <td className="text-left py-3 px-4">{cargo}</td>
    </tr>
  );

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSONAS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { personas },
  } = data;

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Apellido
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Cargo
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {personas.map((person) => (
          <RowPersona {...person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
}
