import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./sidebar";

export default function Layout({ children }) {
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
        <SideBar />
      </GridItem>
      <GridItem colSpan={1} bg="white" borderRadius={10} p={8}>
        {children}
      </GridItem>
    </Grid>
  );
}
