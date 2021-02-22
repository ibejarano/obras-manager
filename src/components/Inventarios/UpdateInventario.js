import React from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_ESTRUCTURAL_ENTRY,
  CREATE_PIPING_ENTRY,
  CREATE_WELDING_ENTRY,
} from "../../adapters/mutations";

const TIPOS_PERFIL = ["L", "U", "T", "dobleT"];
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

function SelectField({ newItem, handleChange }) {
  const { mat_type } = newItem;
  const optionsList =
    mat_type == "estructural" ? TIPOS_PERFIL : AVAILABLE_DIAMETERS;
  const labelText =
    mat_type == "estructural" ? "Tipo de perfil" : "Diametro [pulg]";
  const field = mat_type == "estructural" ? "tipo_perfil" : "diametro_pulg";

  return (
    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
      <label
        htmlFor={field}
        className="block text-sm font-medium text-gray-700"
      >
        {labelText}
      </label>
      <select
        name={field}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleChange}
        value={newItem[field]}
      >
        <option selected disabled value="">
          -Seleccione uno-
        </option>
        {optionsList.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}

function RadioButtons({ selected, handleCheck }) {
  return (
    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
      <input
        type="radio"
        id="piping"
        name="mat_type"
        value="piping"
        checked={"piping" == selected}
        onChange={handleCheck}
      />
      <label htmlFor="mat_type">Piping</label>
      <input
        type="radio"
        id="welding"
        name="mat_type"
        value="welding"
        onChange={handleCheck}
        checked={"welding" == selected}
      />
      <label htmlFor="mat_type">Welding</label>
      <input
        type="radio"
        id="estructural"
        name="mat_type"
        value="estructural"
        onChange={handleCheck}
        checked={"estructural" == selected}
      />
      <label htmlFor="mat_type">Estructural</label>
    </div>
  );
}

export default function AddPipingMaterial({ setOpen, idInventario, refetch }) {
  const [newItem, setNewItem] = React.useState({
    descripcion: "",
    diametro_pulg: "8",
    cantidad: "34.341",
    material: "api60xl",
    num_serie: "lls918",
    mat_type: "piping",
    tipo_perfil: "",
  });

  const [createPiping] = useMutation(CREATE_PIPING_ENTRY);
  const [createWelding] = useMutation(CREATE_WELDING_ENTRY);
  const [createEstructural] = useMutation(CREATE_ESTRUCTURAL_ENTRY);

  const handleChange = (e) => {
    const attr = e.target.name;
    setNewItem((prev) => ({ ...prev, [attr]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const outputData = { ...newItem };
    switch (newItem.mat_type) {
      case "piping":
        delete outputData.descripcion;
        delete outputData.tipo_perfil;
        delete outputData.mat_type;
        createPiping({
          variables: { ...outputData, id: idInventario },
        })
          .then(({ data: { updateInventario } }) => refetch())
          .catch((err) => console.log(err));

        break;
      case "welding":
        delete outputData.tipo_perfil;
        delete outputData.mat_type;
        createWelding({
          variables: { ...outputData, id: idInventario },
        })
          .then(({ data: { updateInventario } }) => refetch())
          .catch((err) => console.log(err.toString()));
        break;
      case "estructural":
        delete outputData.descripcion;
        delete outputData.diametro_pulg;
        delete outputData.mat_type;

        createEstructural({
          variables: { ...outputData, id: idInventario },
        })
          .then(({ data: { updateInventario } }) => refetch())
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  };

  return (
    <form
      className="shadow overflow-hidden sm:rounded-md w-1/6 absolute top-12.5 right-3.5"
      onSubmit={handleSubmit}
    >
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <RadioButtons
            handleCheck={handleChange}
            selected={newItem.mat_type}
          />
          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700"
            >
              Descripcion (Solo para welding)
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="descripcion"
              value={newItem.descripcion}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled={newItem.mat_type != "welding"}
            />
          </div>
          <SelectField newItem={newItem} handleChange={handleChange} />
          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad (metros o unidades)
            </label>
            <input
              type="number"
              onChange={handleChange}
              name="cantidad"
              value={newItem.cantidad}
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
