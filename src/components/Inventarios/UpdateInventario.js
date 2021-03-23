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
        <option disabled value="disabled">
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

export default function AddPipingMaterial({ idInventario, refetch }) {
  const [newItem, setNewItem] = React.useState({
    descripcion: "",
    diametro_pulg: "disabled",
    cantidad: "",
    material: "",
    num_serie: "",
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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <RadioButtons
            handleCheck={handleChange}
            selected={newItem.mat_type}
          />
          <div>
            <label htmlFor="cantidad">Descripcion (Solo para welding)</label>
            <input
              type="text"
              onChange={handleChange}
              name="descripcion"
              value={newItem.descripcion}
              disabled={newItem.mat_type != "welding"}
            />
          </div>
          <SelectField newItem={newItem} handleChange={handleChange} />
          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label htmlFor="cantidad">Cantidad (metros o unidades)</label>
            <input
              type="number"
              onChange={handleChange}
              name="cantidad"
              value={newItem.cantidad}
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
            <label htmlFor="material">Material</label>
            <input
              type="text"
              onChange={handleChange}
              name="material"
              value={newItem.material}
            />
          </div>

          <div>
            <label htmlFor="num_serie">Numero de serie / Lote</label>

            <input
              type="text"
              onChange={handleChange}
              name="num_serie"
              value={newItem.num_serie}
            />
          </div>

          <div>
            <button type="submit">Actualizar</button>
          </div>
        </div>
      </div>
    </form>
  );
}
