import React from "react";
import { useQuery } from "@apollo/client";
import {
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  Heading,
} from "@chakra-ui/react";

import { GET_CALIDAD_ALL } from "../adapters/queries";
import RenderTable from "../components/common/Table";

export default function CalidadPage() {
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

  const { loading, error, data } = useQuery(GET_CALIDAD_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { calidads } = data;
  return (
    <main>
      <Heading fontSize="lg">Archivos Calidad</Heading>

      <Tabs variant="enclosed-colored" my={4}>
        <TabList>
          <Tab>Planillas</Tab>
          <Tab>Certificados</Tab>
          <Tab>Procedimientos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RenderTable
              materiales={calidads.filter((mat) => mat.tipo == "planilla")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={calidads.filter((mat) => mat.tipo == "certificado")}
              headers={headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={calidads.filter((mat) => mat.tipo == "procedimiento")}
              headers={headers}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  );
}
