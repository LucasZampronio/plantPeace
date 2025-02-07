import React from "react";

interface CheckboxFieldProps {
  id: string;
  label: string;
  onChange: (checked: boolean, id: string) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        className="form-checkbox"
        onChange={(e) => onChange(e.target.checked, id)} 
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
