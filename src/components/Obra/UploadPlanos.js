import React from "react";

import UploadForm from "../common/UploadForm";
import { UPLOAD_PLANO } from "../../adapters/mutations";

export default function UploadPlanos({ refetch, tipos }) {
  return (
    <UploadForm
      valTypes={tipos}
      refetch={refetch}
      MUTATION_GQL={UPLOAD_PLANO}
    />
  );
}
