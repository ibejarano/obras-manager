import React from "react";

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

export default function InventarioObra({
  obra,
  material_piping,
  material_welding,
  material_estructural,
}) {
  return (
    <React.Fragment>
      <h1 className="text-xl pb-3 flex items-center">{obra.nombre}</h1>
      {material_piping.length > 0 && (
        <div className="w-full mt-12">
          <p className="text-l pb-3 flex items-center">
            <i className="fas fa-list mr-3"></i>Piping
          </p>
          <div className="bg-white overflow-auto">
            <PipingTable materiales={material_piping} />
          </div>
        </div>
      )}

      {material_welding.length > 0 && (
        <div className="w-full mt-12">
          <p className="text-l pb-3 flex items-center">
            <i className="fas fa-list mr-3"></i>Welding
          </p>
          <div className="bg-white overflow-auto">
            <WeldingTable materiales={material_welding} />
          </div>
        </div>
      )}
      {material_estructural.length > 0 && (
        <div className="w-full mt-12">
          <p className="text-l pb-3 flex items-center">
            <i className="fas fa-list mr-3"></i>Perfiles Estructurales
          </p>
          <div className="bg-white overflow-auto">
            <EstructTable materiales={material_estructural} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
