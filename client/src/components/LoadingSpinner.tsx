import React from "react";
import { LoadingSpinnerProps } from "../types";

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Processing your request...",
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  </div>
);
