import { useState } from "react";

interface Errors {
  [key: string]: string;
}

interface UseFormProps<T extends Record<string, string | boolean>> {
  initialValues: T;
  onSubmit: (data: T) => void;
  validate?: (data: T) => Errors;
}

export const useForm = <T extends Record<string, string | boolean>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate) {
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    onSubmit(formData);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};