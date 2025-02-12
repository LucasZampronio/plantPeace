import { ReactNode } from "react";

interface InputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
    "name"
  > {
  name: string;
  autoComplete?: string;
  label?: string;
  icon?: ReactNode;
  className?: string;
  error?: string;
  errorId?: string;
  showRequiredIndicator?: boolean;
  options?: string[]; 
}

export const InputField = ({
  label,
  icon,
  className = "",
  error,
  errorId,
  showRequiredIndicator,
  options,
  type,
  ...props
}: InputFieldProps): JSX.Element => {
  const borderColorClass = error
    ? "border-red-500 focus:border-red-700 focus:ring-red-200"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {showRequiredIndicator && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {type === "select" ? (
          <select
            {...props}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
              ${icon ? "pl-10" : ""} 
              ${borderColorClass}
              ${className}`}
          >
            <option value="" disabled hidden>
              {props.placeholder || "Selecione uma opção"}
            </option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            {...props}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
              ${icon ? "pl-10" : ""} 
              ${borderColorClass}
              ${className}`}
          />
        )}
      </div>

      {error && (
        <div
          id={errorId}
          role="alert"
          className="text-red-600 text-sm mt-1 flex items-center gap-1"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 7a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
