import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Heading,
  HStack,
  Input,
  Flex,
  Box,
  Text,
  Wrap,
} from "@chakra-ui/react";

import { GET_PERSONAS } from "../adapters/queries";

function PersonCard({ nombre, apellido, cargo, obra }) {
  return (
    <Flex>
      <Box ml="3" borderWidth={2} p={4}>
        <Text fontWeight="bold">
          {nombre} {apellido}
        </Text>
        <Text fontSize="sm">{cargo}</Text>
        <Text fontWeight="bold" fontSize="sm">
          {obra ? `Obra: ${obra.nombre}` : "Sin obra"}
        </Text>
      </Box>
    </Flex>
  );
}

export default function ObrasTable() {
  const { loading, error, data } = useQuery(GET_PERSONAS);
  const [searchText, setSearchText] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { people } = data;

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <HStack>
        <Heading fontSize="lg">Buscar</Heading>
        <Input
          placeholder="Ingrese nombre y/o apellido"
          value={searchText}
          onChange={handleChange}
        />
      </HStack>
      {searchText.length > 0 && (
        <Wrap my={4}>
          {people
            .filter((person) => person.nombre.search(searchText) >= 0)
            .map((person) => (
              <PersonCard key={person.id} {...person} />
            ))}
        </Wrap>
      )}
    </>
  );
}
