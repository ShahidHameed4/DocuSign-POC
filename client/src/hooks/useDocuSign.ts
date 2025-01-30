import { useState } from "react";
import axios from "axios";
import { UserDetails } from "../types";

export const useDocuSign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [envelopeId, setEnvelopeId] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const createSigningUrl = async (formData: UserDetails) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/docusign/create-signing-url",
        {
          name: formData.name,
          address: formData.address,
          email: formData.email,
          documentType: formData.selectedDocument,
        }
      );

      const { signingUrl, envelopeId } = response.data;

      setRedirectUrl(signingUrl);
      setEnvelopeId(envelopeId);

      return { signingUrl, envelopeId };
    } catch (error) {
      console.error("Error sending contract:", error);
      throw new Error("Failed to send contract for signing");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSignedDocument = async () => {
    if (!envelopeId) {
      throw new Error("No envelope ID found");
    }

    setIsDownloading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/docusign/download-signed-document/${envelopeId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "signed-document.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isLoading,
    isDownloading,
    redirectUrl,
    envelopeId,
    createSigningUrl,
    downloadSignedDocument,
  };
};
