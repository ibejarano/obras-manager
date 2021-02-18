import React from "react";

export default function PeopleObra({ people }) {
  const RowPersona = ({ nombre, apellido, cargo }) => (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{nombre}</td>
      <td className="w-1/3 text-left py-3 px-4">{apellido}</td>
      <td className="text-left py-3 px-4">{cargo}</td>
    </tr>
  );

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
        {people.map((person) => (
          <RowPersona {...person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
}
