import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";

import InventarioObra from "../Inventarios/InventarioObra";
import UpdateInventario from "../Inventarios/UpdateInventario";
import { GET_INVENTARIO_WITH_ID } from "../../adapters/queries";
import DrawerPane from "../common/DrawerPane";

import { AddIcon } from "@chakra-ui/icons";

export default function Inventario() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loading, error, data, refetch } = useQuery(GET_INVENTARIO_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {
    obra: { materials },
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
      <InventarioObra inventario={materials} />

      <DrawerPane
        headerText="Agregar material"
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
      >
        <UpdateInventario obraId={id} refetch={refetch} />
      </DrawerPane>
    </React.Fragment>
  );
}
