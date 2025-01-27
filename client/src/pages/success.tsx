import React from "react";
import { useRouter } from "next/router";

const Success: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          Contract Signed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your contract has been successfully signed and submitted. Thank you!
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Success;
