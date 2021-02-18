import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

const GET_OBRAS_WITH_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      nombre
      cliente
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

function TableRow({ name, url }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{name}</td>
      <td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>GET</a>
      </td>
    </tr>
  );
}

function Planos({ plano }) {
  const { civiles, mecanicos, piping } = plano;
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre del plano
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descargar
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {civiles.map((plano) => (
          <TableRow {...plano} key={plano.name} />
        ))}
        {mecanicos.map((plano) => (
          <TableRow {...plano} key={plano.name} />
        ))}
        {piping.map((plano) => (
          <TableRow {...plano} key={plano.name} />
        ))}
      </tbody>
    </table>
  );
}

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
              <Planos plano={obra.plano} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
