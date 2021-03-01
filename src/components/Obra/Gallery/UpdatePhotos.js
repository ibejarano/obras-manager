import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const UPLOAD_PHOTOS = gql`
  mutation($file: [Upload]!) {
    multipleUpload(files: $file) {
      id
    }
  }
`;

const UPDATE_IMAGE_GALLERY = gql`
  mutation SetImagenes($obraId: ID!, $descripcion: String!, $archivos: [ID]!) {
    createImagene(
      input: {
        data: { obra: $obraId, descripcion: $descripcion, archivos: $archivos }
      }
    ) {
      imagene {
        id
        descripcion
      }
    }
  }
`;

export default function UploadCalidad({ refetch }) {
  const [name, setName] = React.useState("");
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = React.useState("");
  const [upload, { loading, error }] = useMutation(UPLOAD_PHOTOS);
  const [updateObra] = useMutation(UPDATE_IMAGE_GALLERY);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: multipleUpload } = await upload({
      variables: { file: selectedFiles },
    });

    console.log(multipleUpload);

    const imgIds = multipleUpload.multipleUpload.map((img) => img.id);

    await updateObra({
      variables: {
        obraId: id,
        descripcion: name,
        archivos: imgIds,
      },
    });
    await refetch();
  };

  const handleFileUpload = (e) => {
    setSelectedFiles(e.target.files);
  };

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <h1>Subir imagenes</h1>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="company_website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripcion
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="nombre"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Ingrese descripcion de las imagenes"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagenes
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Subir archivo</span>
                      <input
                        type="file"
                        multiple
                        // className="sr-only"
                        // accept="application/pdf"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="pl-1">o arrastre y suelte</p>
                  </div>
                  <p className="text-xs text-gray-500">Solo archivos JPG/PNG</p>
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
