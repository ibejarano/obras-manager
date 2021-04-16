import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useDisclosure, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import UploadPlanos from "./UploadPlanos";
import DrawerPane from "../common/DrawerPane";
import { PlanosTable } from "../Tables";
import { GET_PLANOS_WITH_ID } from "../../adapters/queries";

export default function Planos() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loading, error, data, refetch } = useQuery(GET_PLANOS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { planos },
  } = data;

  const tipos = ["piping", "civil", "mecanico", "otro"];

  return (
    <React.Fragment>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon />}
        mx={4}
      >
        Agregar archivos |
      </Button>
      <PlanosTable planos={planos} />
      <DrawerPane
        headerText="Subir Planos"
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
      >
        <UploadPlanos refetch={refetch} tipos={tipos} />
      </DrawerPane>
    </React.Fragment>
  );
}
