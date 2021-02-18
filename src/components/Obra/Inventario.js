import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import InventarioObra from "../Inventarios/InventarioObra";

const GET_INVENTARIO_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      inventario {
        material_piping {
          diametro_pulg
          cantidad_mts
          material
          num_serie
        }
        material_estructural {
          cantidad_mts
          material
          tipo_perfil
        }
        material_welding {
          diametro_pulg
          unidades
          num_serie
        }
      }
    }
  }
`;

export default function Inventario() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_INVENTARIO_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { inventario },
  } = data;

  console.log(inventario);
  return <InventarioObra {...inventario} />;
}
