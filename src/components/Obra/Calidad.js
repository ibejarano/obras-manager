import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import UploadCalidad from "./UploadCalidad";
import { GET_CALIDAD_WITH_ID } from "../../adapters/queries";
import DrawerPane from "../common/DrawerPane";
import { QaTable } from "../Tables";

export default function Calidad() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loading, error, data, refetch } = useQuery(GET_CALIDAD_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  const {
    obra: { calidads },
  } = data;

  const tipos = ["procedimiento", "planilla", "certificado"];

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

      <QaTable calidads={calidads} />

      <DrawerPane
        headerText="Subir Planos"
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
      >
        <UploadCalidad tipos={tipos} refetch={refetch} />
      </DrawerPane>
    </React.Fragment>
  );
}
