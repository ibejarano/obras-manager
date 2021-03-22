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

function TableObra({ obras }) {
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

export default function ObrasTable() {
  const { loading, error, data } = useQuery(GET_OBRAS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obras } = data;
  return (
    <div>
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Obras</h1>
          <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> Activas
            </p>
            <div className="bg-white overflow-auto">
              <TableObra obras={obras} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
