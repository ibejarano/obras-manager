import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
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
  Link,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { sections } from "./sidebar";
import { ME } from "../../adapters/queries";

function UserAvatar({ username, email }) {
  return (
    <Flex>
      <Avatar size="sm" name="Ignacio Bejarano" loading="lazy" />
      <Box ml="3">
        <Text fontWeight="bold" fontSize="sm">
          {username}
        </Text>
        <Text fontStyle="italic" fontSize="xs">
          {email}
        </Text>
      </Box>
    </Flex>
  );
}

export default function Layout({ children, setToken }) {
  const { loading, error, data } = useQuery(ME);

  const logout = () => {
    window.localStorage.removeItem("obras-token");
    setToken(null);
  };

  if (error) return <p>Error :(</p>;

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
        <Skeleton isLoaded={!loading}>
          <VStack align="flex-start" spacing={4}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="teal"
                rightIcon={<ChevronDownIcon />}
                p="8px"
              >
                {!loading && <UserAvatar {...data.me} />}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Salir</MenuItem>
              </MenuList>
            </Menu>

            {sections.map((section) => (
              <Link
                as={RouterLink}
                to={section.slug}
                color="white"
                fontWeight="semibold"
              >
                {section.icon} {section.name}
              </Link>
            ))}
            <Divider />
          </VStack>
        </Skeleton>
      </GridItem>
      <GridItem colSpan={1} bg="white" borderRadius={10} p={8}>
        {children}
      </GridItem>
    </Grid>
  );
}
