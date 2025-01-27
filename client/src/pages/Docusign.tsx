// DocuSignPage.tsx (Frontend)
import { useEffect } from "react";
import { useRouter } from "next/router";

const DocuSignPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Call your backend to generate the DocuSign URL and redirect
    const createDocuSignEnvelope = async () => {
      const response = await fetch("/api/create-docusign-envelope", {
        method: "POST",
        body: JSON.stringify({ documentChoice: "Document1" }),
      });
      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    };

    createDocuSignEnvelope();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p>Redirecting to DocuSign...</p>
    </div>
  );
};

export default DocuSignPage;
