import React from "react";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";

import RenderTable from "../common/Table";

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
