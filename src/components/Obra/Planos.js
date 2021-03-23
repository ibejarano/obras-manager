import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import UploadPlanos from "./UploadPlanos";
import Modal from "../common/Modal";
import { GET_PLANOS_WITH_ID } from "../../adapters/queries";

function TableRow({ name, url, tipo }) {
  return (
    <Tr className="bg-gray-200">
      <Td className="w-1/3 text-left py-3 px-4">{name}</Td>
      <Td className="w-1/3 text-left py-3 px-4">{tipo}</Td>
      <Td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>
          GET
        </a>
      </Td>
    </Tr>
  );
}

export default function Planos() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_PLANOS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { plano },
  } = data;

  const { civiles, mecanicos, piping } = plano;

  return (
    <React.Fragment>
      <Table className="min-w-full bg-white">
        <Thead className="bg-gray-800 text-white">
          <Tr>
            <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Nombre del plano
            </Th>
            <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Tipo de plano
            </Th>
            <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Descargar
            </Th>
          </Tr>
        </Thead>
        <Tbody className="text-gray-700">
          {civiles.map((plano) => (
            <TableRow {...plano} key={plano.id} tipo="Civil" />
          ))}
          {mecanicos.map((plano) => (
            <TableRow {...plano} key={plano.id} tipo="Mecanico" />
          ))}
          {piping.map((plano) => (
            <TableRow {...plano} key={plano.id} tipo="Piping" />
          ))}
        </Tbody>
      </Table>
      <Modal>
        <UploadPlanos plano={plano} refetch={refetch} />
      </Modal>
    </React.Fragment>
  );
}
