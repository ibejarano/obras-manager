import React from "react";

function TableRow({ nombre, ubicacion, cliente, inicio, fin }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{nombre}</td>
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
      <tbody className="text-gray-700"></tbody>
    </table>
  );
}

export default function EventsTable({ extData = null }) {
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <div className="w-full flex-grow p-6 mt-12">
          <p className="text-xl pb-3 flex items-center">
            <i className="fas fa-list mr-3"></i> Proximos eventos
          </p>
          <div className="bg-white overflow-auto">
            <Table obras={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
