import React from "react";
import { gql, useMutation } from "@apollo/client";

import UploadForm from "../common/UploadForm";

const UPDATE_PLANO_MECANICO = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updatePlano(input: { where: { id: $idObra }, data: { mecanicos: $ids } }) {
      plano {
        mecanicos {
          id
        }
      }
    }
  }
`;

const UPDATE_PLANO_CIVIL = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updatePlano(input: { where: { id: $idObra }, data: { civiles: $ids } }) {
      plano {
        civiles {
          id
        }
      }
    }
  }
`;

const UPDATE_PLANO_PIPING = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updatePlano(input: { where: { id: $idObra }, data: { piping: $ids } }) {
      plano {
        piping {
          id
        }
      }
    }
  }
`;

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
