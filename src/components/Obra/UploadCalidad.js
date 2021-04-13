import React from "react";

import UploadForm from "../common/UploadForm";
import { UPLOAD_CALIDAD } from "../../adapters/mutations";

export default function UploadCalidad({ refetch, tipos }) {
  return (
    <UploadForm
      valTypes={tipos}
      refetch={refetch}
      MUTATION_GQL={UPLOAD_CALIDAD}
    />
  );
}
