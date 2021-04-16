import React from "react";
import { useQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";

import { GET_PLANOS_ALL } from "../adapters/queries";
import { PlanosTable } from "../components/Tables";

export default function PlanosPage() {
  const { loading, error, data } = useQuery(GET_PLANOS_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { planos } = data;
  return (
    <main>
      <Heading fontSize="lg">Archivos Planos</Heading>

      <PlanosTable planos={planos} />
    </main>
  );
}
