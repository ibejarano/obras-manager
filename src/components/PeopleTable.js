import React from "react";
import { useQuery } from "@apollo/client";

import { GET_PERSONAS } from "../adapters/queries";

function TableRow({ nombre, apellido, cargo, obra }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{nombre}</td>
      <td className="w-1/3 text-left py-3 px-4">{apellido}</td>
      {cargo && <td className="text-left py-3 px-4">{cargo}</td>}
      {obra && <td className="text-left py-3 px-4">{obra.nombre}</td>}
    </tr>
  );
}

function PeopleObra({ people }) {
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
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Obra
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {people.map((person) => (
          <TableRow {...person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
}

function PeopleWithoutObra({ people }) {
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
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Cargo
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {people.map((person) => (
          <TableRow {...person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
}

export default function ObrasTable({ extData = null }) {
  const { loading, error, data } = useQuery(GET_PERSONAS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { people } = data;
  const peopleWithoutObra = people.filter((person) => !person.obra);
  const peopleWithObra = people.filter((person) => person.obra);

  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Personal</h1>
          <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> En Obra
            </p>
            <div className="bg-white overflow-auto">
              <PeopleObra people={peopleWithObra} />
            </div>
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> Sin Obra asignada
            </p>
            <div className="bg-white overflow-auto">
              <PeopleWithoutObra people={peopleWithoutObra} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
