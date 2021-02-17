import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_INVENTARIOS_DATA = gql`
  query {
    inventarios {
      obra {
        nombre
      }
      material_piping {
        diametro_pulg
        cantidad_mts
        num_serie
      }
      material_welding {
        diametro_pulg
        unidades
        num_serie
      }
      material_estructural {
        cantidad_mts
        material
        tipo_perfil
      }
    }
  }
`;

function TableRow({
  diametro_pulg,
  cantidad_mts,
  num_serie,
  unidades,
  material,
  tipo_perfil,
}) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">
        {diametro_pulg || tipo_perfil}
      </td>
      <td className="w-1/3 text-left py-3 px-4">{cantidad_mts || unidades}</td>
      <td className="text-left py-3 px-4">{num_serie || material}</td>
    </tr>
  );
}

function PipingTable({ materiales }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Diametro [pulg]
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Cantidad [metros]
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Serie
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </tbody>
    </table>
  );
}

function WeldingTable({ materiales }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Diametro [pulg]
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Unidades
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Serie
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </tbody>
    </table>
  );
}

function EstructTable({ materiales }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Tipo de perfil
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Cantidad [metros]
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Material
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </tbody>
    </table>
  );
}

function Inventario({
  obra,
  material_piping,
  material_welding,
  material_estructural,
}) {
  return (
    <div className="w-full mt-12">
      <h1 className="text-xl pb-3 flex items-center">{obra.nombre}</h1>
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i>Piping
      </p>
      <div className="bg-white overflow-auto">
        <PipingTable materiales={material_piping} />
      </div>
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i>Welding
      </p>
      <div className="bg-white overflow-auto">
        <WeldingTable materiales={material_welding} />
      </div>

      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i>Perfiles Estructurales
      </p>
      <div className="bg-white overflow-auto">
        <EstructTable materiales={material_estructural} />
      </div>
    </div>
  );
}

export default function Inventarios() {
  const { loading, error, data } = useQuery(GET_INVENTARIOS_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { inventarios } = data;
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Inventario</h1>
          {inventarios.map((inventario) => (
            <Inventario key={inventario.obra.nombre} {...inventario} />
          ))}
        </main>
      </div>
    </div>
  );
}
