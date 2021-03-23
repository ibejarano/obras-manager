import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Obra from "../components/Obra";
import { Heading, Select } from "@chakra-ui/react";
import { GET_OBRAS } from "../adapters/queries";

export default function ObrasTable() {
  const { loading, error, data } = useQuery(GET_OBRAS);
  const [obraId, setObraId] = React.useState("");
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obras } = data;

  const handleSelect = (e) => {
    setObraId(e.target.value);
    history.push(`/${e.target.value}`);
  };

  return (
    <>
      <Heading fontSize="lg">Obra:</Heading>
      <Select onChange={handleSelect} placeholder="Seleccione una obra">
        {obras.map((obra) => (
          <option value={obra.id}>{obra.nombre}</option>
        ))}
      </Select>
      {obraId && <Obra id={obraId} />}
    </>
  );
}
