import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { Heading, Image, Flex } from "@chakra-ui/react";

const GET_IMAGES_FILES = gql`
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

  const { loading, error, data } = useQuery(GET_IMAGES_FILES, {
    variables: {
      id: idGaleria,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { imagene } = data;

  return (
    <>
      <Heading my={4}>{imagene.descripcion}</Heading>
      <Flex gridGap={4}>
        {imagene.archivos.map(({ url }) => (
          <Image
            key={url}
            boxSize="200px"
            objectFit="cover"
            src={`http://localhost:1337${url}`}
          />
        ))}
      </Flex>
    </>
  );
}
