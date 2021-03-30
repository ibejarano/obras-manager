import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import UploadCalidad from "./UploadCalidad";
import { GET_CALIDAD_WITH_ID } from "../../adapters/queries";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { AddIcon, DownloadIcon } from "@chakra-ui/icons";

import DrawerPane from "../common/DrawerPane";

function TableRow({ nombre, codigo, revision, archivo }) {
  return (
    <Tr>
      <Td>{nombre}</Td>
      <Td>{codigo}</Td>
      <Td>{revision || "-"}</Td>
      <Td>{archivo.length}</Td>
      <Td>
        {archivo.map(({ url }) => (
          <a target="_blank" href={"http://localhost:1337" + url}>
            <DownloadIcon />
          </a>
        ))}
      </Td>
    </Tr>
  );
}

function TablaQa({ data }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Titulo</Th>
          <Th>Codigo</Th>
          <Th>Revision</Th>
          <Th>Cant. de archivos</Th>
          <Th>Descargar</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row) => (
          <TableRow {...row} key={row.url} />
        ))}
      </Tbody>
    </Table>
  );
}

export default function Calidad() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loading, error, data, refetch } = useQuery(GET_CALIDAD_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  const {
    obra: { calidads },
  } = data;

  const tipos = ["procedimiento", "planilla", "certificado"];

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
          {tipos.map((t) => (
            <Tab>{t}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {tipos.map((tipo) => (
            <TabPanel>
              <TablaQa
                data={calidads.filter((calidad) => calidad.tipo == tipo)}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <DrawerPane
        headerText="Subir Planos"
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
      >
        <UploadCalidad tipos={tipos} refetch={refetch} />
      </DrawerPane>
    </React.Fragment>
  );
}
