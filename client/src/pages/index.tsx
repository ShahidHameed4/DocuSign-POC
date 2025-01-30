// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// interface UserDetails {
//   name: string;
//   address: string;
//   email: string;
//   selectedDocument: string;
// }

// const pageTransition = {
//   initial: { opacity: 0, x: -20 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: 20 },
// };

// const LoadingSpinner = () => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4">
//       <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//       <p className="text-gray-700 font-medium">Processing your request...</p>
//     </div>
//   </div>
// );

// const Home: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<UserDetails>({
//     name: "",
//     address: "",
//     email: "",
//     selectedDocument: "",
//   });
//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
//   const [showIframe, setShowIframe] = useState(true);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [envelopeId, setEnvelopeId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const handleDocumentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, selectedDocument: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.selectedDocument) {
//       alert("Please select a document to proceed.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/docusign/create-signing-url",
//         {
//           name: formData.name,
//           address: formData.address,
//           email: formData.email,
//           documentType: formData.selectedDocument,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const { signingUrl, envelopeId, clientUserId, name, email } =
//         response.data;

//       localStorage.setItem(
//         "docusignData",
//         JSON.stringify({ signingUrl, envelopeId, clientUserId, name, email })
//       );

//       setRedirectUrl(signingUrl);
//       setEnvelopeId(envelopeId); // Store envelopeId for downloading the document later
//       setShowModal(true); // Show the modal with the iframe
//       setStep(3);
//     } catch (error) {
//       console.error("Error sending contract:", error);
//       alert("Failed to send contract for signing. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const iframeRef = React.useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     const handleIframeNavigation = () => {
//       try {
//         if (iframeRef.current) {
//           const iframeWindow = iframeRef.current.contentWindow;

//           if (iframeWindow && iframeWindow.location.href) {
//             const currentUrl = iframeWindow.location.href;

//             if (currentUrl.includes("event=signing_complete")) {
//               setShowIframe(false);
//               setStatusMessage("Signing completed successfully!");
//             } else if (currentUrl.includes("event=")) {
//               setShowIframe(false);
//               setStatusMessage("Signing failed. Please try again.");
//             }
//           }
//         }
//       } catch (e) {
//         console.log("iframe navigation occurred to external domain");
//       }
//     };

//     const intervalId = setInterval(handleIframeNavigation, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleDownloadDocument = async () => {
//     if (!envelopeId) {
//       alert("No envelope ID found. Please try again.");
//       return;
//     }

//     setIsDownloading(true);

//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/docusign/download-signed-document/${envelopeId}`,
//         {
//           responseType: "blob", // Ensure the response is treated as a binary file
//         }
//       );

//       // Create a URL for the downloaded file
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "signed-document.pdf"); // Set the file name
//       document.body.appendChild(link);
//       link.click();

//       // Clean up
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading document:", error);
//       alert("Failed to download the signed document. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const renderDocumentSelection = () => (
//     <motion.div
//       {...pageTransition}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4"
//     >
//       <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-xl">
//         <div className="space-y-6">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Select Document
//             </h2>
//             <p className="mt-2 text-gray-600">
//               Choose the document type you need to sign
//             </p>
//           </div>

//           <select
//             name="selectedDocument"
//             value={formData.selectedDocument}
//             onChange={handleDocumentSelect}
//             className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50 transition duration-200 ease-in-out"
//           >
//             <option value="">Select a Document Type</option>
//             <option value="nda">Non-Disclosure Agreement</option>
//             <option value="contract">Service Contract</option>
//             <option value="lease">Lease Agreement</option>
//           </select>

//           <button
//             onClick={() => setStep(2)}
//             disabled={!formData.selectedDocument}
//             className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg shadow-lg hover:shadow-xl"
//           >
//             Continue to Details
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );

//   const renderDetailsForm = () => (
//     <motion.div
//       {...pageTransition}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4"
//     >
//       <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold text-gray-900">Your Details</h2>
//               <p className="mt-2 text-gray-600">
//                 Please fill in your information
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                   className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={(e) =>
//                     setFormData({ ...formData, address: e.target.value })
//                   }
//                   required
//                   className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
//                   placeholder="123 Main St, City, Country"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                   className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
//                   placeholder="your@email.com"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="w-1/3 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition duration-200 ease-in-out font-medium"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="w-2/3 py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out font-medium shadow-lg hover:shadow-xl"
//               >
//                 Continue to Sign
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </motion.div>
//   );

//   const renderSignaturePad = () => (
//     <>
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-0"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="bg-white rounded-2xl shadow-2xl w-[80vw] h-[80vh] max-h-[900px] flex flex-col"
//             >
//               <div className="p-4 border-gray-200 flex justify-between items-center">
//                 {!showIframe && (
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-gray-500 hover:text-gray-700 transition-colors"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               <div className="flex-1 p-0 relative overflow-hidden">
//                 {showIframe && redirectUrl && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full h-full"
//                   >
//                     <iframe
//                       ref={iframeRef}
//                       src={redirectUrl}
//                       className="w-full h-full rounded-lg"
//                       title="DocuSign Document"
//                       style={{ border: "none" }}
//                     />
//                   </motion.div>
//                 )}

//                 {!showIframe && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="flex flex-col items-center justify-center h-full space-y-8"
//                   >
//                     <div className="text-center">
//                       <div
//                         className={`text-2xl font-semibold mb-2 ${
//                           statusMessage.includes("success")
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {statusMessage}
//                       </div>
//                       <p className="text-gray-600">
//                         {statusMessage.includes("success")
//                           ? "Your document has been signed successfully"
//                           : "Please try again or contact support if the issue persists"}
//                       </p>
//                     </div>

//                     <div className="w-full max-w-md space-y-4">
//                       {statusMessage.includes("success") && (
//                         <button
//                           onClick={handleDownloadDocument}
//                           disabled={isDownloading}
//                           className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700
//                                  transition duration-200 ease-in-out font-medium shadow-lg
//                                  hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
//                                  flex items-center justify-center gap-2"
//                         >
//                           {isDownloading ? (
//                             <>
//                               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                               <span>Downloading Document...</span>
//                             </>
//                           ) : (
//                             <>
//                               <svg
//                                 className="w-5 h-5"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                                 />
//                               </svg>
//                               <span>Download Signed Document</span>
//                             </>
//                           )}
//                         </button>
//                       )}

//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl
//                                hover:bg-gray-200 transition duration-200 ease-in-out
//                                font-medium flex items-center justify-center gap-2"
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                         <span>Close Window</span>
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4"
//       >
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
//           <div className="text-center space-y-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Document Signing Process
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 {showModal
//                   ? "Complete the signing process in the modal window above"
//                   : "Click below to open the document signing window"}
//               </p>
//             </motion.div>

//             {!showModal && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="w-full max-w-md py-4 bg-blue-600 text-white rounded-xl
//                          hover:bg-blue-700 transition duration-200 ease-in-out
//                          font-medium shadow-lg hover:shadow-xl flex items-center
//                          justify-center gap-2 mx-auto"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   <span>Open Signing Window</span>
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );

//   return (
//     <>
//       {isLoading && <LoadingSpinner />}
//       <AnimatePresence mode="wait">
//         {step === 1 && renderDocumentSelection()}
//         {step === 2 && renderDetailsForm()}
//         {step === 3 && renderSignaturePad()}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Home;

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
