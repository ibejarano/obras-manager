import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_PERSONAS_WITH_ID } from "../../adapters/queries";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function PeopleObra() {
  const RowPersona = ({ nombre, apellido, cargo }) => (
    <Tr className="bg-gray-200">
      <Td>{nombre}</Td>
      <Td>{apellido}</Td>
      <Td>{cargo}</Td>
    </Tr>
  );

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSONAS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { personas },
  } = data;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Apellido</Th>
          <Th>Cargo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {personas.map((person) => (
          <RowPersona {...person} key={person.id} />
        ))}
      </Tbody>
    </Table>
  );
}
