import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import UploadCalidad from "./UploadCalidad";
import Modal from "../common/Modal";
import { GET_CALIDAD_WITH_ID } from "../../adapters/queries";

function TableRow({ name, url, caption, created_at }) {
  const created = new Date(created_at);
  return (
    <tr className="bg-gray-200">
      <td className="w-1/3 text-left py-3 px-4">{name}</td>
      <td className="w-1/3 text-left py-3 px-4">
        {caption || "Sin Descripcion"}
      </td>
      <td className="w-1/3 text-left py-3 px-4">
        {created.toLocaleDateString("es-AR")}
      </td>
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
