import { useState, useEffect } from "react";
import plant from "../../images/defautplant.png";
import { Link } from "react-router-dom";

interface UserConfigFormProps {
  user?: {
    name: string;
    email: string;
  };
  onSubmit: (usuario: { name: string; email: string }) => void;
  errorMessage?: string | null;
  successMessage?: string | null;
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({
  user,
  onSubmit,
  errorMessage,
  successMessage,
}) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <section className="bg-white dark:bg-neutral-900 flex flex-col sm:flex-row h-screen transition-colors duration-300">
      <div className="flex flex-1 flex-col pt-[var(--header-height)] sm:py-40 items-left justify-start w-full px-4 sm:pl-15 sm:pr-10 sm:pb-10">
        <div className="border-green-500 w-full sm:w-[70%] pl-5">
          <h1 className="font-[Playfair_Display] text-2xl sm:text-4xl font-bold mb-3 text-emerald-700 dark:text-emerald-700">
            User Config
          </h1>
          <p className="text-[#64748B] dark:text-gray-400 text-sm sm:text-base">
            Update your account information
          </p>
        </div>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 rounded-2xl bg-white dark:bg-neutral-900 p-6 transition-colors duration-300"
        >
          <label
            htmlFor="name"
            className="text-sm sm:text-base dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 py-2 px-4 sm:px-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border-2 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg text-sm sm:text-base transition-colors duration-200"
          />

          <label
            htmlFor="email"
            className="text-sm sm:text-base dark:text-gray-300"
          >
            E-mail
          </label>
          <input
            type="email"
            value={email}
            placeholder="your.email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 py-2 px-4 sm:px-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border-2 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg text-sm sm:text-base transition-colors duration-200"
          />

          <p className="text-sm text-emerald-700 dark:text-emerald-500 mt-1">
            <Link to="/reset-password" className="hover:underline">
              Change password?
            </Link>
          </p>

          <button
            type="submit"
            className="mt-4 py-2 px-4 sm:px-6 bg-emerald-900 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors text-sm sm:text-base"
          >
            Edit Account
          </button>
          {errorMessage && (
            <div className="mt-3 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-50 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mt-3 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-50 rounded-md text-sm">
              {successMessage}
            </div>
          )}
        </form>
      </div>

      <div className="flex-1 hidden sm:block">
        <img
          src={plant}
          alt="Plant"
          className="object-cover w-full h-full object-[center_50%] z-1"
        />
      </div>
    </section>
  );
};

export default UserConfigForm;
