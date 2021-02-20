import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import InventarioObra from "../Inventarios/InventarioObra";
import UpdateInventario from "../Inventarios/UpdateInventario";

const GET_INVENTARIO_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      inventario {
        id
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
  const [openAddInv, setOpenAddInv] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {
    obra: { inventario },
  } = data;

  return (
    <React.Fragment>
      <InventarioObra {...inventario} />
      <button onClick={() => setOpenAddInv(true)}>Agregar material</button>
      {openAddInv && (
        <UpdateInventario
          setOpen={setOpenAddInv}
          idInventario={inventario.id}
        />
      )}
    </React.Fragment>
  );
}
