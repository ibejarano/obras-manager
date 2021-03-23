import React from "react";
import { Link } from "react-router-dom";

import {
  Text,
  VStack,
  HStack,
  Divider,
  Heading,
  Flex,
  Avatar,
  Box,
  Badge,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CalendarIcon,
  CopyIcon,
  ChatIcon,
} from "@chakra-ui/icons";

const sections = [
  { name: "Dashboard", slug: "/", icon: <HamburgerIcon color="white" /> },
  {
    name: "Personal Obra",
    slug: "/personal",
    icon: <CalendarIcon color="white" />,
  },
  {
    name: "Inventario",
    slug: "/inventarios",
    icon: <CopyIcon color="white" />,
  },
  {
    name: "Mensajes",
    slug: "/mensajes",
    icon: <ChatIcon color="white" />,
  },
];

function SectionLink({ name, slug }) {
  return <Link to={slug}>{name}</Link>;
}

function UserAvatar() {
  return (
    <Flex color="white">
      <Avatar
        name="Ignacio Bejarano"
        loading="lazy"
        // src="https://bit.ly/sage-adebayo"
      />
      <Box ml="3">
        <Text fontWeight="bold">Ignacio Sebastian Bejarano</Text>
        <Text fontSize="sm">Administrador</Text>
      </Box>
    </Flex>
  );
}

export default function SideBar() {
  return (
    <VStack align="flex-start" spacing={6}>
      <UserAvatar />
      <Heading size="sm" color="white">
        Section A
      </Heading>
      {sections.map((section) => (
        <Flex>
          {section.icon}
          <Text fontSize="sm" color="white" mx={2}>
            <SectionLink key={section.name} {...section} />
          </Text>
        </Flex>
      ))}
      <Divider />
      <Heading size="sm" color="white">
        Section B
      </Heading>
      {sections.map((section) => (
        <Flex>
          {section.icon}
          <Text fontSize="sm" color="white" mx={2}>
            <SectionLink key={section.name} {...section} />
          </Text>
        </Flex>
      ))}
    </VStack>
  );
}
