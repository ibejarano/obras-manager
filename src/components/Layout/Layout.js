import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  Divider,
  Heading,
  Flex,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { sections } from "./sidebar";

function SectionLink({ name, slug }) {
  return <Link to={slug}>{name}</Link>;
}

function UserAvatar({ name, email }) {
  return (
    <Flex>
      <Avatar size="sm" name="Ignacio Bejarano" loading="lazy" />
      <Box ml="3">
        <Text fontWeight="bold" fontSize="sm">
          {name}
        </Text>
        <Text fontStyle="italic" fontSize="xs">
          {email}
        </Text>
      </Box>
    </Flex>
  );
}

export default function Layout({ children, token, setToken }) {
  const [user, setUser] = useState({});

  const logout = () => {
    window.localStorage.removeItem("obras-token");
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      // get user and set user
      setUser({ name: "Ignacio Bejarano", email: "test@test.hardcode" });
    }
  }, [token]);

  return (
    <Grid
      h="100vh"
      w="100vw"
      templateRows="1fr"
      templateColumns="200px 1fr"
      gap={4}
      p={6}
      bg="cyan.900"
    >
      <GridItem rowSpan={1} colSpan={1}>
        <VStack align="flex-start" spacing={6}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              rightIcon={<ChevronDownIcon />}
              p="4px"
            >
              <UserAvatar {...user} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Salir</MenuItem>
            </MenuList>
          </Menu>

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
        </VStack>
      </GridItem>
      <GridItem colSpan={1} bg="white" borderRadius={10} p={8}>
        {children}
      </GridItem>
    </Grid>
  );
}
