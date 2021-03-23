import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Text,
  Flex,
  Wrap,
  WrapItem,
  Badge,
} from "@chakra-ui/react";
import { useParams, Link, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Calidad from "./Calidad";
import PeopleObra from "./People";
import Planos from "./Planos";
import Inventario from "./Inventario";
import Gallery from "./Gallery";
import ShowGallery from "./Gallery/ShowGallery";

import { GET_OBRAS_WITH_ID } from "../../adapters/queries";

function PageInfo({ title, url, description }) {
  return (
    <Box
      minW="md"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="teal"
      overflow="hidden"
    >
      <Link to={url}>
        <Heading fontSize="xl" my={2}>
          {title}
        </Heading>
        <Text fontSize="md">{description}</Text>
      </Link>
    </Box>
  );
}

export default function Obra({ id }) {
  const { loading, error, data } = useQuery(GET_OBRAS_WITH_ID, {
    variables: {
      idObra: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { obra } = data;
  return (
    <>
      <Badge color="teal" p={3} borderRadius={24} m={4}>
        Cliente | {obra.cliente}
      </Badge>
      <Badge color="teal" p={3} borderRadius={24} m={4}>
        Ubicacion | {obra.ubicacion}
      </Badge>
      <Badge color="teal" p={3} borderRadius={24} m={4}>
        Fecha de inicio | {obra.inicio}
      </Badge>
      <Switch>
        <Route path="/:id/galeria/:idGaleria" children={<ShowGallery />} />
        <Route path="/:id/galeria" children={<Gallery />} />
        <Route path="/:id/personal" children={<PeopleObra />} />
        <Route path="/:id/inventario" children={<Inventario />} />
        <Route path="/:id/calidad" children={<Calidad />} />
        <Route path="/:id/planos" children={<Planos />} />
        <Route path="/:id">
          <Wrap spacing="30px">
            <PageInfo
              title="Personal"
              description="Personal activo en obra e impresion de partes diarios"
              url={`${id}/personal`}
            />
            <PageInfo
              title="Inventario"
              description="Materiales disponibles en obra"
              url={`${id}/inventario`}
            />
            <PageInfo
              title="Planos"
              description="Planos mecanicos, piping y estructurales. PDF y DWG."
              url={`${id}/planos`}
            />
            <PageInfo
              title="Calidad"
              description="Certificados de instrumentos, planillas y procedimientos"
              url={`${id}/calidad`}
            />
            <PageInfo
              title="Galeria de fotos"
              description="Fotos de fases de la obra"
              url={`${id}/galeria`}
            />
          </Wrap>
        </Route>
      </Switch>
      <ToastContainer />
    </>
  );
}
