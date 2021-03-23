import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { GET_OBRAS } from "../adapters/queries";

function TableRow({ id, nombre, ubicacion, cliente, inicio, fin }) {
  return (
    <Tr>
      <Td>
        <Link to={"/" + id}>{nombre}</Link>
      </Td>
      <Td>{cliente}</Td>
      <Td>{ubicacion}</Td>
      <Td>{inicio}</Td>
      <Td>{fin}</Td>
    </Tr>
  );
}

export default function ObrasTable() {
  const { loading, error, data } = useQuery(GET_OBRAS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obras } = data;

  return (
    <Table variant="striped" colorScheme="twitter">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Cliente</Th>
          <Th>Ubicacion</Th>
          <Th>Inicio</Th>
          <Th>Fin</Th>
        </Tr>
      </Thead>
      <Tbody>
        {obras.map((obra) => (
          <TableRow {...obra} key={obra.nombre} />
        ))}
      </Tbody>
    </Table>
  );
}
