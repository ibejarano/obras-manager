import React from "react";
import { useQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";

import { GET_CALIDAD_ALL } from "../adapters/queries";
import { QaTable } from "../components/Tables";

export default function CalidadPage() {
  const { loading, error, data } = useQuery(GET_CALIDAD_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { calidads } = data;
  return (
    <main>
      <Heading fontSize="lg">Archivos Calidad</Heading>

      <QaTable calidads={calidads} />
    </main>
  );
}
