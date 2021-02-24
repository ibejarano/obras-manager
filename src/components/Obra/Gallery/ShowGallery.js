import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_IMAGES_ID = gql`
  query($id: ID!) {
    imagene(id: $id) {
      descripcion
      archivos {
        url
      }
    }
  }
`;

export default function Gallery() {
  const { idGaleria } = useParams();

  const { loading, error, data } = useQuery(GET_IMAGES_ID, {
    variables: {
      id: idGaleria,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { imagene } = data;

  return (
    <div>
      <h1>{imagene.descripcion}</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {imagene.archivos.map(({ url }) => (
          <img className="w-1/4 object-contain m-2" key={url} src={`http://localhost:1337${url}`} />
        ))}
      </div>
    </div>
  );
}
