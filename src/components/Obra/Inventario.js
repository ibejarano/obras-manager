import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import InventarioObra from "../Inventarios/InventarioObra";
import UpdateInventario from "../Inventarios/UpdateInventario";
import { GET_INVENTARIO_WITH_ID } from "../../adapters/queries";

export default function Inventario() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_INVENTARIO_WITH_ID, {
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
      <button className="sticky top-14 p-2 rounded-lg w-40 text-white bg-purple-600" onClick={() => setOpenAddInv(true)}>Agregar material</button>
      <InventarioObra {...inventario} />
      {openAddInv && (
        <UpdateInventario
          setOpen={setOpenAddInv}
          idInventario={inventario.id}
          refetch={refetch}
        />
      )}
    </React.Fragment>
  );
}
