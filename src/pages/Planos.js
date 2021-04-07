import React from "react";
import { useQuery } from "@apollo/client";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";

import { GET_PLANOS_ALL } from "../adapters/queries";
import RenderTable from "../components/common/Table";

export default function PlanosPage() {
  const headers = [
    {
      Header: "Tipo",
      accessor: "tipo", // accessor is the "key" in the data
    },
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

  const { loading, error, data } = useQuery(GET_PLANOS_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { planos } = data;
  return (
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
            materiales={planos.filter((mat) => mat.tipo == "civil")}
            headers={headers}
          />
        </TabPanel>
        <TabPanel>
          <RenderTable
            materiales={planos.filter((mat) => mat.tipo == "piping")}
            headers={headers}
          />
        </TabPanel>
        <TabPanel>
          <RenderTable
            materiales={planos.filter((mat) => mat.tipo == "mecanico")}
            headers={headers}
          />
        </TabPanel>
        <TabPanel>
          <RenderTable
            materiales={planos.filter((mat) => mat.tipo == "otro")}
            headers={headers}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
