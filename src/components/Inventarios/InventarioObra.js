import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

function searchField(item, fields, term) {
  for (let field of fields) {
    if (item[field].search(term) >= 0) {
      return true;
    }
  }
  return false;
}

function TableRow({
  diametro_pulg,
  cantidad,
  num_serie,
  material,
  tipo_perfil,
  descripcion,
  obra,
}) {
  return (
    <Tr>
      {descripcion && <Td>{descripcion}</Td>}
      <Td>{diametro_pulg || tipo_perfil}</Td>
      <Td>{cantidad}</Td>
      <Td>{material || "-"}</Td>
      <Td>{num_serie || "-"}</Td>
      {obra && <Td>{obra.nombre}</Td>}
    </Tr>
  );
}

function PipingTable({ materiales }) {
  return (
    <Table colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Diametro [pulg]</Th>
          <Th>Cantidad [metros]</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </Tbody>
    </Table>
  );
}

function PipingTables({ inventarios, text }) {
  const SEARCH_FIELDS = ["material", "num_serie"];

  return (
    <Table colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Diametro [pulg]</Th>
          <Th>Cantidad [metros]</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
          <Th>Obra</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inventarios.map(({ piping, obra }) =>
          piping
            .filter((item) => searchField(item, SEARCH_FIELDS, text))
            .map((foundedItem, idx) => (
              <TableRow key={idx} {...foundedItem} obra={obra} />
            ))
        )}
      </Tbody>
    </Table>
  );
}

function WeldingTable({ materiales }) {
  return (
    <Table colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Descripcion</Th>
          <Th>Diametro [pulg]</Th>
          <Th>Unidades</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </Tbody>
    </Table>
  );
}

function EstructTable({ materiales }) {
  return (
    <Table colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Tipo de perfil</Th>
          <Th>Cantidad [metros]</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </Tbody>
    </Table>
  );
}

function EstructTables({ inventarios, text }) {
  const SEARCH_FIELDS = ["material", "tipo_perfil"];

  return (
    <Table colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Tipo de perfil</Th>
          <Th>Cantidad [metros]</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
          <Th>Obra</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inventarios.map(({ estructural, obra }) =>
          estructural
            .filter((item) => searchField(item, SEARCH_FIELDS, text))
            .map((foundedItem, idx) => (
              <TableRow key={idx} {...foundedItem} obra={obra} />
            ))
        )}
      </Tbody>
    </Table>
  );
}

export default function InventarioObra({ piping, estructural, welding }) {
  console.log(piping);
  return (
    <Tabs variant="enclosed-colored" my={4}>
      <TabList>
        <Tab>Piping</Tab>
        <Tab>Welding</Tab>
        <Tab>Estructural</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PipingTable materiales={piping} />
        </TabPanel>
        <TabPanel>
          <WeldingTable materiales={welding} />
        </TabPanel>
        <TabPanel>
          <EstructTable materiales={estructural} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export { PipingTables, EstructTables };
