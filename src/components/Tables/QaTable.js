import React from "react";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";
import RenderTable from "../common/Table";

export default function CalidadPage({ calidads }) {
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
          <Tab>Planillas</Tab>
          <Tab>Certificados</Tab>
          <Tab>Procedimientos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RenderTable
              materiales={calidads.filter((mat) => mat.tipo === "planilla")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={calidads.filter((mat) => mat.tipo === "certificado")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={calidads.filter(
                (mat) => mat.tipo === "procedimiento"
              )}
              headers={headers}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
}
