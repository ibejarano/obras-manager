import React from "react";
import { useMutation } from "@apollo/client";

import UploadForm from "../common/UploadForm";
import {
  UPDATE_PLANO_CIVIL,
  UPDATE_PLANO_MECANICO,
  UPDATE_PLANO_PIPING,
} from "../../adapters/mutations";

export default function UploadPlanos({ plano, refetch }) {
  const { mecanicos, piping, civiles } = plano;
  const [updatePlanosCivil] = useMutation(UPDATE_PLANO_CIVIL);
  const [updatePlanosMecanico] = useMutation(UPDATE_PLANO_MECANICO);
  const [updatePlanosPiping] = useMutation(UPDATE_PLANO_PIPING);

  return (
    <UploadForm
      valTypes={["mecanicos", "piping", "civiles"]}
      prevValues={[mecanicos, piping, civiles]}
      mutations={[updatePlanosMecanico, updatePlanosPiping, updatePlanosCivil]}
      refetch={refetch}
    />
  );
}
