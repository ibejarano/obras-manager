import React from "react";
import { gql, useMutation } from "@apollo/client";

const AVAILABLE_DIAMETERS = [
  "1",
  "1 1/4",
  "2",
  "2 1/2",
  "4",
  "6",
  "8",
  "12",
  "16",
  "24",
  "30",
];

const UPDATE_INVENTORY_PIPING = gql`
  mutation(
    $diametro_pulg: String!
    $material: String!
    $num_serie: String!
    $cantidad_mts: Float!
    $id: ID!
  ) {
    updateInventario(
      input: {
        where: { id: $id }
        data: {
          material_piping: [
            {
              diametro_pulg: $diametro_pulg
              material: $material
              num_serie: $num_serie
              cantidad_mts: $cantidad_mts
            }
          ]
        }
      }
    ) {
      inventario {
        material_piping {
          diametro_pulg
          num_serie
          cantidad_mts
          material
        }
      }
    }
  }
`;

export default function AddPipingMaterial({ setOpen, idInventario }) {
  let tmpValue;
  const [newItem, setNewItem] = React.useState({
    diametro_pulg: "",
    cantidad_mts: 0.0,
    material: "",
    num_serie: "",
  });

  const [updateInventario] = useMutation(UPDATE_INVENTORY_PIPING);

  const handleChange = (e) => {
    const attr = e.target.name;
    if (attr == "cantidad_mts") {
      tmpValue = parseFloat(e.target.value);
    } else {
      tmpValue = e.target.value;
    }

    setNewItem((prev) => ({ ...prev, [attr]: tmpValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInventario({
      variables: { ...newItem, id: idInventario },
    }).then(({ data: { updateInventario } }) => console.log(updateInventario));
  };

  return (
    <form
      className="shadow overflow-hidden sm:rounded-md w-1/6 absolute top-12.5 right-3.5"
      onSubmit={handleSubmit}
    >
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-6 lg:col-span-6">
            <label
              htmlFor="diametro_pulg"
              className="block text-sm font-medium text-gray-700"
            >
              Diametro [pulg]
            </label>
            <select
              name="diametro_pulg"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
              value={newItem.diametro_pulg}
            >
              <option selected disabled value="">
                -Seleccione uno-
              </option>
              {AVAILABLE_DIAMETERS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label
              htmlFor="cantidad_mts"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad [metros]
            </label>
            <input
              type="number"
              onChange={handleChange}
              name="cantidad_mts"
              value={newItem.cantidad_mts}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="material"
              value={newItem.material}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label
              htmlFor="num_serie"
              className="block text-sm font-medium text-gray-700"
            >
              Numero de serie / Lote
            </label>

            <input
              type="text"
              onChange={handleChange}
              name="num_serie"
              value={newItem.num_serie}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-row px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Actualizar
            </button>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="justify-center mx-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
