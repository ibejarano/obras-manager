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

const CREATE_MATERIAL_ENTRY = gql`
  mutation(
    $mat_type: ENUM_MATERIAL_TIPO!
    $diametro_pulg: String
    $num_serie: String
    $cantidad: String
    $tipo_perfil: ENUM_MATERIAL_TIPO_PERFIL
    $material: String
    $descripcion: String
    $obra: ID!
  ) {
    createMaterial(
      input: {
        data: {
          tipo: $mat_type
          diametro_pulg: $diametro_pulg
          num_serie: $num_serie
          cantidad: $cantidad
          tipo_perfil: $tipo_perfil
          material: $material
          descripcion: $descripcion
          obra: $obra
        }
      }
    ) {
      material {
        id
      }
    }
  }
`;

// PLANOS MUTATIONS
const UPLOAD_PLANO = gql`
  mutation NuevoPlano(
    $nombre: String!
    $codigo: String!
    $revision: String!
    $tipo: ENUM_PLANO_TIPO
    $file: [ID!]
    $obraID: ID!
  ) {
    createPlano(
      input: {
        data: {
          nombre: $nombre
          codigo: $codigo
          tipo: $tipo
          archivo_aprobado: $file
          revision: $revision
          obra: $obraID
        }
      }
    ) {
      plano {
        nombre
      }
    }
  }
`;

const UPLOAD_CALIDAD = gql`
  mutation NuevoCalidad(
    $nombre: String!
    $codigo: String!
    $revision: String!
    $tipo: ENUM_CALIDAD_TIPO
    $file: [ID!]
    $obraID: ID!
  ) {
    createCalidad(
      input: {
        data: {
          nombre: $nombre
          codigo: $codigo
          tipo: $tipo
          archivo: $file
          revision: $revision
          obra: $obraID
        }
      }
    ) {
      calidad {
        nombre
      }
    }
  }
`;

export {
  CREATE_ESTRUCTURAL_ENTRY,
  CREATE_PIPING_ENTRY,
  CREATE_WELDING_ENTRY,
  CREATE_MATERIAL_ENTRY,
  UPLOAD_PLANO,
  UPLOAD_CALIDAD,
};
