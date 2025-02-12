import { useNavigate } from "react-router-dom";
import bgImage from "../images/forest-bg.png";
import cactoMan from "../images/cactoManDefault.png";
import { Link } from "react-router-dom";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/sign-in?reset=success");
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
      }}
    >
      <div className="max-w-md w-full px-4 pt-8">
        <div className="pt-0 bg-gray-100 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          <div className="text-center pt-0">
            <img
              src={cactoMan}
              alt="Password Reset"
              className="mx-auto w-75 h-75 object-contain mb-12"
            />

            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif mt-[-50px]">
              Absolute Success!
            </h2>
            <p className="text-gray-500 mb-4 mt-[20px]">Your password has been changed successfully!!! Call if you need help again.</p>
          </div>
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full bg-green-900 hover:bg-green-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] mb-8"
          >
            Back to Homepage
          </button>

          <div className="mt-12 text-center">
            <span className="font-medium text-sm">Can't get the email?</span>
            <span style={{ marginLeft: "5px" }}> </span>
            <span>
              <Link
                to="/forgot-password"
                className="text-green-900  hover:text-green-800 text-sm font-medium transition-colors underline"
              >
                Resubmite
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
