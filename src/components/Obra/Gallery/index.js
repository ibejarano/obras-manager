import React from "react";
import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_IMAGES_ID = gql`
  query($idObra: ID!) {
    obra(id: $idObra) {
      imagenes {
        descripcion
        id
      }
    }
  }
`;

function ImageInfo({ title, idGallery }) {
  const url = `galeria/${idGallery}`;
  return (
    <Link to={url}>
      <div className="flex-initial bg-white shadow overflow-hidden sm:rounded-lg m-2">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function Gallery() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_IMAGES_ID, {
    variables: {
      idObra: id,
    },
  });

  // console.log(idObra);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {
    obra: { imagenes },
  } = data;

  return (
    <div>
      {imagenes.map((img) => (
        <ImageInfo key={img.id} title={img.descripcion} idGallery={img.id} />
      ))}
    </div>
  );
}
