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
} from "@chakra-ui/react";

import { sections } from "./sidebar";

function SectionLink({ name, slug }) {
  return <Link to={slug}>{name}</Link>;
}

function UserAvatar({ name, email }) {
  return (
    <Flex color="white">
      <Avatar name="Ignacio Bejarano" loading="lazy" />
      <Box ml="3">
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm">{email}</Text>
      </Box>
    </Flex>
  );
}

export default function Layout({ children, token }) {
  const [user, setUser] = useState({});
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
          <UserAvatar {...user} />
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
      </GridItem>
      <GridItem colSpan={1} bg="white" borderRadius={10} p={8}>
        {children}
      </GridItem>
    </Grid>
  );
}
