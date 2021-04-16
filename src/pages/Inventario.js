import React from "react";
import { useQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";

import { GET_INVENTARIOS_ALL } from "../adapters/queries";
import { InventarioTable } from "../components/Tables";

export default function Inventarios() {
  const { loading, error, data } = useQuery(GET_INVENTARIOS_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { materials } = data;

  return (
    <main>
      <Heading fontSize="lg">Inventario</Heading>
      <InventarioTable materials={materials} />
    </main>
  );
}
