import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import UploadCalidad from "./UploadCalidad";
import { GET_CALIDAD_WITH_ID } from "../../adapters/queries";

function TableRow({ name, url, caption, created_at }) {
  const created = new Date(created_at)
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{name}</td>
      <td className="w-1/3 text-left py-3 px-4">
        {caption || "Sin Descripcion"}
      </td>
      <td className="w-1/3 text-left py-3 px-4">{created.toLocaleDateString("es-AR")}</td>
      <td className="w-1/3 text-left py-3 px-4">
        <a target="_blank" href={"http://localhost:1337" + url}>
          GET
        </a>
      </td>
    </tr>
  );
}

function Tabla({ data }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Nombre
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descripcion
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Fecha de carga
          </th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
            Descargar
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {data.map((row) => (
          <TableRow {...row} key={row.url} />
        ))}
      </tbody>
    </table>
  );
}

function Modal({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <button
        onClick={() => setOpen(true)}
        className="modal-open bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
      >
        Agregar archivos
      </button>

      {open && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Agregar nuevos archivos</p>
                <button onClick={() => setOpen(false)} className="z-50">
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </button>
              </div>

              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Calidad() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_CALIDAD_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    obra: { calidad },
  } = data;

  const { certificados, procedimientos, planillas } = calidad;

  return (
    <React.Fragment>
      <Tabla data={certificados} />
      <Tabla data={procedimientos} />
      <Tabla data={planillas} />
      <Modal>
        <UploadCalidad {...calidad} refetch={refetch} />
      </Modal>
    </React.Fragment>
  );
}
