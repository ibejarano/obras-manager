import React from "react";

import { useTable } from "react-table";

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

function RenderTable({ materiales, headers }) {
  const data = React.useMemo(() => materiales, []);
  const columns = React.useMemo(() => headers, []);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Table colorScheme="teal" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
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
        {/* {inventarios.map(({ piping, obra }) =>
          piping
            .filter((item) => searchField(item, SEARCH_FIELDS, text))
            .map((foundedItem, idx) => (
              <TableRow key={idx} {...foundedItem} obra={obra} />
            ))
        )} */}
      </Tbody>
    </Table>
  );
}

export default function InventarioObra({ inventario }) {
  const piping_headers = [
    {
      Header: "Diametro",
      accessor: "diametro_pulg", // accessor is the "key" in the data
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    },
    {
      Header: "Serie",
      accessor: "num_serie",
    },
  ];
  const estructural_headers = [
    {
      Header: "Perfil",
      accessor: "tipo_perfil", // accessor is the "key" in the data
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    },
    {
      Header: "Serie",
      accessor: "num_serie",
    },
  ];
  const welding_headers = [
    {
      Header: "Diametro",
      accessor: "diametro_pulg", // accessor is the "key" in the data
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    },
    {
      Header: "Serie",
      accessor: "num_serie",
    },
  ];
  return (
    <Tabs variant="enclosed-colored" my={4}>
      <TabList>
        <Tab>Piping</Tab>
        <Tab>Estructural</Tab>
        <Tab>Welding</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RenderTable
            materiales={inventario.filter((mat) => mat.tipo == "piping")}
            headers={piping_headers}
          />
        </TabPanel>
        <TabPanel>
          <RenderTable
            materiales={inventario.filter((mat) => mat.tipo == "estructural")}
            headers={estructural_headers}
          />
        </TabPanel>
        <TabPanel>
          <RenderTable
            materiales={inventario.filter((mat) => mat.tipo == "welding")}
            headers={welding_headers}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export { PipingTables };
