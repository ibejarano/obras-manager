import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

import Calidad from "./Calidad";
import PeopleObra from "./People";
import Planos from "./Planos";
import InventarioObra from "../Inventarios/InventarioObra";

const GET_OBRAS_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      nombre
      cliente
      personas {
        nombre
        apellido
        cargo
      }
      plano {
        civiles {
          url
          name
        }
        mecanicos {
          url
          name
        }
        piping {
          url
          name
        }
      }
      calidad {
        certificados {
          url
          name
        }
      }
      inventario {
        material_piping {
          diametro_pulg
          cantidad_mts
          material
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

export default function Obra() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OBRAS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obra } = data;

  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Obra: {obra.nombre}</h1>
          <p className="text-xl pb-3 flex items-center">
            Cliente: {obra.cliente}
          </p>
          <div className="w-full mt-12">
            <div className="bg-white overflow-auto">
              <PeopleObra people={obra.personas} />
            </div>
          </div>
          <div className="w-full mt-12">
            <div className="bg-white overflow-auto">
              <Calidad {...obra.calidad} />
            </div>
          </div>
          <div className="w-full mt-12">
            <div className="bg-white overflow-auto">
              <Planos plano={obra.plano} />
            </div>
          </div>
          <div className="w-full mt-12">
            <div className="bg-white overflow-auto">
              <InventarioObra {...obra.inventario} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
