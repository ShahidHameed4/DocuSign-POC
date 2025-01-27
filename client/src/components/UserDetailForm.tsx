import { useState } from "react";

interface UserDetails {
  name: string;
  address: string;
}

interface UserDetailsFormProps {
  onSubmit: (details: UserDetails) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, address });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white">Enter Your Details</h2>

      <div>
        <label className="block text-sm font-medium text-white">Name</label>
        <input
          type="text"
          className="mt-2 p-3 w-full border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Address</label>
        <input
          type="text"
          className="mt-2 p-3 w-full border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition duration-300"
      >
        Continue
      </button>
    </form>
  );
};

export default UserDetailsForm;
