import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PAGE_TRANSITION } from "../constants";
import { CloseIcon, DocumentIcon, DownloadIcon } from "./icons";

interface SignaturePadProps {
  redirectUrl: string;
  isDownloading: boolean;
  onDownload: () => Promise<void>;
}

interface SignaturePadState {
  showModal: boolean;
  showIframe: boolean;
  statusMessage: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  redirectUrl,
  isDownloading,
  onDownload,
}) => {
  const [state, setState] = useState<SignaturePadState>({
    showModal: false,
    showIframe: true,
    statusMessage: "",
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeNavigation = () => {
      try {
        if (iframeRef.current?.contentWindow?.location.href) {
          const currentUrl = iframeRef.current.contentWindow.location.href;

          if (currentUrl.includes("event=signing_complete")) {
            setState((prev) => ({
              ...prev,
              showIframe: false,
              statusMessage: "Signing completed successfully!",
            }));
          } else if (currentUrl.includes("event=")) {
            setState((prev) => ({
              ...prev,
              showIframe: false,
              statusMessage: "Signing failed. Please try again.",
            }));
          }
        }
      } catch (e) {
        console.log("iframe navigation occurred to external domain");
      }
    };

    const intervalId = setInterval(handleIframeNavigation, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const renderModalContent = () => {
    if (state.showIframe) {
      return (
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
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full space-y-8"
      >
        <div className="text-center">
          <div
            className={`text-2xl font-semibold mb-2 ${
              state.statusMessage.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state.statusMessage}
          </div>
          <p className="text-gray-600">
            {state.statusMessage.includes("success")
              ? "Your document has been signed successfully"
              : "Please try again or contact support if the issue persists"}
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          {state.statusMessage.includes("success") && (
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                     transition duration-200 ease-in-out font-medium shadow-lg 
                     hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Downloading Document...</span>
                </>
              ) : (
                <>
                  <DownloadIcon />
                  <span>Download Signed Document</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setState((prev) => ({ ...prev, showModal: false }))}
            className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl 
                   hover:bg-gray-200 transition duration-200 ease-in-out 
                   font-medium flex items-center justify-center gap-2"
          >
            <CloseIcon />
            <span>Close Window</span>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {state.showModal && (
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
                {!state.showIframe && (
                  <CloseIcon
                    onClick={() =>
                      setState((prev) => ({ ...prev, showModal: false }))
                    }
                  />
                )}
              </div>

              <div className="flex-1 p-0 relative overflow-hidden">
                {renderModalContent()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        {...PAGE_TRANSITION}
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
                {state.showModal
                  ? "Complete the signing process in the modal window above"
                  : "Click below to open the document signing window"}
              </p>
            </motion.div>

            {!state.showModal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() =>
                    setState((prev) => ({ ...prev, showModal: true }))
                  }
                  className="w-full max-w-md py-4 bg-blue-600 text-white rounded-xl 
                         hover:bg-blue-700 transition duration-200 ease-in-out 
                         font-medium shadow-lg hover:shadow-xl flex items-center 
                         justify-center gap-2 mx-auto"
                >
                  <DocumentIcon />
                  <span>Open Signing Window</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
