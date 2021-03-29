import React from "react";

import UploadForm from "../common/UploadForm";

export default function UploadPlanos({ refetch, tipos }) {
  return <UploadForm valTypes={tipos} refetch={refetch} />;
}
