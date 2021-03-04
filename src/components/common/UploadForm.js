import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const UPLOAD_FILE = gql`
  mutation($file: Upload!, $text: String!) {
    upload(file: $file, info: { caption: $text }) {
      id
    }
  }
`;

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
  const [fileInfo, setFileInfo] = React.useState(null);
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
      setSelectedFile("");
      refetch();
    } catch {
      toast.error("ERROR: No se subieron los archivos");
    }
  };

  const handleFileUpload = (e) => {
    setFileInfo({
      name: e.target.files[0].name,
      size: e.target.files[0].size,
    });
    setSelectedFile(e.target.files[0]);
    e.target.value = null;
  };

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="nombre_archivo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del archivo
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre_archivo"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Ingrese nombre del archivo"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="tipo_archivo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del archivo
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select onChange={(e) => setFileType(e.target.value)}>
                    {valTypes.map((val) => (
                      <option value={val} key={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Archivo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {!fileInfo && (
                    <FontAwesomeIcon
                      size="3x"
                      icon={faFolderOpen}
                      transform="shrink-6 left-4"
                    />
                  )}
                  {fileInfo && (
                    <div>
                      <FontAwesomeIcon size="3x" icon={faFilePdf} />
                      <p className="text-sm text-gray-500">
                        {fileInfo.name} <br /> Tamaño:
                        {(fileInfo.size / 1024).toFixed(1)} kB
                      </p>
                    </div>
                  )}
                  <div className="flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-lg bg-indigo-600 p-2 font-medium text-white hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      Seleccione archivo
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      required
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <p className="text-xs text-gray-500">PDF maximo 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
