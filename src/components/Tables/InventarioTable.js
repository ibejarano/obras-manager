import React from "react";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";

import RenderTable from "../common/Table";
import {
  piping_headers,
  estructural_headers,
  welding_headers,
} from "../Inventarios/headers";

export default function InventariosTable({ materials }) {
  return (
    <Tabs variant="enclosed-colored" my={4}>
      <TabList>
        <Tab>Piping</Tab>
        <Tab>Estructural | Perfiles</Tab>
        <Tab>Welding</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RenderTable
            materiales={materials.filter((mat) => mat.tipo === "piping")}
            headers={piping_headers}
          />
        </TabPanel>
        <TabPanel>
          <RenderTable
            materiales={materials.filter((mat) => mat.tipo === "estructural")}
            headers={estructural_headers}
          />
        </TabPanel>

        <TabPanel>
          <RenderTable
            materiales={materials.filter((mat) => mat.tipo === "welding")}
            headers={welding_headers}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
