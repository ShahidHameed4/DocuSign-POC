import React from "react";
import { motion } from "framer-motion";
import { PAGE_TRANSITION, DOCUMENT_TYPES } from "../constants";
import { UserDetails } from "../types";

interface DocumentSelectionProps {
  formData: UserDetails;
  onDocumentSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onNext: () => void;
}

export const DocumentSelection: React.FC<DocumentSelectionProps> = ({
  formData,
  onDocumentSelect,
  onNext,
}) => (
  <motion.div
    {...PAGE_TRANSITION}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4"
  >
    <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Select Document</h2>
          <p className="mt-2 text-gray-600">
            Choose the document type you need to sign
          </p>
        </div>

        <select
          name="selectedDocument"
          value={formData.selectedDocument}
          onChange={onDocumentSelect}
          className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50 transition duration-200 ease-in-out"
        >
          <option value="">Select a Document Type</option>
          {DOCUMENT_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={onNext}
          disabled={!formData.selectedDocument}
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg shadow-lg hover:shadow-xl"
        >
          Continue to Details
        </button>
      </div>
    </div>
  </motion.div>
);
