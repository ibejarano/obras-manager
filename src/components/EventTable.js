import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_EVENTOS = gql`
  query {
    eventos {
      id
      obra {
        nombre
      }
      Descripcion
      fecha
    }
  }
`;

function TableRow({ obra, Descripcion, fecha }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{obra.nombre}</td>
      <td className="w-1/3 text-left py-3 px-4">{Descripcion}</td>
      <td className="text-left py-3 px-4">{fecha}</td>
    </tr>
  );
}

function Table({ eventos }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Obra
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descripcion
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Fecha
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {eventos.map((e) => (
          <TableRow key={e.id} {...e} />
        ))}
      </tbody>
    </table>
  );
}

export default function EventsTable() {
  const { loading, error, data } = useQuery(GET_EVENTOS);

  if (loading) return <h2>Loading....</h2>;

  if (error) return <h2>Error :( </h2>;

  const { eventos } = data;

  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <div className="w-full flex-grow p-6 mt-12">
          <p className="text-xl pb-3 flex items-center">
            <i className="fas fa-list mr-3"></i> Proximos eventos
          </p>
          <div className="bg-white overflow-auto">
            <Table eventos={eventos} />
          </div>
        </div>
      </div>
    </div>
  );
}
