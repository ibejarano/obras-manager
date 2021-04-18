import React from "react";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

import RenderTable from "../common/Table";

const DownloadFilesIcons = ({ values }) => {
  return (
    <React.Fragment>
      {values.map((url) => (
        <a href={url} download>
          <DownloadIcon />
        </a>
      ))}
    </React.Fragment>
  );
};

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
    {
      Header: "Archivo",
      accessor: (row) => row.archivo_aprobado.map((a) => a.url),
      Cell: ({ cell: { value } }) => <DownloadFilesIcons values={value} />,
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
