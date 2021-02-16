import React from "react";

// Query para obtener los datos de este componente
// const query = query {
//   peopleWithObra : people (where: {obra_null: false}) {
//     id
//     nombre
//     apellido
//   }
//   allPeople: people {
//     id
//     nombre
//     obra {
//          id
//      }
//   }
// }

const data = {
  peopleWithObra: [
    {
      id: "1",
      nombre: "pintor1",
      apellido: "pintor1",
      cargo: "pintura",
      obra: {
        nombre: "Planta Rosario",
      },
    },
    {
      id: "5",
      nombre: "soldador1",
      apellido: "soldador1",
      cargo: "soldador",
      obra: {
        nombre: "Planta Rosario",
      },
    },
    {
      id: "8",
      nombre: "calidad1",
      apellido: "calidad1",
      cargo: "calidad",
      obra: {
        nombre: "Planta Rosario",
      },
    },
    {
      id: "10",
      nombre: "seghigiene1",
      apellido: "seghigiene1",
      cargo: "shyma",
      obra: {
        nombre: "Planta Rosario",
      },
    },
    {
      id: "13",
      nombre: "jefeobraB",
      apellido: "jefeobraB",
      cargo: "jefe_obra",
      obra: {
        nombre: "Planta Rosario",
      },
    },
    {
      id: "14",
      nombre: "ayudanteA",
      apellido: "ayudanteA",
      cargo: "ayudante",
      obra: {
        nombre: "Planta Rosario",
      },
    },
    {
      id: "17",
      nombre: "transportista1",
      apellido: "transportista1",
      cargo: "transportista",
      obra: {
        nombre: "Planta Rosario",
      },
    },
  ],
  allPeople: [
    {
      id: "1",
      nombre: "pintor1",
      apellido: "pintor1",
      obra: {
        id: "1",
      },
    },
    {
      id: "2",
      nombre: "pintor2",
      apellido: "pintor2",
      obra: null,
    },
    {
      id: "3",
      nombre: "pintor3",
      apellido: "pintor3",
      obra: null,
    },
    {
      id: "4",
      nombre: "pintor4",
      apellido: "pintor4",
      obra: null,
    },
    {
      id: "5",
      nombre: "soldador1",
      apellido: "soldador1",
      obra: {
        id: "1",
      },
    },
    {
      id: "6",
      nombre: "soldador2",
      apellido: "soldador2",
      obra: null,
    },
    {
      id: "7",
      nombre: "soldador3",
      apellido: "soldador3",
      obra: null,
    },
    {
      id: "8",
      nombre: "calidad1",
      apellido: "calidad1",
      obra: {
        id: "1",
      },
    },
    {
      id: "9",
      nombre: "calidad2",
      apellido: "calidad2",
      obra: null,
    },
    {
      id: "10",
      nombre: "seghigiene1",
      apellido: "seghigiene1",
      obra: {
        id: "1",
      },
    },
    {
      id: "11",
      nombre: "seghigiene2",
      apellido: "seghigiene2",
      obra: null,
    },
    {
      id: "12",
      nombre: "jefeobraA",
      apellido: "jefeobraA",
      obra: null,
    },
    {
      id: "13",
      nombre: "jefeobraB",
      apellido: "jefeobraB",
      obra: {
        id: "1",
      },
    },
    {
      id: "14",
      nombre: "ayudanteA",
      apellido: "ayudanteA",
      obra: {
        id: "1",
      },
    },
    {
      id: "15",
      nombre: "ayudanteB",
      apellido: "ayudanteB",
      obra: null,
    },
    {
      id: "16",
      nombre: "ayudanteC",
      apellido: "ayudanteC",
      obra: null,
    },
    {
      id: "17",
      nombre: "transportista1",
      apellido: "transportista1",
      obra: {
        id: "1",
      },
    },
  ],
};

function TableRow({ nombre, apellido, cargo, obra }) {
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{nombre}</td>
      <td className="w-1/3 text-left py-3 px-4">{apellido}</td>
      {cargo && <td className="text-left py-3 px-4">{cargo}</td>}
      {obra && <td className="text-left py-3 px-4">{obra.nombre}</td>}
    </tr>
  );
}

function PeopleObra({ people }) {
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
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Obra
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {people.map((person) => (
          <TableRow {...person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
}

function PeopleWithoutObra({ people }) {
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
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {people.map((person) => (
          <TableRow {...person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
}

export default function ObrasTable({ extData = null }) {
  const { peopleWithObra, allPeople } = data;
  const peopleWithoutObra = allPeople.filter((person) => !person.obra);
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Personal</h1>
          <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> En Obra
            </p>
            <div className="bg-white overflow-auto">
              <PeopleObra people={peopleWithObra} />
            </div>
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> Sin Obra asignada
            </p>
            <div className="bg-white overflow-auto">
              <PeopleWithoutObra people={peopleWithoutObra} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
