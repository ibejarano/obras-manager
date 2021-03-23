import React from "react";
import {
  Grid,
  GridItem,
  Avatar,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import SideBar from "./sidebar";

function UserIcon() {
  return (
    <Menu>
      <MenuButton>
        <Avatar
          size="xl"
          name="Ignacio Bejarano"
          src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"
          loading="lazy"
        />
      </MenuButton>
      <MenuList>
        <MenuItem>Cuenta</MenuItem>
        <MenuItem>Soporte</MenuItem>
        <MenuItem>Salir</MenuItem>
      </MenuList>
    </Menu>
  );
}

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
      <GridItem colSpan={1} bg="white" borderRadius={10} >
        {children}
      </GridItem>
    </Grid>
  );
}
