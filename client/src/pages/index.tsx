// // import Image from "next/image";
// // import { Geist, Geist_Mono } from "next/font/google";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// // export default function Home() {
// //   return (
// //     <div
// //       className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
// //     >
// //       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
// //           <li className="mb-2">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
// //               src/pages/index.tsx
// //             </code>
// //             .
// //           </li>
// //           <li>Save and see your changes instantly.</li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import UserDetailsForm from "../components/UserDetailForm";

// interface UserDetails {
//   name: string;
//   address: string;
// }

// export default function Home() {
//   const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

//   const handleUserDetailsSubmit = (details: UserDetails) => {
//     setUserDetails(details);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       {!userDetails ? (
//         <UserDetailsForm onSubmit={handleUserDetailsSubmit} />
//       ) : (
//         <div className="p-6 bg-white rounded shadow-md text-gray-900">
//           <h2 className="text-xl font-bold text-gray-900">Details Submitted</h2>
//           <p>
//             Name: <strong>{userDetails.name}</strong>
//           </p>
//           <p>
//             Address: <strong>{userDetails.address}</strong>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";

// const Home: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     email: "",
//   });

//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/docusign/send-envelope",
//         formData
//       );
//       setRedirectUrl(response.data.redirectUrl);
//     } catch (error) {
//       console.error("Error sending contract:", error);
//       alert("Failed to send contract for signing. Please try again.");
//     }
//   };

//   if (redirectUrl) {
//     // Redirect the user to the DocuSign signing page
//     window.location.href = redirectUrl;
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Fill Your Details</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//           >
//             Submit & Sign
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import axios from "axios";

// const Home: React.FC = () => {
//   // State for managing each step in the flow
//   const [step, setStep] = useState(1); // 1 = NDA, 2 = Form, 3 = SignaturePad
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     email: "",
//     selectedDocument: "", // Document selection
//   });
//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle document selection
//   const handleDocumentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, selectedDocument: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.selectedDocument) {
//       alert("Please select a document to proceed.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/create-signing-url",
//         formData
//       );
//       setRedirectUrl(response.data.redirectUrl);
//       setStep(3); // Move to the SignaturePad step
//     } catch (error) {
//       console.error("Error sending contract:", error);
//       alert("Failed to send contract for signing. Please try again.");
//     }
//   };

//   // Step 1: NDA Document Selection
//   const renderNDA = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Select Document</h1>
//         <select
//           name="selectedDocument"
//           value={formData.selectedDocument}
//           onChange={handleDocumentSelect}
//           required
//           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">Select a Document</option>
//           <option value="nda">NDA</option>
//           <option value="contract">Contract</option>
//           <option value="agreement">Agreement</option>
//         </select>
//         <button
//           onClick={() => setStep(2)}
//           disabled={!formData.selectedDocument}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700 transition"
//         >
//           Next: Fill Your Details
//         </button>
//       </div>
//     </div>
//   );

//   // Step 2: Form for User Details
//   const renderForm = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Fill Your Details</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//           >
//             Submit & Sign
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   // Step 3: SignaturePad (Iframe)
//   const renderSignaturePad = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
//         {redirectUrl && (
//           <iframe
//             src={redirectUrl}
//             width="100%"
//             height="600px"
//             title="DocuSign Document"
//           />
//         )}
//         <div className="mt-4">
//           <button
//             onClick={() => alert("Sign functionality coming soon!")}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//           >
//             Sign Document
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Render different components based on the step
//   switch (step) {
//     case 1:
//       return renderNDA();
//     case 2:
//       return renderForm();
//     case 3:
//       return renderSignaturePad();
//     default:
//       return renderNDA();
//   }
// };

// // export default Home;
// import React, { useState } from "react";
// import axios from "axios";

// const Home: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     email: "",
//     selectedDocument: "",
//   });
//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDocumentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, selectedDocument: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.selectedDocument) {
//       alert("Please select a document to proceed.");
//       return;
//     }

//     try {
//       // Send data in the body (as JSON)
//       const response = await axios.post(
//         "http://localhost:3001/create-signing-url",
//         {
//           name: formData.name,
//           address: formData.address,
//           email: formData.email,
//           documentType: formData.selectedDocument,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json", // Ensure the body is sent as JSON
//           },
//         }
//       );

//       setRedirectUrl(response.data.signingUrl); // Assuming the backend sends 'signingUrl'
//       setStep(3); // Move to the SignaturePad step
//     } catch (error) {
//       console.error("Error sending contract:", error);
//       alert("Failed to send contract for signing. Please try again.");
//     }
//   };

//   const renderNDA = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Select Document</h1>
//         <select
//           name="selectedDocument"
//           value={formData.selectedDocument}
//           onChange={handleDocumentSelect}
//           required
//           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">Select a Document</option>
//           <option value="nda">NDA</option>
//           <option value="contract">Contract</option>
//           <option value="agreement">Agreement</option>
//         </select>
//         <button
//           onClick={() => setStep(2)}
//           disabled={!formData.selectedDocument}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700 transition"
//         >
//           Next: Fill Your Details
//         </button>
//       </div>
//     </div>
//   );

//   const renderForm = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Fill Your Details</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//           >
//             Submit & Sign
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   // const renderSignaturePad = () => (
//   //   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//   //     <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
//   //       <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
//   //       {redirectUrl && (
//   //         <iframe
//   //           src={redirectUrl}
//   //           width="100%"
//   //           height="600px"
//   //           title="DocuSign Document"
//   //           style={{ border: "none" }}
//   //         />
//   //       )}
//   //       <div className="mt-4">
//   //         <button
//   //           onClick={() => alert("Sign functionality coming soon!")}
//   //           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//   //         >
//   //           Sign Document
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   const renderSignaturePad = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
//         {redirectUrl && (
//           <iframe
//             src={redirectUrl}
//             width="100%"
//             height="auto" // Auto height to scale based on width
//             title="DocuSign Document"
//             className="responsive-iframe"
//           />
//         )}
//         <div className="mt-4">
//           <button
//             onClick={() => alert("Sign functionality coming soon!")}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//           >
//             Sign Document
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   switch (step) {
//     case 1:
//       return renderNDA();
//     case 2:
//       return renderForm();
//     case 3:
//       return renderSignaturePad();
//     default:
//       return renderNDA();
//   }
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface UserDetails {
//   name: string;
//   address: string;
//   email: string;
//   selectedDocument: string;
// }

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

//   const handleDocumentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, selectedDocument: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.selectedDocument) {
//       alert("Please select a document to proceed.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/create-signing-url",
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

//       setRedirectUrl(response.data.signingUrl);
//       setStep(3);
//     } catch (error) {
//       console.error("Error sending contract:", error);
//       alert("Failed to send contract for signing. Please try again.");
//     }
//   };

//   const iframeRef = React.useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     // Function to handle iframe navigation changes
//     const handleIframeNavigation = () => {
//       try {
//         if (iframeRef.current) {
//           const iframeWindow = iframeRef.current.contentWindow;

//           // Check if we can access the iframe location
//           if (iframeWindow && iframeWindow.location.href) {
//             const currentUrl = iframeWindow.location.href;

//             // Check if the URL contains your success or failure parameters
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
//         // If we get a security error, it means the iframe has navigated to a different domain
//         // This is expected when DocuSign loads
//         console.log("iframe navigation occurred to external domain");
//       }
//     };

//     // Set up an interval to check the iframe location
//     const intervalId = setInterval(handleIframeNavigation, 1000);

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const renderDocumentSelection = () => (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-semibold text-white mb-4">
//           Select Document
//         </h2>
//         <select
//           name="selectedDocument"
//           value={formData.selectedDocument}
//           onChange={handleDocumentSelect}
//           className="block w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
//         >
//           <option value="">Select a Document</option>
//           <option value="nda">NDA</option>
//           <option value="contract">Contract</option>
//           <option value="agreement">Agreement</option>
//         </select>
//         <button
//           onClick={() => setStep(2)}
//           disabled={!formData.selectedDocument}
//           className="w-full py-3 bg-pink-500 text-white rounded-xl mt-4 hover:bg-pink-600 transition duration-300"
//         >
//           Next: Fill Your Details
//         </button>
//       </div>
//     </div>
//   );

//   const renderDetailsForm = () => (
//     <form
//       onSubmit={handleSubmit}
//       className="min-h-screen flex items-center justify-center"
//     >
//       <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-semibold text-white mb-4 mx-8">
//           Enter Your Details
//         </h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-white">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//             className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-white">
//             Address
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//             required
//             className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-white">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             required
//             className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition duration-300"
//         >
//           Submit & Sign
//         </button>
//       </div>
//     </form>
//   );
//   //   // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//   //   //   <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-gray-800">
//   //   //     <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
//   //   //     {redirectUrl && (
//   //   //       <iframe
//   //   //         src={redirectUrl}
//   //   //         width="100%"
//   //   //         height="600px"
//   //   //         title="DocuSign Document"
//   //   //         style={{ border: "none" }}
//   //   //       />
//   //   //     )}
//   //   //     <button
//   //   //       className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//   //   //       onClick={handleSignature}
//   //   //     >
//   //   //       Complete Signing
//   //   //     </button>
//   //   //   </div>
//   //   // </div>
//   //   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//   //     <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-gray-800">
//   //       <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
//   //       {showIframe && redirectUrl && (
//   //         <iframe
//   //           src={redirectUrl}
//   //           width="100%"
//   //           height="600px"
//   //           title="DocuSign Document"
//   //           style={{ border: "none" }}
//   //           onLoad={handleIframeLoad}
//   //         />
//   //       )}
//   //       {!showIframe && (
//   //         <div className="mt-4 text-center">
//   //           <p
//   //             className={
//   //               statusMessage.includes("success")
//   //                 ? "text-green-600"
//   //                 : "text-red-600"
//   //             }
//   //           >
//   //             {statusMessage}
//   //           </p>
//   //         </div>
//   //       )}
//   //       <button
//   //         className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//   //         onClick={handleSignature}
//   //       >
//   //         Complete Signing
//   //       </button>
//   //     </div>
//   //   </div>
//   // );
//   const renderSignaturePad = () => (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
//         {showIframe && redirectUrl && (
//           <iframe
//             ref={iframeRef}
//             src={redirectUrl}
//             width="100%"
//             height="600px"
//             title="DocuSign Document"
//             style={{ border: "none" }}
//           />
//         )}
//         {!showIframe && (
//           <div className="mt-4 text-center">
//             <p
//               className={
//                 statusMessage.includes("success")
//                   ? "text-green-600"
//                   : "text-red-600"
//               }
//             >
//               {statusMessage}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   switch (step) {
//     case 1:
//       return renderDocumentSelection();
//     case 2:
//       return renderDetailsForm();
//     case 3:
//       return renderSignaturePad();
//     default:
//       return renderDocumentSelection();
//   }
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface UserDetails {
  name: string;
  address: string;
  email: string;
  selectedDocument: string;
}

const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-700 font-medium">Processing your request...</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserDetails>({
    name: "",
    address: "",
    email: "",
    selectedDocument: "",
  });
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [envelopeId, setEnvelopeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDocumentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, selectedDocument: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.selectedDocument) {
      alert("Please select a document to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/create-signing-url",
        {
          name: formData.name,
          address: formData.address,
          email: formData.email,
          documentType: formData.selectedDocument,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { signingUrl, envelopeId, clientUserId, name, email } =
        response.data;

      localStorage.setItem(
        "docusignData",
        JSON.stringify({ signingUrl, envelopeId, clientUserId, name, email })
      );

      setRedirectUrl(signingUrl);
      setEnvelopeId(envelopeId); // Store envelopeId for downloading the document later
      setShowModal(true); // Show the modal with the iframe
      setStep(3);
    } catch (error) {
      console.error("Error sending contract:", error);
      alert("Failed to send contract for signing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeNavigation = () => {
      try {
        if (iframeRef.current) {
          const iframeWindow = iframeRef.current.contentWindow;

          if (iframeWindow && iframeWindow.location.href) {
            const currentUrl = iframeWindow.location.href;

            if (currentUrl.includes("event=signing_complete")) {
              setShowIframe(false);
              setStatusMessage("Signing completed successfully!");
            } else if (currentUrl.includes("event=")) {
              setShowIframe(false);
              setStatusMessage("Signing failed. Please try again.");
            }
          }
        }
      } catch (e) {
        console.log("iframe navigation occurred to external domain");
      }
    };

    const intervalId = setInterval(handleIframeNavigation, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDownloadDocument = async () => {
    if (!envelopeId) {
      alert("No envelope ID found. Please try again.");
      return;
    }

    setIsDownloading(true);

    try {
      const response = await axios.get(
        `http://localhost:3001/download-signed-document/${envelopeId}`,
        {
          responseType: "blob", // Ensure the response is treated as a binary file
        }
      );

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "signed-document.pdf"); // Set the file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download the signed document. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderDocumentSelection = () => (
    <motion.div
      {...pageTransition}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4"
    >
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Select Document
            </h2>
            <p className="mt-2 text-gray-600">
              Choose the document type you need to sign
            </p>
          </div>

          <select
            name="selectedDocument"
            value={formData.selectedDocument}
            onChange={handleDocumentSelect}
            className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50 transition duration-200 ease-in-out"
          >
            <option value="">Select a Document Type</option>
            <option value="nda">Non-Disclosure Agreement</option>
            <option value="contract">Service Contract</option>
            <option value="agreement">General Agreement</option>
          </select>

          <button
            onClick={() => setStep(2)}
            disabled={!formData.selectedDocument}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg shadow-lg hover:shadow-xl"
          >
            Continue to Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderDetailsForm = () => (
    <motion.div
      {...pageTransition}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4"
    >
      <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Your Details</h2>
              <p className="mt-2 text-gray-600">
                Please fill in your information
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                  className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
                  placeholder="123 Main St, City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition duration-200 ease-in-out font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out font-medium shadow-lg hover:shadow-xl"
              >
                Continue to Sign
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );

  const renderSignaturePad = () => (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-0"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-[80vw] h-[80vh] max-h-[900px] flex flex-col"
            >
              <div className="p-4 border-gray-200 flex justify-between items-center">
                {!showIframe && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex-1 p-0 relative overflow-hidden">
                {showIframe && redirectUrl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full"
                  >
                    <iframe
                      ref={iframeRef}
                      src={redirectUrl}
                      className="w-full h-full rounded-lg"
                      title="DocuSign Document"
                      style={{ border: "none" }}
                    />
                  </motion.div>
                )}

                {!showIframe && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full space-y-8"
                  >
                    <div className="text-center">
                      <div
                        className={`text-2xl font-semibold mb-2 ${
                          statusMessage.includes("success")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {statusMessage}
                      </div>
                      <p className="text-gray-600">
                        {statusMessage.includes("success")
                          ? "Your document has been signed successfully"
                          : "Please try again or contact support if the issue persists"}
                      </p>
                    </div>

                    <div className="w-full max-w-md space-y-4">
                      {statusMessage.includes("success") && (
                        <button
                          onClick={handleDownloadDocument}
                          disabled={isDownloading}
                          className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                                 transition duration-200 ease-in-out font-medium shadow-lg 
                                 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center justify-center gap-2"
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Downloading Document...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              <span>Download Signed Document</span>
                            </>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => setShowModal(false)}
                        className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl 
                               hover:bg-gray-200 transition duration-200 ease-in-out 
                               font-medium flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>Close Window</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">
                Document Signing Process
              </h1>
              <p className="text-gray-600 mt-2">
                {showModal
                  ? "Complete the signing process in the modal window above"
                  : "Click below to open the document signing window"}
              </p>
            </motion.div>

            {!showModal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full max-w-md py-4 bg-blue-600 text-white rounded-xl 
                         hover:bg-blue-700 transition duration-200 ease-in-out 
                         font-medium shadow-lg hover:shadow-xl flex items-center 
                         justify-center gap-2 mx-auto"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Open Signing Window</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );

  // const renderDocumentSelection = () => (
  //   <div className="min-h-screen flex items-center justify-center">
  //     <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-xl shadow-lg">
  //       <h2 className="text-2xl font-semibold text-white mb-4">
  //         Select Document
  //       </h2>
  //       <select
  //         name="selectedDocument"
  //         value={formData.selectedDocument}
  //         onChange={handleDocumentSelect}
  //         className="block w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
  //       >
  //         <option value="">Select a Document</option>
  //         <option value="nda">NDA</option>
  //         <option value="contract">Contract</option>
  //         <option value="agreement">Agreement</option>
  //       </select>
  //       <button
  //         onClick={() => setStep(2)}
  //         disabled={!formData.selectedDocument}
  //         className="w-full py-3 bg-pink-500 text-white rounded-xl mt-4 hover:bg-pink-600 transition duration-300"
  //       >
  //         Next: Fill Your Details
  //       </button>
  //     </div>
  //   </div>
  // );

  // const renderDetailsForm = () => (
  //   <form
  //     onSubmit={handleSubmit}
  //     className="min-h-screen flex items-center justify-center"
  //   >
  //     <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-xl shadow-lg">
  //       <h2 className="text-2xl font-semibold text-white mb-4 mx-8">
  //         Enter Your Details
  //       </h2>

  //       <div className="mb-4">
  //         <label className="block text-sm font-medium text-white">Name</label>
  //         <input
  //           type="text"
  //           name="name"
  //           value={formData.name}
  //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  //           required
  //           className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-sm font-medium text-white">
  //           Address
  //         </label>
  //         <input
  //           type="text"
  //           name="address"
  //           value={formData.address}
  //           onChange={(e) =>
  //             setFormData({ ...formData, address: e.target.value })
  //           }
  //           required
  //           className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-sm font-medium text-white">Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={(e) =>
  //             setFormData({ ...formData, email: e.target.value })
  //           }
  //           required
  //           className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
  //         />
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-full py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition duration-300"
  //       >
  //         Submit & Sign
  //       </button>
  //     </div>
  //   </form>
  // );

  // const renderSignaturePad = () => (
  //   <>
  //     {showModal && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //         <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
  //           <h1 className="text-2xl font-bold mb-4">Review and Sign</h1>
  //           {showIframe && redirectUrl && (
  //             <iframe
  //               ref={iframeRef}
  //               src={redirectUrl}
  //               width="100%"
  //               height="600px"
  //               title="DocuSign Document"
  //               style={{ border: "none" }}
  //             />
  //           )}
  //           {!showIframe && (
  //             <div className="mt-4 text-center">
  //               <p
  //                 className={
  //                   statusMessage.includes("success")
  //                     ? "text-green-600"
  //                     : "text-red-600"
  //                 }
  //               >
  //                 {statusMessage}
  //               </p>
  //               {statusMessage.includes("success") && (
  //                 <button
  //                   onClick={handleDownloadDocument}
  //                   className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  //                 >
  //                   Download Signed Document
  //                 </button>
  //               )}
  //               <button
  //                 onClick={() => setShowModal(false)}
  //                 className="w-full mt-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
  //               >
  //                 Close
  //               </button>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AnimatePresence mode="wait">
        {step === 1 && renderDocumentSelection()}
        {step === 2 && renderDetailsForm()}
        {step === 3 && renderSignaturePad()}
      </AnimatePresence>
    </>
  );
};

export default Home;
