import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  mutation($file: Upload!, $text: String!) {
    upload(file: $file, info: { caption: $text }) {
      id
    }
  }
`;

function RenderFilesAdded({ files }) {
  console.log(files);
  if (files.length > 0) {
    const renderArr = [];
    for (let f of files) {
      renderArr.push(
        <Box borderBottomWidth={3} borderColor="teal.200"  >
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

export default function UploadCalidad({
  valTypes,
  prevValues,
  mutations,
  refetch,
}) {
  const { id } = useParams();
  const [name, setName] = React.useState("");
  const [fileType, setFileType] = React.useState(valTypes[0]);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [uploadFile, { loading, error }] = useMutation(UPLOAD_FILE);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { upload },
      } = await uploadFile({
        variables: {
          file: selectedFile,
          text: name,
        },
      });

      const ind = valTypes.indexOf(fileType);
      const currIds = prevValues[ind].map((p) => p.id);
      const updateIds = [...currIds, upload.id];
      const updateRegistry = mutations[ind];
      await updateRegistry({
        variables: { ids: updateIds, idObra: id },
      });
      toast.success("Archivos subidos satisfactoriamente.");
      setName("");
      setSelectedFile([]);
      refetch();
    } catch {
      toast.error("ERROR: No se subieron los archivos");
    }
  };

  const handleFileUpload = (e) => {
    setFiles(e.target.files);
    setSelectedFile(e.target.files);
    // e.target.value = null;
  };

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="nombre_archivo" my={4}>
        <FormLabel>Nombre del archivo</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          name="nombre"
          id="nombre_archivo"
          value={name}
          required
        />
      </FormControl>

      <FormControl id="tipo_archivo" my={4}>
        <FormLabel>Tipo de archivo</FormLabel>
        <Select
          placeholder="Seleccione uno"
          name="tipo_archivo"
          onChange={(e) => setFileType(e.target.value)}
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
        <Text fontSize="sm" color="blackAlpha.600" >Tamaño maximo de cada archivo: 10MB</Text>
      </FormControl>

      <Button type="submit">Guardar</Button>
    </form>
  );
}
