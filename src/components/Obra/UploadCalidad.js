import React from "react";
import { gql, useMutation } from "@apollo/client";

import UploadForm from "../common/UploadForm";

const UPDATE_CALIDAD_CERTIFICADOS = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updateCalidad(
      input: { where: { id: $idObra }, data: { certificados: $ids } }
    ) {
      calidad {
        certificados {
          id
        }
      }
    }
  }
`;

const UPDATE_CALIDAD_PROCEDIMIENTOS = gql`
  mutation ModifyProcedimiento($idObra: ID!, $ids: [ID]!) {
    updateCalidad(
      input: { where: { id: $idObra }, data: { procedimientos: $ids } }
    ) {
      calidad {
        procedimientos {
          id
        }
      }
    }
  }
`;

const UPDATE_CALIDAD_PLANILLAS = gql`
  mutation ModifyPlanillas($idObra: ID!, $ids: [ID]!) {
    updateCalidad(
      input: { where: { id: $idObra }, data: { planillas: $ids } }
    ) {
      calidad {
        planillas {
          id
        }
      }
    }
  }
`;

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
