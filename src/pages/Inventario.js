import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";

// import {
//   PipingTables,
// } from "../components/Inventarios/InventarioObra";
import { GET_INVENTARIOS } from "../adapters/queries";

export default function Inventarios() {
  const { loading, error, data } = useQuery(GET_INVENTARIOS);
  const [category, setCategory] = useState("piping");
  const [searchText, setSearchText] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { inventarios } = data;
  return (
    <main>
      <h1>Inventario</h1>
      <Input
        placeholder="Type something to search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <RadioGroup onChange={setCategory} value={category}>
        <Stack direction="row">
          <Radio value="piping">Piping</Radio>
          <Radio value="estructural">Estructural</Radio>
        </Stack>
      </RadioGroup>
      {/* {category == "piping" && (
        <PipingTables inventarios={inventarios} text={searchText} />
      )} */}
      {/* {category == "estructural" && (
        <EstructTables inventarios={inventarios} text={searchText} />
      )} */}
    </main>
  );
}
