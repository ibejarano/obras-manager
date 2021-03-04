import { gql } from "@apollo/client";

const CREATE_PIPING_ENTRY = gql`
  mutation(
    $diametro_pulg: String!
    $material: String!
    $num_serie: String!
    $cantidad: String!
    $id: ID!
  ) {
    createMaterial(
      input: {
        data: {
          num_serie: $num_serie
          diametro_pulg: $diametro_pulg
          cantidad: $cantidad
          material: $material
          inventario: $id
          tipo: piping
        }
      }
    ) {
      material {
        num_serie
      }
    }
  }
`;

const CREATE_WELDING_ENTRY = gql`
  mutation(
    $descripcion: String!
    $diametro_pulg: String!
    $material: String!
    $num_serie: String!
    $cantidad: String!
    $id: ID!
  ) {
    createMaterial(
      input: {
        data: {
          num_serie: $num_serie
          diametro_pulg: $diametro_pulg
          cantidad: $cantidad
          material: $material
          inventario: $id
          descripcion: $descripcion
          tipo: welding
        }
      }
    ) {
      material {
        num_serie
      }
    }
  }
`;

const CREATE_ESTRUCTURAL_ENTRY = gql`
  mutation(
    $material: String!
    $num_serie: String!
    $cantidad: String!
    $tipo_perfil: ENUM_MATERIAL_TIPO_PERFIL!
    $id: ID!
  ) {
    createMaterial(
      input: {
        data: {
          tipo_perfil: $tipo_perfil
          num_serie: $num_serie
          cantidad: $cantidad
          material: $material
          inventario: $id
          tipo: estructural
        }
      }
    ) {
      material {
        num_serie
      }
    }
  }
`;

// CALIDAD MUTATIONS

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

// PLANOS MUTATIONS

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

export {
  CREATE_ESTRUCTURAL_ENTRY,
  CREATE_PIPING_ENTRY,
  CREATE_WELDING_ENTRY,
  UPDATE_CALIDAD_CERTIFICADOS,
  UPDATE_CALIDAD_PROCEDIMIENTOS,
  UPDATE_CALIDAD_PLANILLAS,
  UPDATE_PLANO_CIVIL,
  UPDATE_PLANO_MECANICO,
  UPDATE_PLANO_PIPING,
};
