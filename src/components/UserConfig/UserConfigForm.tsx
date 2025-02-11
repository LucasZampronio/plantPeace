import { useState, useEffect } from "react";
import plant from "../../images/defautplant.png";

interface UserConfigFormProps {
  user?: {
    name: string;
    email: string;
  };
  onSubmit: (usuario: {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
  }) => void;
  errorMessage?: string | null;
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({
  user,
  onSubmit,
  errorMessage,
}) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email, currentPassword, newPassword });
  };

  useEffect(() => {
    console.log("Dados recebidos no formulário:", user);
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  return (
    <section className="bg-white dark:bg-neutral-900 flex flex-col sm:flex-row h-screen transition-colors duration-300">
      {/* Formulário */}
      <div className="flex flex-1 flex-col pt-[var(--header-height)] sm:py-25 items-left justify-start w-full px-4 sm:pl-15 sm:pr-10 sm:pb-10">
        <div className="border-green-500 w-full sm:w-[70%] pl-5">
          <h1 className="font-[Playfair_Display] text-2xl sm:text-4xl font-bold mb-3 text-emerald-700 dark:text-emerald-700">
            User Config
          </h1>
          <p className="text-[#64748B] dark:text-gray-400 text-sm sm:text-base">
            Update your account information and password
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
            onChange={handleNameChange}
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
            onChange={handleEmailChange}
            className="mt-1 py-2 px-4 sm:px-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border-2 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg text-sm sm:text-base transition-colors duration-200"
          />

          <label
            htmlFor="current-password"
            className="text-sm sm:text-base dark:text-gray-300"
          >
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Enter current password"
            required
            className="mt-1 py-2 px-4 sm:px-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border-2 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg text-sm sm:text-base transition-colors duration-200"
          />

          <label
            htmlFor="new-password"
            className="text-sm sm:text-base dark:text-gray-300"
          >
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            className="mt-1 py-2 px-4 sm:px-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border-2 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg text-sm sm:text-base transition-colors duration-200"
          />

          <button
            type="submit"
            className="mt-4 py-2 px-4 sm:px-6 bg-emerald-900 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors text-sm sm:text-base"
          >
            Save Changes
          </button>
          {errorMessage && (
            <div className="mt-3 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-50 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
        </form>
      </div>

      {/* Imagem (oculta em mobile) */}
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
