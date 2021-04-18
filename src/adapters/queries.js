import { gql } from "@apollo/client";

const ME = gql`
  query {
    me {
      username
      email
    }
  }
`;

const GET_OBRAS = gql`
  query {
    obras {
      id
      nombre
      cliente
      ubicacion
      inicio
      fin
    }
  }
`;

const GET_OBRAS_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      nombre
      cliente
      ubicacion
      inicio
    }
  }
`;

const GET_INVENTARIOS = gql`
  query {
    inventarios {
      obra {
        nombre
      }
      piping: materials(where: { tipo: "piping" }) {
        diametro_pulg
        cantidad
        num_serie
        material
      }
      welding: materials(where: { tipo: "welding" }) {
        diametro_pulg
        cantidad
        num_serie
        material
        descripcion
      }
      estructural: materials(where: { tipo: "estructural" }) {
        tipo_perfil
        cantidad
        num_serie
        material
      }
    }
  }
`;

const GET_INVENTARIO_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      materials {
        diametro_pulg
        cantidad
        num_serie
        tipo
        material
        tipo_perfil
      }
    }
  }
`;

const GET_INVENTARIOS_ALL = gql`
  query {
    materials {
      diametro_pulg
      cantidad
      num_serie
      tipo
      material
      tipo_perfil
    }
  }
`;

const GET_PERSONAS = gql`
  query {
    people {
      id
      nombre
      apellido
      cargo
      obra {
        nombre
      }
    }
  }
`;

const GET_CALIDAD_ALL = gql`
  query {
    calidads {
      tipo
      id
      nombre
      revision
      codigo
      archivo {
        url
      }
    }
  }
`;

const GET_PLANOS_ALL = gql`
  query {
    planos {
      tipo
      id
      nombre
      revision
      codigo
      archivo_aprobado {
        url
      }
    }
  }
`;

const GET_PERSONAS_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      personas {
        nombre
        apellido
        cargo
      }
    }
  }
`;

const GET_PLANOS_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      planos {
        id
        codigo
        nombre
        tipo
        revision
        archivo_aprobado {
          url
        }
      }
    }
  }
`;

const GET_CALIDAD_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      calidads {
        id
        tipo
        revision
        codigo
        nombre
        archivo {
          url
        }
      }
    }
  }
`;

export {
  GET_INVENTARIOS,
  GET_OBRAS_WITH_ID,
  GET_PERSONAS_WITH_ID,
  GET_PERSONAS,
  GET_PLANOS_WITH_ID,
  GET_CALIDAD_WITH_ID,
  GET_OBRAS,
  GET_INVENTARIO_WITH_ID,
  GET_CALIDAD_ALL,
  GET_PLANOS_ALL,
  GET_INVENTARIOS_ALL,
  ME,
};
