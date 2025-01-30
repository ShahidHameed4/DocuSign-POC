import React from "react";
import { motion } from "framer-motion";
import { PAGE_TRANSITION } from "../constants";
import { UserDetails } from "../types";

interface UserDetailsFormProps {
  formData: UserDetails;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onBack: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  formData,
  onSubmit,
  onBack,
  onInputChange,
}) => (
  <motion.div
    {...PAGE_TRANSITION}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4"
  >
    <form onSubmit={onSubmit} className="max-w-lg w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Your Details</h2>
            <p className="mt-2 text-gray-600">
              Please fill in your information
            </p>
          </div>

          {["name", "address", "email"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof UserDetails]}
                onChange={onInputChange}
                required
                className="block w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
                placeholder={
                  field === "name"
                    ? "John Doe"
                    : field === "email"
                    ? "your@email.com"
                    : "123 Main St, City, Country"
                }
              />
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
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
