import PlantImage from "../../images/defautplant.png";
import { useForm } from "../../hooks/useForm";
import LogoImage from'../../images/logoicon.svg'
interface RegisterFormProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit = () => {},
}) => {
  const { formData, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.name) errors.name = "Name is required.";
      if (!data.email) errors.email = "Email is required.";
      if (!data.password) errors.password = "Senha is required.";
      if (data.password !== data.confirmPassword)
        errors.confirmPassword = " passwords do not match.";

      return errors;
    },
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* div da esquerda */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
      <div className="absolute top-0 bottom-4 left-0 p-10">
          <a href="/">
            <img src={LogoImage} alt="Logo" className="w-12 h-12" />
          </a>
        </div>
        {/* form */}
        <div className="w-full max-w-[424px] flex flex-col gap-8 p-3">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-[#064e3b] font-['Playfair_Display']">
              Register
            </h1>
            <p className="text-sm text-[#64748b]">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-medium text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-medium">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full p-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#064e3b] text-[#fcfcfc] py-3 px-10 rounded-lg font-semibold hover:bg-[#053e2f] transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      {/* div da direita */}
      <div className="flex-1">
        <img
          src={PlantImage}
          alt="Decorative"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};
