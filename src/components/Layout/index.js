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
          name="Dan Abrahmov"
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
      templateRows="100px 1fr"
      templateColumns="240px 1fr"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg="tomato">
        <SideBar />
      </GridItem>
      <GridItem colSpan={1} bg="papayawhip">
        <UserIcon />
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        {children}
      </GridItem>
    </Grid>
  );
}
