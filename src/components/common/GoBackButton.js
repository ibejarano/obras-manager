import React from "react";
import { useHistory } from "react-router-dom";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export default function GoBackButton() {
  const history = useHistory();
  return (
    <Button
      mx={4}
      onClick={() => history.goBack()}
      leftIcon={<ArrowBackIcon />}
    >
      Volver
    </Button>
  );
}
