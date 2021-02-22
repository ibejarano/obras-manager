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

export { CREATE_ESTRUCTURAL_ENTRY, CREATE_PIPING_ENTRY, CREATE_WELDING_ENTRY };
