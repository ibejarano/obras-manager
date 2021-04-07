import React from "react";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";

import {
  piping_headers,
  estructural_headers,
  welding_headers,
} from "./headers";
import RenderTable from "../common/Table";

export default function InventarioObra({ inventario }) {
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
