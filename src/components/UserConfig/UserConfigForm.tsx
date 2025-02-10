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
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({ user, onSubmit }) => {
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
    <section className="bg-white dark:bg-neutral-900 flex h-screen">
      <div className="flex flex-1 flex-col pt-30 items-left justify-start w-full">
        <div className="border-green-500 w-[70%] pl-15 pr-10 pb-10">
          <h1 className="font-[Playfair_Display] text-4xl font-bold mb-3 text-[#064E3B]">
            User Settings
          </h1>
          <p className="text-[#64748B]">
            Update your account information and password
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 rounded-2xl bg-white w-full pl-15 pr-10"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={handleNameChange}
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            value={email}
            placeholder="your.email@example.com"
            onChange={handleEmailChange}
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />

          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Enter current password"
            required
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />

          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />

          <button
            type="submit"
            className="mt-4 py-2 px-6 bg-[#064E3B] text-white rounded-lg hover:bg-[#267355] transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="flex flex-1">
        <img
          src={plant}
          alt="Plant"
          className="flex-1 hidden md:flex object-cover w-full h-full object-[center_50%] z-1"
        />
      </div>
    </section>
  );
};

export default UserConfigForm;
