import React from "react";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";

import RenderTable from "../common/Table";

export default function PlanosTable({ planos }) {
  const headers = [
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Revision",
      accessor: "revision",
    },
    {
      Header: "Codigo",
      accessor: "codigo",
    },
  ];

  return (
    <React.Fragment>
      <Tabs variant="enclosed-colored" my={4}>
        <TabList>
          <Tab>Civil</Tab>
          <Tab>Piping</Tab>
          <Tab>Mecanico</Tab>
          <Tab>Otros</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RenderTable
              materiales={planos.filter((mat) => mat.tipo === "civil")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={planos.filter((mat) => mat.tipo === "piping")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={planos.filter((mat) => mat.tipo === "mecanico")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={planos.filter((mat) => mat.tipo === "otro")}
              headers={headers}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
}
