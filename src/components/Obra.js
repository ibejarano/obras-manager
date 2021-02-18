import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

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

function TableRow({ name, url, tipo }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{name}</td>
      <td className="w-1/3 text-left py-3 px-4">{tipo}</td>
      <td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>
          GET
        </a>
      </td>
    </tr>
  );
}

function PeopleObra({ people }) {
  const RowPersona = ({ nombre, apellido, cargo }) => (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{nombre}</td>
      <td className="w-1/3 text-left py-3 px-4">{apellido}</td>
      <td className="text-left py-3 px-4">{cargo}</td>
    </tr>
  );

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Apellido
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Cargo
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {people.map((person) => (
          <RowPersona {...person} key={person.id} />
        ))}
      </tbody>
    </table>
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
            Tipo de plano
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descargar
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {civiles.map((plano) => (
          <TableRow {...plano} key={plano.name} tipo="Estructural" />
        ))}
        {mecanicos.map((plano) => (
          <TableRow {...plano} key={plano.name} tipo="Mecanico" />
        ))}
        {piping.map((plano) => (
          <TableRow {...plano} key={plano.name} tipo="Piping" />
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
              <PeopleObra people={obra.personas} />
            </div>
          </div>
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
