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
      {material && <td className="text-left py-3 px-4">{material}</td>}
      {num_serie && <td className="text-left py-3 px-4">{num_serie}</td>}
    </tr>
  );
}

function PipingTable({ materiales }) {
  const [newItem, setNewItem] = React.useState({
    diametro_pulg: 0,
    cantidad_mts: 0,
    material: "",
    num_serie: "",
  });

  const handleChange = (e) => {
    const attr = e.target.name;
    setNewItem((prev) => ({ ...prev, [attr]: e.target.value }));
  };

  const NewItem = ({ diametro_pulg, cantidad_mts, material, num_serie }) => (
    <tr className="bg-white-200">
      <td className="w-1/3 text-left py-3 px-4">
        <input
          onChange={handleChange}
          name="diametro_pulg"
          type="number"
          value={diametro_pulg}
        />
      </td>
      <td className="w-1/3 text-left py-3 px-4">
        <input
          type="number"
          onChange={handleChange}
          name="cantidad_mts"
          value={cantidad_mts}
        />
      </td>
      <td className="text-left py-3 px-4">
        <input
          type="text"
          onChange={handleChange}
          name="material"
          value={material}
        />
      </td>
      <td className="text-left py-3 px-4">
        <input
          type="text"
          onChange={handleChange}
          name="num_serie"
          value={num_serie}
        />
      </td>
    </tr>
  );

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
            Material
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
        <NewItem {...newItem} />
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
      {obra && (
        <h1 className="text-xl pb-3 flex items-center">{obra.nombre}</h1>
      )}
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
