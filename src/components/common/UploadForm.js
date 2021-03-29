import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UPLOAD_PLANO } from "../../adapters/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Select,
  Box,
} from "@chakra-ui/react";

const UPLOAD_FILE = gql`
  mutation($file: [Upload]!) {
    multipleUpload(files: $file) {
      id
    }
  }
`;

function RenderFilesAdded({ files }) {
  if (files.length > 0) {
    const renderArr = [];
    for (let f of files) {
      renderArr.push(
        <Box borderBottomWidth={3} borderColor="teal.200">
          <Text>
            {f.name} <br /> Tamaño:
            {(f.size / 1024).toFixed(1)} kB
          </Text>
        </Box>
      );
    }
    return <>{renderArr}</>;
  } else {
    return (
      <Box bg="teal.100" p={2}>
        <Text>Agregar Archivos...</Text>
      </Box>
    );
  }
}

export default function UploadCalidad({ valTypes, refetch }) {
  const { id } = useParams();
  const [fileInfo, setFileInfo] = React.useState({});
  const [selectedFile, setSelectedFile] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [uploadFile, { loading, error }] = useMutation(UPLOAD_FILE);
  const [createPlano, { load, err }] = useMutation(UPLOAD_PLANO);

  const handleChange = (e) => {
    setFileInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { multipleUpload },
      } = await uploadFile({
        variables: {
          file: selectedFile,
        },
      }).catch(() => {
        toast.error("Error subiendo archivos");
      });
      toast.success("Archivos subidos satisfactoriamente");

      const res = await createPlano({
        variables: {
          ...fileInfo,
          obraID: id,
          file: multipleUpload.map((m) => m.id),
        },
      });
      toast.success("Lista de planos actualizada");
      setFileInfo({});
      setSelectedFile([]);
      refetch();
    } catch {
      toast.error("Ha ocurrido un error intente nuevamente.");
    }
  };

  const handleFileUpload = (e) => {
    setFiles(e.target.files);
    setSelectedFile(e.target.files);
  };

  if (error) return <div>{JSON.stringify(error)}</div>;

  const { nombre, codigo, revision, tipo } = fileInfo;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="nombre_archivo" my={4}>
        <FormLabel>Nombre del archivo</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="nombre"
          id="nombre_archivo"
          value={nombre}
          required
        />
      </FormControl>

      <FormControl id="codigo" my={4}>
        <FormLabel>Codigo</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="codigo"
          id="codigo"
          value={codigo}
          required
        />
      </FormControl>

      <FormControl id="revision" my={4}>
        <FormLabel>Revision</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="revision"
          id="codigo"
          value={revision}
          required
        />
      </FormControl>

      <FormControl id="tipo" my={4}>
        <FormLabel>Tipo de plano</FormLabel>
        <Select
          placeholder="Seleccione uno"
          name="tipo"
          onChange={handleChange}
          value={tipo}
          required
        >
          {valTypes.map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="file-upload" my={4}>
        <FormLabel htmlFor="file-upload">
          Archivo(s)
          <input
            id="file-upload"
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileUpload}
            required
            style={{ display: "none" }}
          />
          <Box borderColor="teal" borderWidth={2} borderRadius={8} p={2}>
            <RenderFilesAdded files={files} />
          </Box>
        </FormLabel>
        <Text fontSize="sm" color="blackAlpha.600">
          Tamaño maximo de cada archivo: 10MB
        </Text>
      </FormControl>

      <Button type="submit">Guardar</Button>
    </form>
  );
}
