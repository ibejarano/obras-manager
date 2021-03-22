import React from "react";
import { Link } from "react-router-dom";

import { Flex, Spacer, Text, Center, Box } from "@chakra-ui/react";

const sections = [
  { name: "Dashboard", slug: "/" },
  { name: "Personal Obra", slug: "/personal" },
  { name: "Inventario", slug: "/inventarios" },
  { name: "Mensajes", slug: "/mensajes" },
];

function SectionLink({ name, slug }) {
  return <Link to={slug}>{name}</Link>;
}

export default function SideBar() {
  return (
    <Flex direction="column" height="100%">
      <Center m="4">
        <Text fontSize="3xl" color="white">
          Username
        </Text>
      </Center>
      {sections.map((section) => (
        <Center m="4">
          <Text fontSize="xl" color="white">
            <SectionLink key={section.name} {...section} />
          </Text>
        </Center>
      ))}
      <Spacer />
      <Center>
        <Text fontSize="3xl" color="white">Salir</Text>
      </Center>
    </Flex>
  );
}
