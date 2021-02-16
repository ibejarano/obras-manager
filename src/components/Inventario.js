import React from "react";

const data = {
  inventarios: [
    {
      obra: {
        nombre: "Planta Rosario",
      },
      material_piping: [
        {
          diametro_pulg: 24,
          cantidad_mts: 685.52,
          num_serie: "awl3198b",
        },
        {
          diametro_pulg: 16,
          cantidad_mts: 89.3,
          num_serie: "as01923a",
        },
      ],
      material_welding: [
        {
          diametro_pulg: 24,
          unidades: 2,
          num_serie: "oia12",
        },
        {
          diametro_pulg: 16,
          unidades: 76,
          num_serie: "991apw",
        },
      ],
      material_estructural: [
        {
          cantidad_mts: 126.12,
          material: "F54",
          tipo_perfil: "L",
        },
        {
          cantidad_mts: 14.11,
          material: "F12",
          tipo_perfil: "U",
        },
      ],
    },
    {
      obra: {
        nombre: "Reparacion Cordoba #223",
      },
      material_piping: [],
      material_welding: [],
      material_estructural: [
        {
          cantidad_mts: 123.1,
          material: "F23",
          tipo_perfil: "dobleT",
        },
      ],
    },
  ],
};

function TableRow({ diametro_pulg, cantidad_mts, num_serie, unidades, material, tipo_perfil }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{diametro_pulg || tipo_perfil}</td>
      <td className="w-1/3 text-left py-3 px-4">{cantidad_mts || unidades}</td>
      <td className="text-left py-3 px-4">{num_serie || material }</td>
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
        {materiales.map((material) => (
          <TableRow {...material} />
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
        {materiales.map((material) => (
          <TableRow {...material} />
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
        {materiales.map((material) => (
          <TableRow {...material} />
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
  const { inventarios } = data;
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Inventario</h1>
          {inventarios.map((inventario) => (
            <Inventario {...inventario} />
          ))}
        </main>
      </div>
    </div>
  );
}
