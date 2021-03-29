import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import UploadPlanos from "./UploadPlanos";
import DrawerPane from "../common/DrawerPane";
import { GET_PLANOS_WITH_ID } from "../../adapters/queries";

function TablePlano({ data }) {
  return (
    <Table className="min-w-full bg-white">
      <Thead className="bg-gray-800 text-white">
        <Tr>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Titulo
          </Th>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Codigo
          </Th>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Revision
          </Th>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descargar
          </Th>
        </Tr>
      </Thead>
      <Tbody className="text-gray-700">
        {data.map(({ id, codigo, nombre, revision, url }) => (
          <Tr key={id}>
            <Td>{nombre}</Td>
            <Td>{codigo}</Td>
            <Td>{revision || "-"}</Td>
            <Td>
              <a target="_blank" href={"http://localhost:1337" + url}>
                <DownloadIcon />
              </a>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default function Planos() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loading, error, data, refetch } = useQuery(GET_PLANOS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { planos },
  } = data;

  // const { id, codigo, nombre , tipo} = planos;
  const tipos = ["piping", "estructural", "mecanicos"];

  return (
    <React.Fragment>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon />}
        mx={4}
      >
        Agregar archivos |
      </Button>
      <Tabs my={4}>
        <TabList>
          {/* {tipos.map} */}
          <Tab>Piping</Tab>
          {/* <Tab>Mecanico</Tab>
          <Tab>Civil</Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <TablePlano data={planos} tipo="Piping" />
          </TabPanel>
          {/* <TabPanel>
            <TablePlano data={civiles} tipo="Mecanico" />
          </TabPanel>
          <TabPanel>
            <TablePlano data={mecanicos} tipo="Piping" />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
      <DrawerPane
        headerText="Subir Planos"
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
      >
        {/* <UploadPlanos plano={plano} refetch={refetch} /> */}
      </DrawerPane>
    </React.Fragment>
  );
}
