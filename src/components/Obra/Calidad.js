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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { AddIcon, DownloadIcon } from "@chakra-ui/icons";

function TableRow({ name, url, caption, created_at }) {
  const created = new Date(created_at);
  return (
    <Tr className="bg-gray-200">
      <Td className="w-1/3 text-left py-3 px-4">{name}</Td>
      <Td className="w-1/3 text-left py-3 px-4">
        {caption || "Sin Descripcion"}
      </Td>
      <Td className="w-1/3 text-left py-3 px-4">
        {created.toLocaleDateString("es-AR")}
      </Td>
      <Td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>
          <DownloadIcon />
        </a>
      </Td>
    </Tr>
  );
}

function Tabla({ data }) {
  return (
    <Table className="min-w-full bg-white">
      <Thead className="bg-gray-800 text-white">
        <Tr>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre
          </Th>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descripcion
          </Th>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Fecha de carga
          </Th>
          <Th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descargar
          </Th>
        </Tr>
      </Thead>
      <Tbody className="text-gray-700">
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
  if (error) return <p>Error :(</p>;

  const {
    obra: { calidad },
  } = data;

  const { certificados, procedimientos, planillas } = calidad;

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
          <Tab>Certificados</Tab>
          <Tab>Procedimientos</Tab>
          <Tab>Planillas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Tabla data={certificados} />
          </TabPanel>
          <TabPanel>
            <Tabla data={procedimientos} />
          </TabPanel>
          <TabPanel>
            <Tabla data={planillas} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Subir nuevos archivos</DrawerHeader>

            <DrawerBody>
              <UploadCalidad {...calidad} refetch={refetch} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button color="blue">Guardar</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  );
}
