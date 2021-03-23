import React from "react";

import { Table, Thead, Tbody, Td, Tr, Th } from "@chakra-ui/react";

function TableRow({
  diametro_pulg,
  cantidad,
  num_serie,
  material,
  tipo_perfil,
  descripcion,
}) {
  return (
    <Tr>
      {descripcion && <Td>{descripcion}</Td>}
      <Td>{diametro_pulg || tipo_perfil}</Td>
      <Td>{cantidad}</Td>
      <Td>{material || "-"}</Td>
      <Td>{num_serie || "-"}</Td>
    </Tr>
  );
}

function PipingTable({ materiales }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Diametro [pulg]</Th>
          <Th>Cantidad [metros]</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </Tbody>
    </Table>
  );
}

function WeldingTable({ materiales }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Descripcion</Th>
          <Th>Diametro [pulg]</Th>
          <Th>Unidades</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </Tbody>
    </Table>
  );
}

function EstructTable({ materiales }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Tipo de perfil</Th>
          <Th>Cantidad [metros]</Th>
          <Th>Material</Th>
          <Th>Serie</Th>
        </Tr>
      </Thead>
      <Tbody>
        {materiales.map((material, idx) => (
          <TableRow key={idx} {...material} />
        ))}
      </Tbody>
    </Table>
  );
}

export default function InventarioObra({ obra, piping, estructural, welding }) {
  return (
    <div>
      {obra && <h1>{obra.nombre}</h1>}
      {piping.length > 0 && (
        <div>
          <p>
            <i></i>Piping
          </p>
          <div>
            <PipingTable materiales={piping} />
          </div>
        </div>
      )}

      {welding.length > 0 && (
        <div>
          <p>
            <i></i>Welding
          </p>
          <div>
            <WeldingTable materiales={welding} />
          </div>
        </div>
      )}
      {estructural.length > 0 && (
        <div>
          <p>
            <i></i>Perfiles Estructurales
          </p>
          <div>
            <EstructTable materiales={estructural} />
          </div>
        </div>
      )}
    </div>
  );
}
