import React from "react";
import { gql, useMutation } from "@apollo/client";

import UploadForm from "../common/UploadForm";
import {
  UPDATE_CALIDAD_CERTIFICADOS,
  UPDATE_CALIDAD_PROCEDIMIENTOS,
  UPDATE_CALIDAD_PLANILLAS,
} from "../../adapters/mutations";

export default function UploadCalidad({
  certificados,
  procedimientos,
  planillas,
  refetch,
}) {
  const [updateCertificados] = useMutation(UPDATE_CALIDAD_CERTIFICADOS);
  const [updatePlanillas] = useMutation(UPDATE_CALIDAD_PLANILLAS);
  const [updateProcedimientos] = useMutation(UPDATE_CALIDAD_PROCEDIMIENTOS);

  return (
    <UploadForm
      valTypes={["planillas", "procedimientos", "certificados"]}
      prevValues={[planillas, procedimientos, certificados]}
      mutations={[updatePlanillas, updateProcedimientos, updateCertificados]}
      refetch={refetch}
    />
  );
}
