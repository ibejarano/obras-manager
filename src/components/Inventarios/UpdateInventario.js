import React from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_ESTRUCTURAL_ENTRY,
  CREATE_PIPING_ENTRY,
  CREATE_WELDING_ENTRY,
} from "../../adapters/mutations";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Select,
} from "@chakra-ui/react";

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
    <FormControl id={field}>
      <FormLabel>{labelText}</FormLabel>
      <Select
        placeholder="Seleccione uno"
        name={field}
        onChange={handleChange}
        value={newItem[field]}
      >
        {optionsList.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </Select>
    </FormControl>
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
      <RadioGroup
        onChange={(v) => setNewItem((prev) => ({ ...prev, mat_type: v }))}
        value={newItem.mat_type}
      >
        <Stack direction="row">
          <Radio value="piping">Piping</Radio>
          <Radio value="welding">Welding</Radio>
          <Radio value="estructural">Estructural</Radio>
        </Stack>
      </RadioGroup>
      <FormControl id="descripcion">
        <FormLabel>Descripcion (Solo para welding)</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="descripcion"
          value={newItem.descripcion}
          disabled={newItem.mat_type != "welding"}
        />
      </FormControl>
      <SelectField newItem={newItem} handleChange={handleChange} />
      <FormControl id="cantidad">
        <FormLabel htmlFor="cantidad">Cantidad (metros o unidades)</FormLabel>
        <Input
          type="number"
          onChange={handleChange}
          name="cantidad"
          value={newItem.cantidad}
        />
      </FormControl>

      <FormControl id="material">
        <FormLabel htmlFor="material">Material</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="material"
          value={newItem.material}
        />
      </FormControl>

      <FormControl id="num_serie">
        <FormLabel htmlFor="num_serie">Numero de serie / Lote</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="num_serie"
          value={newItem.num_serie}
        />
      </FormControl>

      <Button type="submit">Actualizar</Button>
    </form>
  );
}
