import React from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      id
    }
  }
`;

const UPDATE_PLANO_MECANICO = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updatePlano(input: { where: { id: $idObra }, data: { mecanicos: $ids } }) {
      plano {
        mecanicos {
          id
        }
      }
    }
  }
`;

const UPDATE_PLANO_CIVIL = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updatePlano(input: { where: { id: $idObra }, data: { civiles: $ids } }) {
      plano {
        civiles {
          id
        }
      }
    }
  }
`;

const UPDATE_PLANO_PIPING = gql`
  mutation ModifyCertificados($idObra: ID!, $ids: [ID]!) {
    updatePlano(input: { where: { id: $idObra }, data: { piping: $ids } }) {
      plano {
        piping {
          id
        }
      }
    }
  }
`;

export default function UploadPlanos({ plano, refetch }) {
  const { id } = useParams();
  const { mecanicos, piping, civiles } = plano;
  const [name, setName] = React.useState("");
  const [planoType, setPlanoType] = React.useState("piping");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [uploadFile, { loading, error }] = useMutation(UPLOAD_FILE);
  const [updatePlanosCivil] = useMutation(UPDATE_PLANO_CIVIL);
  const [updatePlanosMecanico] = useMutation(UPDATE_PLANO_MECANICO);
  const [updatePlanosPiping] = useMutation(UPDATE_PLANO_PIPING);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleOption = (e) => {
    console.log(e.target.value);
    setPlanoType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { upload },
    } = await uploadFile({
      variables: {
        file: selectedFile,
      },
    });

    let currIds;
    let updatedIds;
    switch (planoType) {
      case "mecanico":
        currIds = mecanicos.map((cert) => cert.id);
        updatedIds = [...currIds, upload.id];
        await updatePlanosMecanico({
          variables: { ids: updatedIds, idObra: id },
        });
        break;

      case "civil":
        currIds = civiles.map((cert) => cert.id);
        updatedIds = [...currIds, upload.id];
        console.log(updatedIds)
        await updatePlanosCivil({
          variables: { ids: updatedIds, idObra: id },
        });
        break;

      case "piping":
        currIds = piping.map((cert) => cert.id);
        updatedIds = [...currIds, upload.id];
        await updatePlanosPiping({
          variables: { ids: updatedIds, idObra: id },
        });
        break;
      default:
        break;
    }

    refetch();
  };

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
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
                  htmlFor="company_website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del archivo
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="nombre"
                    id="company_website"
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
                  htmlFor="company_website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de Plano
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select onChange={handleOption}>
                    <option value="piping">Piping</option>
                    <option value="civil">Civil</option>
                    <option value="mecanico">Mecanico</option>
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
                        required
                        // className="sr-only"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="pl-1">o arrastre y suelte</p>
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
