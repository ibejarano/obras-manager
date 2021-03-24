import React from "react";
import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import UpdatePhotos from "./UpdatePhotos";
import { Box, Heading, Wrap, useDisclosure, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DrawerPane from "../../common/DrawerPane";

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
    <Box borderWidth={2} p={4} my={4} width="40%">
      <Link to={url}>
        <Heading fontSize="lg">{title || "Sin nombre"}</Heading>
      </Link>
    </Box>
  );
}

export default function Gallery() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { loading, error, data, refetch } = useQuery(GET_IMAGES_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {
    obra: { imagenes },
  } = data;

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon />}
        mx={4}
      >
        Subir fotos |
      </Button>
      <Wrap my={4}>
        {imagenes.map((img) => (
          <ImageInfo key={img.id} title={img.descripcion} idGallery={img.id} />
        ))}
      </Wrap>
      <DrawerPane
        headerText="Subir Fotos"
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
      >
        <UpdatePhotos refetch={refetch} />
      </DrawerPane>
    </>
  );
}
