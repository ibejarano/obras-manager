import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import InventarioObra from "../Inventarios/InventarioObra";
import UpdateInventario from "../Inventarios/UpdateInventario";
import { GET_INVENTARIO_WITH_ID } from "../../adapters/queries";

import { AddIcon } from "@chakra-ui/icons";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function Inventario() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_INVENTARIO_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {
    obra: { inventario },
  } = data;

  return (
    <React.Fragment>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon />}
        mx={4}
      >
        Agregar items |
      </Button>
      <InventarioObra {...inventario} />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Actualizar inventario</DrawerHeader>

            <DrawerBody>
              <UpdateInventario
                idInventario={inventario.id}
                refetch={refetch}
              />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  );
}
