import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DocumentSelection } from "../components/DocumentSelection";
import { UserDetailsForm } from "../components/UserDetailsForm";
import { SignaturePad } from "../components/SignaturePad";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useDocuSign } from "../hooks/useDocuSign";
import { UserDetails } from "../types";

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserDetails>({
    name: "",
    address: "",
    email: "",
    selectedDocument: "",
  });

  const {
    isLoading,
    isDownloading,
    redirectUrl,
    createSigningUrl,
    downloadSignedDocument,
  } = useDocuSign();

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, selectedDocument: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSigningUrl(formData);
      setStep(3);
    } catch (error) {
      alert("Failed to send contract for signing. Please try again.");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <DocumentSelection
            formData={formData}
            onDocumentSelect={handleDocumentSelect}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <UserDetailsForm
            formData={formData}
            onSubmit={handleSubmit}
            onBack={() => setStep(1)}
            onInputChange={handleInputChange}
          />
        )}
        {step === 3 && redirectUrl && (
          <SignaturePad
            redirectUrl={redirectUrl}
            isDownloading={isDownloading}
            onDownload={downloadSignedDocument}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
