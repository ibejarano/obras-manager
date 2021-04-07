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

import RenderTable from "../components/common/Table";
import { GET_INVENTARIOS_ALL } from "../adapters/queries";
import {
  piping_headers,
  estructural_headers,
  welding_headers,
} from "../components/Inventarios/headers";

export default function Inventarios() {
  const { loading, error, data } = useQuery(GET_INVENTARIOS_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { materials } = data;

  return (
    <main>
      <Heading fontSize="lg">Inventario</Heading>

      <Tabs variant="enclosed-colored" my={4}>
        <TabList>
          <Tab>Piping</Tab>
          <Tab>Estructural | Perfiles</Tab>
          <Tab>Welding</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RenderTable
              materiales={materials.filter((mat) => mat.tipo == "piping")}
              headers={piping_headers}
            />
          </TabPanel>
          <TabPanel>
            <RenderTable
              materiales={materials.filter((mat) => mat.tipo == "estructural")}
              headers={estructural_headers}
            />
          </TabPanel>

          <TabPanel>
            <RenderTable
              materiales={materials.filter((mat) => mat.tipo == "welding")}
              headers={welding_headers}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  );
}
